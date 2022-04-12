import { NodeCoordinates } from "../functions/NodeCoordinates";
import { closed_total_path_length } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { get_best_route_Of_Series_routes_and_lengths } from "../functions/get_best_route_Of_Series_routes_and_lengths";

import { assert_true as assert_true } from "../test/assert_true";

import { get_distance_round } from "../src/set_distance_round";
import { generate_one_k_exchange_route } from "./generate_one_k_exchange_route";
import { pickRandomOne } from "../functions/pickRandomOne";
export function random_k_exchange_limited({
    max_results_of_k_exchange,
    route,
    length,
    node_coordinates,
}: {
    max_results_of_k_exchange: number;
    route: number[];
    length: number;
    node_coordinates: NodeCoordinates;
}): { length: number; route: number[] } {
    assert_true(max_results_of_k_exchange >= 1);
    for (let count = 0; count <= max_results_of_k_exchange; count++) {
        const index_range = [...route.keys()]
            .map((a) => a + 1)
            .filter((k) => k >= 2);
        const k = pickRandomOne(
            index_range,
            index_range.map((a) => 1 / a)
        );

        const routes_of_2_opt_accurate = Array.of(
            generate_one_k_exchange_route({
                route,
                k,
            })
        );

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
