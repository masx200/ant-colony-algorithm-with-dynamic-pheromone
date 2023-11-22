import { TSP_Output_Data } from "../functions/TSP_Output_Data";
import { assert_true } from "../test/assert_true";
import { drawChartMaxWait, drawChartWait } from "./drawChartMaxWait";
import { RunWay } from "./RunWay";
import { sleep_requestAnimationFrame_async_or_settimeout } from "./sleep_requestAnimationFrame_async_or_settimeout";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export async function tsp_runner_run_async({
    on_update_output_data,
    runner,
    time_of_search_ms = Infinity,
    iterations_of_search = Infinity,
    onprogress,
}: {
    on_update_output_data(data: TSP_Output_Data): void;
    time_of_search_ms?: number;
    runner: TSP_Worker_Remote["remote"] & {
        runIterations: (iterations: number) => Promise<void>;
        runOneIteration: () => Promise<void>;
    };
    iterations_of_search?: number;
    onprogress?: (percentage: number) => void;
}): Promise<void> {
    assert_true(
        [time_of_search_ms, iterations_of_search].some((a) => a < Infinity),
    );
    let last_update_time = Number(new Date());
    const all_time = time_of_search_ms;
    onprogress && onprogress(0);
    const all_iterations = iterations_of_search;
    let rest_iterations = all_iterations;
    let run_iterations = 1;
    const min_count = 1;
    let rest_time = time_of_search_ms;
    const type_of_search =
        time_of_search_ms < Infinity ? RunWay.time : RunWay.round;
    let duration: number = 0;
    while (
        type_of_search === RunWay.time ? rest_time > 0 : rest_iterations > 0
    ) {
        if (type_of_search === RunWay.round) {
            const last_time = Number(new Date());
            await runner.runIterations(run_iterations);
            rest_iterations -= run_iterations;
            duration = Number(new Date()) - last_time;

            onprogress &&
                onprogress(
                    Math.min(100, 100 * (1 - rest_iterations / all_iterations)),
                );
        } else {
            const last_time = Number(new Date());
            await runner.runIterations(run_iterations);
            duration = Number(new Date()) - last_time;
            rest_time -= duration;
            onprogress &&
                onprogress(Math.min(100, 100 * (1 - rest_time / all_time)));
        }
        if (duration > drawChartWait) {
            run_iterations = Math.max(
                Math.round(run_iterations / 2),
                min_count,
            );
        } else {
            run_iterations++;
        }
        run_iterations = Math.min(run_iterations, rest_iterations);
        if (Number(new Date()) - last_update_time > drawChartMaxWait) {
            on_update_output_data(
                await runner.get_output_data_and_consume_iteration_data(),
            );
            last_update_time = Number(new Date());
        }
        await sleep_requestAnimationFrame_async_or_settimeout();
    }
    on_update_output_data(
        await runner.get_output_data_and_consume_iteration_data(),
    );
}
