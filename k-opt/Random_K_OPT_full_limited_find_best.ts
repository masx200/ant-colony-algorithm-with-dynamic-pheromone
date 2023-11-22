import { NodeCoordinates } from "../functions/NodeCoordinates";
import { closed_total_path_length } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { get_best_route_Of_Series_routes_and_lengths } from "../functions/get_best_route_Of_Series_routes_and_lengths";
import { get_distance_round } from "../src/set_distance_round";

import { generate_k_opt_cycle_routes_limited } from "./generate_k_opt_cycle_routes_limited";
import { IntegerRange } from "../cross-points/IntegerRange";
import { pickRandomOne } from "../functions/pickRandomOne";

export function Random_K_OPT_full_limited_find_best({
    count_of_nodes,
    route: oldRoute,
    max_results_of_k_opt,
    node_coordinates,
    length: oldLength,
}: {
    count_of_nodes: number;
    route: number[];
    max_results_of_k_opt: number;
    node_coordinates: NodeCoordinates;
    length: number;
}): { route: number[]; length: number } {
    const routes_of_k_opt: number[][] = Array.from({
        length: max_results_of_k_opt,
    })
        .map(function () {
            const k_range = IntegerRange(2, Math.floor(count_of_nodes / 2));
            return pickRandomOne(
                k_range,
                k_range.map((a) => 1 / a),
            );
        })
        .map((k) =>
            generate_k_opt_cycle_routes_limited({
                k: k,
                oldRoute,
                max_results: 1,
            }),
        )
        .flat();
    const routes_and_lengths = routes_of_k_opt
        .map((route) => {
            const length = closed_total_path_length({
                round: get_distance_round(),
                path: route,
                getdistancebyindex: creategetdistancebyindex(
                    node_coordinates,
                    get_distance_round(),
                ),
            });
            return { length, route };
        })
        .filter((a) => a.length !== oldLength);
    const { route: best_route_of_k_opt, length: best_length_of_k_opt } =
        routes_and_lengths.length
            ? get_best_route_Of_Series_routes_and_lengths(routes_and_lengths)
            : { route: oldRoute, length: oldLength };
    let route = best_route_of_k_opt;
    let length = best_length_of_k_opt;
    return { route, length };
}
