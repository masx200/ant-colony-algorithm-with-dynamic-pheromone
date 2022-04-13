import { NodeCoordinates } from "./NodeCoordinates";
import { SharedOptions } from "./SharedOptions";
import { run_greedy_once_thread_with_time } from "./run_greedy_once_thread_with_time";
import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "../src/Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
export async function* greedy_first_search_routes_parallel({
    max_cities_of_greedy,
    max_routes_of_greedy,
    node_coordinates,
    count_of_nodes,
    round = false,
}: {
    round?: boolean;
    node_coordinates: NodeCoordinates;
    count_of_nodes: number;
} & SharedOptions): AsyncGenerator<
    { length: number; route: number[]; time_ms: number },
    void,
    unknown
> {
    const routes_of_greedy = Math.min(max_routes_of_greedy, count_of_nodes);

    const inputindexs = Array(node_coordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const max_current =
        Greedy_algorithm_to_solve_tsp_with_selected_start_pool.maxThreads;
    let rest_count = routes_of_greedy;
    while (rest_count > 0) {
        const current_threads = Math.min(max_current, rest_count);
        const parallel_results = await Promise.all(
            Array.from<
                Promise<{
                    length: number;
                    route: number[];
                    time_ms: number;
                }>
            >({ length: current_threads }).map(() =>
                run_greedy_once_thread_with_time({
                    inputindexs,
                    node_coordinates,
                    round,
                    max_cities_of_greedy,
                })
            )
        );
        rest_count -= current_threads;
        for (const result of parallel_results) {
            yield result;
        }
    }
}
