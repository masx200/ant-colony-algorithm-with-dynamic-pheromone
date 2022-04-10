import { NodeCoordinates } from "../functions/NodeCoordinates";

export type TSPRunnerOptions = {
    distance_round?: boolean;
    max_cities_of_greedy?: number;
    // distance_round?:boolean;
    max_segments_of_cross_point?: number;
    max_cities_of_state_transition?: number;
    max_routes_of_greedy?: number;
    max_size_of_collection_of_latest_routes?: number;
    max_size_of_collection_of_optimal_routes?: number;
    // cross_Point_Coefficient_of_Non_Optimal_Paths?: number;
    max_results_of_2_opt?: number;
    coefficient_of_pheromone_Increase_Non_Optimal_Paths?: number;
    number_of_small_scale_cities_where_pheromone_diffuses?: number;
    number_of_large_scale_cities_where_pheromone_diffuses?: number;

    max_results_of_k_opt?: number | undefined;
    // pheromone_volatility_coefficient_R1?: number | undefined;
    pheromone_volatility_coefficient_R2?: number | undefined;

    node_coordinates: NodeCoordinates;
    alpha_zero?: number | undefined;
    beta_zero?: number | undefined;
    count_of_ants?: number | undefined;
};
