import { Ref } from "vue";
import { assert_number } from "../test/assert_number";
import {
    default_count_of_ants,
    default_search_rounds,
} from "./default_Options";
import { tsp_runner_run_async } from "./tsp_runner_run_async";

export async function run_tsp_by_search_rounds({
    runner,

    onprogress,
    searchrounds,
    count_of_ants_ref,
    is_running,
}: {
    runner: {
        runIterations: (iterations: number) => Promise<void>;
        runOneIteration: () => Promise<void>;
    };

    onprogress: (percentage: number) => void;
    searchrounds: Ref<number>;
    count_of_ants_ref: Ref<number>;
    is_running: Ref<boolean>;
}): Promise<void> {
    const iterations_of_search = searchrounds.value;
    const count_of_ants_value = count_of_ants_ref.value;
    if (iterations_of_search > 0 && count_of_ants_value >= 2) {
        const count_of_ants = count_of_ants_value;
        assert_number(count_of_ants);
        assert_number(iterations_of_search);
        is_running.value = true;
        await tsp_runner_run_async({
            runner: runner,
            iterations_of_search,
            onprogress,
        });
        is_running.value = false;
    } else {
        searchrounds.value = default_search_rounds;
        count_of_ants_ref.value = default_count_of_ants;
        is_running.value = false;
    }
}
