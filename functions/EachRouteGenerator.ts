import { assert_true } from "../test/assert_true";
import { construct_one_route_all } from "./construct_one_route_all";
import { EachRouteGeneratorOptions } from "./Fun_EachRouteGenerator";
import { SharedOptions } from "./SharedOptions";
// import { local_optimization_route_thread } from "./local_optimization_route_thread";
export async function EachRouteGenerator(
    options: EachRouteGeneratorOptions & SharedOptions
): Promise<{
    route: number[];
    length: number;
    time_ms: number;
}> {
    const starttime_of_one_route = Number(new Date());
    const {
        pheromone_exceeds_maximum_range,
        // greedy_length,
        set_global_best,
        // distance_round,
        current_search_count,
        // max_results_of_2_opt,
        count_of_nodes,
        node_coordinates,
        pheromoneStore,
        alpha_zero,
        beta_zero,
        lastrandom_selection_probability,
        // max_results_of_k_opt,
        // max_results_of_k_exchange,
        get_best_length,
        get_best_route,
        // set_best_length,
        // set_best_route,
        // max_segments_of_cross_point,
    } = options;
    if (pheromone_exceeds_maximum_range()) {
        /* 信息素可能太大.如果有信息素超过浮点数最大范围,则在构建一条路径时,直接返回全局最优路径. */
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
    // if (get_best_route().length === 0) {
    if (oldLength < get_best_length()) {
        // set_best_length(oldLength);
        // set_best_route(oldRoute);
        set_global_best(oldRoute, oldLength);
    }
    // }
    const endtime_of_one_route = Number(new Date());
    /* 在每条路径生成后,如果路径比贪心结果更优,则对当前路径执行三种局部优化方法 */
    // const {
    //     route,
    //     length,
    //     time_ms: time_ms_of_optimization,
    // } = oldLength < greedy_length
    //     ? await local_optimization_route_thread({
    //           count_of_nodes,
    //           max_segments_of_cross_point,
    //           distance_round,
    //           route: oldRoute,
    //           max_results_of_k_opt,
    //           node_coordinates,
    //           length: oldLength,
    //           max_results_of_k_exchange,
    //           max_results_of_2_opt,
    //       })
    //     : { route: oldRoute, length: oldLength, time_ms: 0 };
    const route = oldRoute;
    const length = oldLength;
    if (length < get_best_length()) {
        // set_best_length(length);
        // set_best_route(route);
        set_global_best(route, length);
    }
    assert_true(get_best_length() < Infinity);
    assert_true(get_best_route().length === count_of_nodes);
    const time_ms = endtime_of_one_route - starttime_of_one_route;
    //+ time_ms_of_optimization;
    return { time_ms: time_ms, route, length };
}
