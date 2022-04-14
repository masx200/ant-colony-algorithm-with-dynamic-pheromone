// import { NodeCoordinates } from "./NodeCoordinates";
import { Greedy_algorithm_to_solve_tsp_with_selected_start } from "./Greedy_algorithm_to_solve_tsp_with_selected_start";
import { set_distance_round } from "../src/set_distance_round";
import { GreedyWithStartOptions } from "./GreedyWithStartOptions";

export function Greedy_solve_tsp_with_selected_start_length_time_ms({
    node_coordinates,
    start,
    round = false,
    max_cities_of_greedy = Infinity,
}: GreedyWithStartOptions): {
    length: number;
    route: number[];
    time_ms: number;
} {
    set_distance_round(round);
    const start_time = Number(new Date());
    const { route, length } = Greedy_algorithm_to_solve_tsp_with_selected_start(
        {
            node_coordinates,
            start,
            round,
            max_cities_of_greedy,
        }
    );
    const end_time = Number(new Date());
    const time_ms = -start_time + end_time;
    return { length, route: route, time_ms };
}
