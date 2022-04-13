import { EachRouteGeneratorOptions } from "./Fun_EachRouteGenerator";
import { get_best_route_Of_Series_routes_and_lengths } from "./get_best_route_Of_Series_routes_and_lengths";
import { Precise_2_opt_eliminates_all_intersections } from "../cross-points/Precise_2_opt_eliminates_all_intersections";
import { partial_precise_random_2_opt_eliminates_cross_points } from "../cross-points/partial_precise_random_2_opt_eliminates_cross_points";
import { Random_K_OPT_full_limited_find_best } from "../k-opt/Random_K_OPT_full_limited_find_best";
import { random_k_exchange_limited } from "../cross-points/random_k_exchange_limited";
import { NodeCoordinates } from "./NodeCoordinates";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { ReadOnlyPheromone } from "./TSP_Runner";

export async function local_optimization_route({
    count_of_nodes,
    max_segments_of_cross_point,
    options,
    oldRoute,
    max_results_of_k_opt,
    node_coordinates,
    oldLength,
    max_results_of_k_exchange,
    max_results_of_2_opt,
}: {
    count_of_nodes: number;
    max_segments_of_cross_point: number;
    options: EachRouteGeneratorOptions &
        Required<TSPRunnerOptions> & {
            get_convergence_coefficient: () => number;
            get_neighbors_from_optimal_routes_and_latest_routes: (
                current_city: number
            ) => number[];
            get_random_selection_probability: () => number;
            get_search_count_of_best: () => number;
            get_best_route: () => number[];
            get_best_length: () => number;
            set_best_route: (route: number[]) => void;
            set_best_length: (bestlength: number) => void;
            get_current_search_count: () => number;
            count_of_nodes: number;
            max_results_of_2_opt: number;
            max_results_of_k_opt: number;
            alpha_zero: number;
            beta_zero: number;
            count_of_ants: number;
            node_coordinates: NodeCoordinates;
            pheromoneStore: ReadOnlyPheromone;
        };
    oldRoute: number[];
    max_results_of_k_opt: number;
    node_coordinates: NodeCoordinates;
    oldLength: number;
    max_results_of_k_exchange: number;
    max_results_of_2_opt: number;
}): Promise<{ route: number[]; length: number; time_ms: number }> {
    const starttime_of_one_route = Number(new Date());
    const is_count_not_large = count_of_nodes <= max_segments_of_cross_point;

    const { route: route1, length: length1 } =
        Random_K_OPT_full_limited_find_best({
            ...options,
            oldRoute: oldRoute,
            max_results_of_k_opt,
            node_coordinates,
            oldLength: oldLength,
        });
    const { route: route2, length: length2 } = random_k_exchange_limited({
        ...options,
        route: route1,
        length: length1,
        node_coordinates,
        max_results_of_k_exchange,
    });

    const { route: route3, length: length3 } = is_count_not_large
        ? Precise_2_opt_eliminates_all_intersections({
              ...options,
              max_results_of_2_opt,
              route: route2,
              length: length2,
              node_coordinates,
          })
        : partial_precise_random_2_opt_eliminates_cross_points({
              ...options,
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
