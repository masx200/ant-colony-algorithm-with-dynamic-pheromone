import { assert_true } from "../test/assert_true";
import { construct_one_route_all } from "./construct_one_route_all";
import { EachRouteGeneratorOptions } from "./Fun_EachRouteGenerator";
import { SharedOptions } from "./SharedOptions";

export async function EachRouteGenerator(
    options: EachRouteGeneratorOptions & SharedOptions,
): Promise<{
    route: number[];
    length: number;
    time_ms: number;
}> {
    const starttime_of_one_route = Number(new Date());
    const {
        pheromone_exceeds_maximum_range,

        set_global_best,

        current_search_count,

        count_of_nodes,
        node_coordinates,
        pheromoneStore,
        alpha_zero,
        beta_zero,
        lastrandom_selection_probability,

        get_best_length,
        get_best_route,
    } = options;
    if (pheromone_exceeds_maximum_range()) {
        return {
            time_ms: 0,
            length: get_best_length(),
            route: get_best_route(),
        };
    }
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

    if (oldLength < get_best_length()) {
        set_global_best(oldRoute, oldLength);
    }

    const endtime_of_one_route = Number(new Date());

    const route = oldRoute;
    const length = oldLength;
    if (length < get_best_length()) {
        set_global_best(route, length);
    }
    assert_true(get_best_length() < Infinity);
    assert_true(get_best_route().length === count_of_nodes);
    const time_ms = endtime_of_one_route - starttime_of_one_route;

    return { time_ms: time_ms, route, length };
}
