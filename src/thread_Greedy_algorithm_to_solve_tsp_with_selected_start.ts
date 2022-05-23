import { get_random_start } from "../functions/get_random_start";
import { GreedyWithStartOptions } from "../functions/GreedyWithStartOptions";
// import { NodeCoordinates } from "../functions/NodeCoordinates";
import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "./Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
export async function thread_Greedy_algorithm_to_solve_tsp_with_selected_start({
    node_coordinates,
    start = get_random_start(node_coordinates),
    round = false,
    max_cities_of_greedy = Infinity,
}: GreedyWithStartOptions): Promise<{
    route: number[];
    length: number;
}> {
    return Greedy_algorithm_to_solve_tsp_with_selected_start_pool.run((w) => {
        const remote = w.remote;

        return remote.Greedy_algorithm_to_solve_tsp_with_selected_start({
            node_coordinates,
            start,
            round,
            max_cities_of_greedy,
        });
    });
}
