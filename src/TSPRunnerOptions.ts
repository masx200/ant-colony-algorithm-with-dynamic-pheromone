import { NodeCoordinates } from "../functions/NodeCoordinates";

export type TSPRunnerOptions = { node_coordinates: NodeCoordinates } & Partial<{
    max_results_of_k_exchange?: number;
    distance_round?: boolean;
    max_cities_of_greedy?: number;
    max_segments_of_cross_point?: number;
    max_cities_of_state_transition?: number;
    max_routes_of_greedy?: number;

    max_size_of_collection_of_optimal_routes?: number;
    max_results_of_2_opt?: number;

    max_results_of_k_opt?: number | undefined;

    alpha_zero?: number | undefined;
    beta_zero?: number | undefined;
    count_of_ants?: number | undefined;
    relative_Information_Entropy_Factor?: number;
    max_number_of_stagnation?: number;
}>;
