import { get_best_route_Of_Series_routes_and_lengths } from "./get_best_route_Of_Series_routes_and_lengths";
import { Precise_2_opt_eliminates_all_intersections } from "../cross-points/Precise_2_opt_eliminates_all_intersections";
import { partial_precise_random_2_opt_eliminates_cross_points } from "../cross-points/partial_precise_random_2_opt_eliminates_cross_points";
import { Random_K_OPT_full_limited_find_best } from "../k-opt/Random_K_OPT_full_limited_find_best";
import { random_k_exchange_limited } from "../cross-points/random_k_exchange_limited";
import { NodeCoordinates } from "./NodeCoordinates";
// import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
// import { ReadOnlyPheromone } from "./TSP_Runner";
import { set_distance_round } from "../src/set_distance_round";

export async function local_optimization_route({
    count_of_nodes,
    max_segments_of_cross_point,
    distance_round,
    oldRoute,
    max_results_of_k_opt,
    node_coordinates,
    oldLength,
    max_results_of_k_exchange,
    max_results_of_2_opt,
}: {
    count_of_nodes: number;
    max_segments_of_cross_point: number;
    distance_round: boolean;
    oldRoute: number[];
    max_results_of_k_opt: number;
    node_coordinates: NodeCoordinates;
    oldLength: number;
    max_results_of_k_exchange: number;
    max_results_of_2_opt: number;
}): Promise<{ route: number[]; length: number; time_ms: number }> {
    set_distance_round(distance_round);
    const starttime_of_one_route = Number(new Date());
    const is_count_not_large = count_of_nodes <= max_segments_of_cross_point;

    const { route: route1, length: length1 } =
        Random_K_OPT_full_limited_find_best({
            count_of_nodes,
            oldRoute: oldRoute,
            max_results_of_k_opt,
            node_coordinates,
            oldLength: oldLength,
        });
    const { route: route2, length: length2 } = random_k_exchange_limited({
        route: route1,
        length: length1,
        node_coordinates,
        max_results_of_k_exchange,
    });

    const { route: route3, length: length3 } = is_count_not_large
        ? Precise_2_opt_eliminates_all_intersections({
              count_of_nodes,
              max_results_of_2_opt,
              route: route2,
              length: length2,
              node_coordinates,
          })
        : partial_precise_random_2_opt_eliminates_cross_points({
              count_of_nodes,
              max_of_segments: max_segments_of_cross_point,
              max_results_of_2_opt,
              route: route2,
              length: length2,
              node_coordinates,
          });

    const temp_set_of_routes = [
        { route: route1, length: length1 },
        { route: route2, length: length2 },
        { route: route3, length: length3 },
        { route: oldRoute, length: oldLength },
    ];
    const { route, length } =
        get_best_route_Of_Series_routes_and_lengths(temp_set_of_routes);
    const endtime_of_one_route = Number(new Date());
    const time_ms = endtime_of_one_route - starttime_of_one_route;
    return { route, length, time_ms: time_ms };
}
