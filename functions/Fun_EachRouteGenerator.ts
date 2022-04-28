import { NodeCoordinates } from "./NodeCoordinates";

export interface EachRouteGeneratorOptions {
    max_results_of_2_opt?: number;
    current_search_count: number;
    count_of_nodes: number;
    node_coordinates: NodeCoordinates;
    alpha_zero: number;
    beta_zero: number;
    lastrandom_selection_probability: number;
    max_results_of_k_opt: number;
    get_best_length: () => number;
    get_best_route: () => number[];
    greedy_length: number;
    pheromone_exceeds_maximum_range: () => boolean;
    // set_best_length: (arg0: number) => void;
    // set_best_route: (arg0: number[]) => void;
}
