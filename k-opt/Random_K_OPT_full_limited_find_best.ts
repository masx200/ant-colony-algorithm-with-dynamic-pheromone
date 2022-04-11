import { NodeCoordinates } from "../functions/NodeCoordinates";
import { closed_total_path_length } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { get_best_routeOfSeriesRoutesAndLengths } from "../functions/get_best_routeOfSeriesRoutesAndLengths";
import { get_distance_round } from "../src/set_distance_round";
import { random } from "lodash-es";
import { generate_k_opt_cycle_routes_limited } from "./generate_k_opt_cycle_routes_limited";

export function Random_K_OPT_full_limited_find_best({
    count_of_nodes,
    oldRoute,
    max_results_of_k_opt,
    node_coordinates,
    oldLength,
}: {
    count_of_nodes: number;
    oldRoute: number[];
    max_results_of_k_opt: number;
    node_coordinates: NodeCoordinates;
    oldLength: number;
}): { route: number[]; length: number } {
    const routes_of_k_opt: number[][] = Array.from({
        length: max_results_of_k_opt,
    })
        .map(() => Math.round(random(2, Math.floor(count_of_nodes / 2), false)))
        .map((k) =>
            generate_k_opt_cycle_routes_limited({
                k: k,
                oldRoute,
                max_results: 1,
            })
        )
        .flat();
    const routesAndLengths = routes_of_k_opt
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
        .filter((a) => a.length !== oldLength);
    const { route: best_route_of_k_opt, length: best_length_of_k_opt } =
        routesAndLengths.length
            ? get_best_routeOfSeriesRoutesAndLengths(routesAndLengths)
            : { route: oldRoute, length: oldLength };
    let route = best_route_of_k_opt;
    let length = best_length_of_k_opt;
    return { route, length };
}
