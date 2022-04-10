import { assert_true } from "../test/assert_true";
import { construct_one_route_all } from "./construct_one_route_all";
import {
    EachRouteGeneratorOptions,
    // Fun_EachRouteGenerator,
} from "./Fun_EachRouteGenerator";
import { get_best_routeOfSeriesRoutesAndLengths } from "./get_best_routeOfSeriesRoutesAndLengths";
// import { pheromone_update_rule_after_route } from "./pheromone_update_rule_after_route";
import { Precise_2_opt_eliminates_all_intersections } from "../cross-points/Precise_2_opt_eliminates_all_intersections";
import { partial_precise_random_2_opt_eliminates_cross_points } from "../cross-points/partial_precise_random_2_opt_eliminates_cross_points";
import { Random_K_OPT_full_limited_find_best } from "../k-opt/Random_K_OPT_full_limited_find_best";
import { SharedOptions } from "./SharedOptions";
export function EachRouteGenerator(
    options: EachRouteGeneratorOptions & SharedOptions
): {
    route: number[];
    length: number;
    // weight_of_opt_best: number;
    // weight_of_opt_current: number;
} {
    const {
        // max_cities_of_state_transition,
        set_weight_of_opt_current,
        set_weight_of_opt_best,
        get_weight_of_opt_current,
        get_weight_of_opt_best,

        // setPheromone,
        get_probability_of_opt_best,
        current_search_count,
        max_results_of_2_opt,
        // current_search_count,
        count_of_nodes,
        node_coordinates,
        pheromoneStore,
        alpha_zero,
        beta_zero,
        lastrandomselectionprobability,
        max_results_of_k_opt,
        get_best_length,
        get_best_route,
        // pheromone_volatility_coefficient_R1,
        // pheromone_intensity_Q,
        set_best_length,
        set_best_route,
        max_segments_of_cross_point,
        // ...rest
    } = options;
    const {
        route: oldRoute,
        length: oldLength,
    }: {
        route: number[];
        length: number;
    } = construct_one_route_all({
        ...options,

        // getPheromone,
        // setPheromone,
        current_search_count,
        // pathTabooList,
        node_coordinates,
        count_of_nodes,
        // set_best_length,
        // set_best_route,
        pheromoneStore,
        // get_best_route,
        // max_results_of_k_opt,
        // get_best_length,
        // searchloopcountratio,
        // pheromone_intensity_Q,
        // pheromone_volatility_coefficient_R1,
        alpha_zero,
        beta_zero,
        lastrandomselectionprobability,
    });
    if (get_best_route().length === 0) {
        if (oldLength < get_best_length()) {
            set_best_length(oldLength);
            set_best_route(oldRoute);
        }
    }
    const is_count_not_large = count_of_nodes <= max_segments_of_cross_point;
    /* 对当前路径进行精准2-opt优化 */
    const { route: route1, length: length1 } = is_count_not_large
        ? Precise_2_opt_eliminates_all_intersections({
              ...options,
              max_results_of_2_opt,
              route: oldRoute,
              length: oldLength,
              node_coordinates,
          })
        : partial_precise_random_2_opt_eliminates_cross_points({
              ...options,
              max_of_segments: max_segments_of_cross_point,
              //   max_of_segments: max_cities_of_state_transition,
              max_results_of_2_opt,
              route: oldRoute,
              length: oldLength,
              node_coordinates,
          });
    // debugger
    // k-opt随机
    // 2-opt 去除交叉点循环
    const select_opt_best = Math.random() < get_probability_of_opt_best();
    /* 对全局最优解或当前路径进行k-opt优化 */
    const { route: route2, length: length2 } =
        Random_K_OPT_full_limited_find_best({
            ...options,
            oldRoute: select_opt_best ? get_best_route() : oldRoute,
            max_results_of_k_opt,
            node_coordinates,
            oldLength: select_opt_best ? get_best_length() : oldLength,
        });
    /* length3是对route2的去交叉结果 */
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
              //   max_of_segments: max_cities_of_state_transition,
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
    //.filter((a) => a.length !== get_best_length());
    // debugger

    // debugger
    /* 找出最短(路径2,路径3,路径1,当前路径) */
    const { route, length } =
        //    temp_set_of_routes.length
        //?
        get_best_routeOfSeriesRoutesAndLengths(temp_set_of_routes);
    //   : { route: oldRoute, length: oldLength };

    if (length < get_best_length()) {
        if (length1 === length) {
            //如果对当前路径优化成功
            set_weight_of_opt_current(get_weight_of_opt_current() + 1);
        } else if (
            select_opt_best &&
            (length2 === length || length3 === length)
        ) {
            //如果对最优解优化成功
            set_weight_of_opt_best(get_weight_of_opt_best() * 1.1);
        } else {
            //如果对当前路径优化成功
            set_weight_of_opt_current(get_weight_of_opt_current() * 1.1);
        }

        set_best_length(length);
        set_best_route(route);
    }
    assert_true(get_best_length() < Infinity);
    assert_true(get_best_route().length === count_of_nodes);
    // 赋值全局最优
    // 局部信息素更新
    // pheromone_update_rule_after_route({
    //     ...options,
    //     // ...options,
    //     // cross_Point_Coefficient_of_Non_Optimal_Paths,
    //     coefficient_of_pheromone_Increase_Non_Optimal_Paths,
    //     global_best_route: get_best_route(),
    //     current_length: length,
    //     current_route: route,
    //     // node_coordinates,
    //     count_of_nodes,
    //     globalbestlength: get_best_length(),
    //     pheromone_volatility_coefficient_R1,
    //     pheromone_intensity_Q,
    //     // pheromoneStore,
    // });
    return {
        route,
        length,
        // weight_of_opt_best,
        // weight_of_opt_current,
    };
}
// export function createEachRouteGenerator(): {
//     // options: {
//     // // cross_Point_Coefficient_of_Non_Optimal_Paths?: number;
//     // // coefficient_of_pheromone_Increase_Non_Optimal_Paths?: number;
//     // // max_results_of_2_opt?: number;
//     // // node_coordinates: NodeCoordinates;
//     // }
//     // get_probability_of_opt_current: () => number;
//     // get_probability_of_opt_best: () => number;
//     EachRouteGenerator: Fun_EachRouteGenerator;
//     // weight_of_opt_current: {
//     // get_weight_of_opt_current(): number;
//     // set_weight_of_opt_current(value: number): void;
//     // // };
//     // // weight_of_opt_best: {
//     // get_weight_of_opt_best(): number;
//     // set_weight_of_opt_best(value: number): void;
//     // };
// } {
//     // const {
//     //     cross_Point_Coefficient_of_Non_Optimal_Paths = default_Cross_Point_Coefficient_of_Non_Optimal_Paths,
//     //     max_results_of_2_opt = default_max_results_of_2_opt,
//     //     coefficient_of_pheromone_Increase_Non_Optimal_Paths = default_Pheromone_Increase_Coefficient_of_Non_Optimal_Paths,
//     // } = options;

//     /**每一条路径的生成和局部信息素更新 */

//     return {
//         // get_probability_of_opt_best,
//         // get_probability_of_opt_current,
//         EachRouteGenerator,
//         // weight_of_opt_best: {
//         // get_weight_of_opt_best() {
//         //     return weight_of_opt_best;
//         // },
//         // set_weight_of_opt_best(value: number) {
//         //     weight_of_opt_best = value;
//         // },
//         // // },
//         // // weight_of_opt_current: {
//         // get_weight_of_opt_current() {
//         //     return weight_of_opt_current;
//         // },
//         // set_weight_of_opt_current(value: number) {
//         //     weight_of_opt_current = value;
//         // },
//         // },
//     };
// }
