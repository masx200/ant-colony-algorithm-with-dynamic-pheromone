// import * as comlink from "comlink";
// import { DataOfBestChange } from "../functions/DataOfBestChange";
// import { DataOfFinishGreedyIteration } from "../functions/DataOfFinishGreedyIteration";
// import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
// import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
// import { DataOfTotal } from "../functions/DataOfTotal";
import { worker_error_listener } from "../functions/worker_error_listener";
import { create_Worker_comlink } from "./create_Worker_comlink";
import { TSPRunnerOptions } from "./TSPRunnerOptions";
// import TSPWorker from "./TSP_Runner.Worker?worker&inline";
import { TSP_Worker_API } from "./TSP_Worker_API";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export async function create_TSP_Worker_comlink(
    options: TSPRunnerOptions
): Promise<TSP_Worker_Remote> {
    const {
        worker,
        terminate,
        remote: runner,
    } = create_Worker_comlink<TSP_Worker_API>(() => {
        const w = new Worker(
            new URL("./TSP_Runner.Worker.ts", import.meta.url),
            {
                type: "module",
            }
        );

        return w;
    }, worker_error_listener);
    await runner.init_runner(options);
    // const on_finish_one_iteration = async (
    //     callback: (data: DataOfFinishOneIteration) => void
    // ) => {
    //     runner.on_finish_one_iteration(comlink.proxy(callback));
    // };
    // const on_finish_one_route = async (
    //     callback: (data: DataOfFinishOneRoute) => void
    // ) => {
    //     runner.on_finish_one_route(comlink.proxy(callback));
    // };
    // const on_best_change = async (
    //     callback: (data: DataOfBestChange) => void
    // ) => {
    //     runner.on_best_change(comlink.proxy(callback));
    // };
    // const on_finish_greedy_iteration = async (
    //     callback: (data: DataOfFinishGreedyIteration) => void
    // ) => {
    //     runner.on_finish_greedy_iteration(comlink.proxy(callback));
    // };
    // const on_total_change: (
    //     callback: (data: DataOfTotal) => void
    // ) => Promise<void> = async (callback) => {
    //     runner.on_total_change(comlink.proxy(callback));
    // };
    const remote = Object.create(runner, {
        // on_finish_greedy_iteration: { value: on_finish_greedy_iteration },
        // on_finish_one_route: { value: on_finish_one_route },
        // on_finish_one_iteration: { value: on_finish_one_iteration },
        // on_best_change: { value: on_best_change },
        // on_total_change: { value: on_total_change },
    }) as typeof runner & {
        // on_finish_one_route: typeof on_finish_one_route;
        // on_finish_one_iteration: typeof on_finish_one_iteration;
        // on_best_change: typeof on_best_change;
    };
    return { remote, worker, terminate };
}
