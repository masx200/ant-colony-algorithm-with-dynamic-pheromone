import { Ref } from "vue";
import { assert_number } from "../test/assert_number";
import { tsp_runner_run_async } from "./tsp_runner_run_async";

export async function run_tsp_by_search_time({
    runner,
    is_running,
    search_time_seconds,

    onprogress,
}: {
    runner: Parameters<typeof tsp_runner_run_async>[0]["runner"];

    search_time_seconds: Ref<number>;

    is_running: Ref<boolean>;
    onprogress: (p: number) => void;
}): Promise<void> {
    const search_time_ms = search_time_seconds.value * 1000;

    if (search_time_ms > 0) {
        assert_number(search_time_ms);
        is_running.value = true;
        await tsp_runner_run_async({
            time_of_search_ms: search_time_ms,
            runner,

            onprogress,
        });
        is_running.value = false;
    }
}
