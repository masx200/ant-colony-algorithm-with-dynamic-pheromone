import { TSPRunnerOptions } from "./TSPRunnerOptions";

export const default_count_of_ants = 20;
export const default_search_rounds = 170;
export const default_search_time_seconds = 900;
// export const default_pheromone_volatility_coefficient_R1 = 0.03;

//由局部信息素挥发率决定全局信息素挥发率

export const default_alpha = 1;
export const default_beta = 3;

export const default_max_results_of_k_opt = 15;
export const default_max_results_of_2_opt = 10;

export const default_number_of_large_scale_cities_where_pheromone_diffuses = 20;

export const default_number_of_small_scale_cities_where_pheromone_diffuses = 10;
export const default_Pheromone_Increase_Coefficient_of_Non_Optimal_Paths = 0.7;

export { DefaultOptions };
//展示每条路径的详细信息
export const show_every_route = false;
const DefaultOptions: Omit<Required<TSPRunnerOptions>, "node_coordinates"> = {
    ///* 状态转移规则的每步最多城市数 */
    max_cities_of_state_transition: 200,
    /**每条的2-opt最大次数 */
    max_results_of_2_opt: default_max_results_of_2_opt,
    /**非最优解的信息素增量系数 */
    coefficient_of_pheromone_Increase_Non_Optimal_Paths:
        default_Pheromone_Increase_Coefficient_of_Non_Optimal_Paths,
    /**信息素扩散的小范围城市数 */
    number_of_small_scale_cities_where_pheromone_diffuses:
        default_number_of_small_scale_cities_where_pheromone_diffuses,
    /**信息素扩散的大范围城市数 */
    number_of_large_scale_cities_where_pheromone_diffuses:
        default_number_of_large_scale_cities_where_pheromone_diffuses,
    /**每条的k-opt最大数量 */
    max_results_of_k_opt: default_max_results_of_k_opt,
    /**全局信息素挥发率     */
    pheromone_volatility_coefficient_R2: 0.15,
    /**信息素强度 */
  
    /**信息素因子 */
    alpha_zero: default_alpha,
    /**启发式因子 */
    beta_zero: default_beta,
    /**蚂蚁数量 */
    count_of_ants: default_count_of_ants,
    /**最优路径的集合最大大小 */
    max_size_of_collection_of_optimal_routes: 10,
    /**最新路径的集合最大大小 */
    max_size_of_collection_of_latest_routes: 10,
    /**贪心算法路径数量 */
    max_routes_of_greedy: 20,
    /**查找交叉点的最大线段数量 */
    max_segments_of_cross_point: 80,

    /**贪心算法的每步最多城市数 */
    max_cities_of_greedy: 500,
    /**结果四舍五入 */
    distance_round: true,
};
