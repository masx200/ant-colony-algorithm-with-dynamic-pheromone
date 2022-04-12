import { NodeCoordinates } from "./NodeCoordinates";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { pickRandomOne } from "./pickRandomOne";
import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "../src/Greedy_algorithm_to_solve_tsp_with_selected_start_pool";

export async function run_greedy_once_thread({
    inputindexs,
    node_coordinates,
    round = false,
    max_cities_of_greedy = Infinity,
}: {
    inputindexs: number[];
    node_coordinates: NodeCoordinates;
    round?: boolean;
    max_cities_of_greedy?: number;
}): Promise<{ length: number; route: number[]; time_ms: number }> {
    const start = getnumberfromarrayofnmber(pickRandomOne(inputindexs));
    return Greedy_algorithm_to_solve_tsp_with_selected_start_pool.run((w) => {
        const remote = w.remote;
        return remote.Greedy_solve_tsp_with_selected_start_length_time_ms({
            node_coordinates,
            start,
            round,
            max_cities_of_greedy,
        });
    });
}
