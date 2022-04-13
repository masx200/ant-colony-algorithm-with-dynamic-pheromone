import { assert_true } from "../test/assert_true";
import { construct_one_route_all } from "./construct_one_route_all";
import { EachRouteGeneratorOptions } from "./Fun_EachRouteGenerator";
import { SharedOptions } from "./SharedOptions";
import { local_optimization_route } from "./local_optimization_route";
export async function EachRouteGenerator(
    options: EachRouteGeneratorOptions & SharedOptions
): Promise<{
    route: number[];
    length: number;
    time_ms: number;
}> {
    const starttime_of_one_route = Number(new Date());
    const {
        distance_round,
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
    // if (get_best_route().length === 0) {
    if (oldLength < get_best_length()) {
        set_best_length(oldLength);
        set_best_route(oldRoute);
    }
    // }
    const endtime_of_one_route = Number(new Date());

    const {
        route,
        length,
        time_ms: time_ms_of_optimization,
    } = await local_optimization_route({
        count_of_nodes,
        max_segments_of_cross_point,
        distance_round,
        oldRoute,
        max_results_of_k_opt,
        node_coordinates,
        oldLength,
        max_results_of_k_exchange,
        max_results_of_2_opt,
    });

    if (length < get_best_length()) {
        set_best_length(length);
        set_best_route(route);
    }
    assert_true(get_best_length() < Infinity);
    assert_true(get_best_route().length === count_of_nodes);
    const time_ms =
        endtime_of_one_route - starttime_of_one_route + time_ms_of_optimization;
    return { time_ms: time_ms, route, length };
}
