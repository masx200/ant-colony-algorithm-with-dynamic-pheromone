import { TSPRunnerOptions } from "./TSPRunnerOptions";

export const default_count_of_ants = 20;
export const default_search_rounds = 170;
export const default_search_time_seconds = 600;

export const default_alpha = 1;
export const default_beta = 4;

export const default_max_results_of_k_opt = 10;
export const default_max_results_of_2_opt = 10;
export const default_max_results_of_k_exchange = 10;

export { DefaultOptions };
// export const show_every_route = false;
const DefaultOptions: Omit<Required<TSPRunnerOptions>, "node_coordinates"> = {
    max_results_of_k_exchange: default_max_results_of_k_exchange,
    max_cities_of_state_transition: 80,
    max_results_of_2_opt: default_max_results_of_2_opt,
    max_results_of_k_opt: default_max_results_of_k_opt,
    alpha_zero: default_alpha,
    beta_zero: default_beta,
    count_of_ants: default_count_of_ants,
    max_size_of_collection_of_optimal_routes: 10,
    // max_size_of_collection_of_latest_routes: 10,
    max_routes_of_greedy: 20,
    max_segments_of_cross_point: 60,

    max_cities_of_greedy: 500,
    distance_round: true,
};
