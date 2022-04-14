import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { NodeCoordinates } from "./NodeCoordinates";
import { ReadOnlyPheromone } from "./TSP_Runner";

export type SharedOptions = Required<TSPRunnerOptions> & {
    get_convergence_coefficient: () => number;
    get_neighbors_from_optimal_routes_and_latest_routes: (
        current_city: number
    ) => number[];
    get_random_selection_probability: () => number;
    get_search_count_of_best: () => number;

    get_best_route: () => number[];
    get_best_length: () => number;
    // set_best_route: (route: number[]) => void;
    // set_best_length: (best_length: number) => void;
    set_global_best: (route: number[], length: number) => void;
    get_current_search_count: () => number;
    count_of_nodes: number;
    max_results_of_2_opt: number;

    max_results_of_k_opt: number;

    alpha_zero: number;
    beta_zero: number;
    count_of_ants: number;
    node_coordinates: NodeCoordinates;
    pheromoneStore: ReadOnlyPheromone;
};
