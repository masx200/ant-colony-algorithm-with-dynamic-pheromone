// import { PathTabooList } from "../pathTabooList/PathTabooList";
// import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { assert_true } from "../test/assert_true";
import { calc_population_relative_information_entropy } from "./calc_population-relative-information-entropy";
import { get_best_routeOfSeriesRoutesAndLengths } from "./get_best_routeOfSeriesRoutesAndLengths";
import { NodeCoordinates } from "./NodeCoordinates";

// import { calc_relative_deviation_from_optimal } from "./calc_relative_deviation_from_optimal";
// import { construct_route_from_k_opt_of_global_best } from "./construct_route_from_k_opt_of_global_best";
// import { cycle_routetosegments } from "./cycle_routetosegments";

import { SharedOptions } from "./SharedOptions";

// export type AdaptiveTSPSearchOptions =;
/* 令蚁群算法迭代后, 一次轮次搜索完之后的处理 */
export function EachIterationHandler(
    options: SharedOptions & {
        // setPheromone: (row: number, column: number, value: number) => void;
        // getPheromone: (row: number, column: number) => number;
        // cross_Point_Coefficient_of_Non_Optimal_Paths?: number;
        // max_results_of_k_opt: number;
        routesandlengths: {
            route: number[];
            length: number;
        }[];

        get_best_route: () => number[];
        /**信息素强度*/

        /**局部信息素挥发系数 */
        // pheromone_volatility_coefficient_R1: number;
        /**全局信息素挥发系数 */
    
        // set_best_route: (route: number[]) => void;
        // set_best_length: (a: number) => void;
        get_best_length: () => number;
        node_coordinates: NodeCoordinates;
        /**
         * 蚂蚁数量
         */
        // count_of_ants: number;
        // alpha_zero: number;
        // beta_zero: number;
        // pathTabooList: PathTabooList;
        /**最大迭代次数 */
        // maxnumberofiterations: number;
        // pheromoneStore: MatrixSymmetry;

        /* 停滞迭代次数.如果连续多少代无法发现新路径,则停止搜索 */
        // numberofstagnantiterations: number;
    }
): {
    coefficient_of_diversity_increase: number;
    // relative_deviation_from_optimal: number;
    nextrandomselectionprobability: number;

    optimallengthofthis_iteration: number;
    optimalrouteofthis_iteration: number[];

    population_relative_information_entropy: number;
    // locally_optimized_length: number;
} {
    // console.log(options);
    const {
        // max_results_of_k_opt,
        routesandlengths,
    } = options;
    // asserttrue(typeof count_of_ants === "number");

    const routes = routesandlengths.map(({ route }) => route);

    /**种群相对信息熵 */
    const current_population_relative_information_entropy =
        calc_population_relative_information_entropy(routes);

    const coefficient_of_diversity_increase = Math.sqrt(
        1 - Math.pow(current_population_relative_information_entropy, 2)
    );
    const nextrandomselectionprobability =
        coefficient_of_diversity_increase / 8;

    assert_true(!Number.isNaN(current_population_relative_information_entropy));
    assert_true(!Number.isNaN(nextrandomselectionprobability));

    //对全局最优解进行k-opt优化

    // const result = construct_route_from_k_opt_of_global_best({
    //     get_best_route,
    //     max_results_of_k_opt,
    //     node_coordinates,
    //     get_best_length,
    //     pathTabooList,
    //     set_best_length,
    //     set_best_route,
    // });
    // const locally_optimized_length = result.length;

    //     routesandlengths.reduce((previous, current) => {
    //     return previous.length > current.length ? previous : current;
    // }, routesandlengths[0]);

    const iteratebestlengthandroute =
        get_best_routeOfSeriesRoutesAndLengths(routesandlengths);

    const iteratebestlength = iteratebestlengthandroute.length;
    const iteratebestroute = iteratebestlengthandroute.route;
    const optimalrouteofthis_iteration = iteratebestroute;
    const optimallengthofthis_iteration = iteratebestlength;
    // const iterateworstroutesegments = cycle_routetosegments(iterateworstroute);
    // const iteratebestroutesegments = cycle_routetosegments(iteratebestroute);
    // const global_best_routesegments = cycle_routetosegments(global_best_route);

    // }

    //与最优的相对偏差
    // const relative_deviation_from_optimal: number =
    //     calc_relative_deviation_from_optimal(
    //         routesandlengths.map(({ length }) => length),
    //         get_best_length()
    //     );
    return {
        coefficient_of_diversity_increase,
        // locally_optimized_length,
        // relative_deviation_from_optimal,
        optimallengthofthis_iteration,
        optimalrouteofthis_iteration,

        // routesandlengths,
        nextrandomselectionprobability,
        population_relative_information_entropy:
            current_population_relative_information_entropy,
    };
}
