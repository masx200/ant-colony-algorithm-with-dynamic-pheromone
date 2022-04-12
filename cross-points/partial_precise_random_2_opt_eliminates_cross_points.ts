import { NodeCoordinates } from "../functions/NodeCoordinates";
import { closed_total_path_length } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { get_best_route_Of_Series_routes_and_lengths } from "../functions/get_best_route_Of_Series_routes_and_lengths";
import { assert_true as assert_true } from "../test/assert_true";
import { generate_2_opt_routes_by_random_or_cross_point } from "./generate_2_opt_routes_by_random_or_cross_point";
import { get_distance_round } from "../src/set_distance_round";

export function partial_precise_random_2_opt_eliminates_cross_points({
    max_of_segments,
    max_results_of_2_opt,
    route,
    length,
    node_coordinates,
    count_of_nodes,
}: {
    count_of_nodes: number;
    max_of_segments: number;
    max_results_of_2_opt: number;
    route: number[];
    length: number;
    node_coordinates: NodeCoordinates;
}): { length: number; route: number[] } {
    assert_true(max_results_of_2_opt >= 1);

    for (let count = 0; count <= max_results_of_2_opt; count++) {
        const routes_of_2_opt_accurate =
            generate_2_opt_routes_by_random_or_cross_point({
                count_of_nodes,
                max_of_segments,
                route,
                node_coordinates,
            });

        const routes_and_lengths = routes_of_2_opt_accurate
            .map((route) => {
                const length = closed_total_path_length({
                    round: get_distance_round(),
                    path: route,
                    getdistancebyindex: creategetdistancebyindex(
                        node_coordinates,
                        get_distance_round()
                    ),
                });
                return { length, route };
            })
            .filter((a) => a.length !== length);
        const { route: best_route_of_2_opt, length: best_length_of_2_opt } =
            routes_and_lengths.length
                ? get_best_route_Of_Series_routes_and_lengths(
                      routes_and_lengths
                  )
                : { length: length, route: route };
        if (best_length_of_2_opt < length) {
            route = best_route_of_2_opt;
            length = best_length_of_2_opt;
        }
    }
    return { length, route };
}
