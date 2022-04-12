import { assert_true } from "../test/assert_true";
import { construct_one_route_all } from "./construct_one_route_all";
import { EachRouteGeneratorOptions } from "./Fun_EachRouteGenerator";
import { get_best_route_Of_Series_routes_and_lengths } from "./get_best_route_Of_Series_routes_and_lengths";
import { Precise_2_opt_eliminates_all_intersections } from "../cross-points/Precise_2_opt_eliminates_all_intersections";
import { partial_precise_random_2_opt_eliminates_cross_points } from "../cross-points/partial_precise_random_2_opt_eliminates_cross_points";
import { Random_K_OPT_full_limited_find_best } from "../k-opt/Random_K_OPT_full_limited_find_best";
import { SharedOptions } from "./SharedOptions";
import { random_k_exchange_limited } from "../cross-points/random_k_exchange_limited";
export function EachRouteGenerator(
    options: EachRouteGeneratorOptions & SharedOptions
): {
    route: number[];
    length: number;
} {
    const {
        current_search_count,
        max_results_of_2_opt,
        count_of_nodes,
        node_coordinates,
        pheromoneStore,
        alpha_zero,
        beta_zero,
        lastrandom_selection_probability,
        max_results_of_k_opt,
        max_results_of_k_exchange,
        get_best_length,
        get_best_route,
        set_best_length,
        set_best_route,
        max_segments_of_cross_point,
    } = options;
    const {
        route: oldRoute,
        length: oldLength,
    }: {
        route: number[];
        length: number;
    } = construct_one_route_all({
        ...options,

        current_search_count,
        node_coordinates,
        count_of_nodes,
        pheromoneStore,

        alpha_zero,
        beta_zero,
        lastrandom_selection_probability,
    });
    if (get_best_route().length === 0) {
        if (oldLength < get_best_length()) {
            set_best_length(oldLength);
            set_best_route(oldRoute);
        }
    }
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
    if (length < get_best_length()) {
        set_best_length(length);
        set_best_route(route);
    }
    assert_true(get_best_length() < Infinity);
    assert_true(get_best_route().length === count_of_nodes);
    return {
        route,
        length,
    };
}
