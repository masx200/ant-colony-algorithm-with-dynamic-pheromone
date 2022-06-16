import { TSPRunnerOptions } from "../src/TSPRunnerOptions";

import { NodeCoordinates } from "./NodeCoordinates";
import { ReadOnlyPheromone } from "./ReadOnlyPheromone";
import { SharedOptions } from "./SharedOptions";
import { TSP_Output_Data } from "./TSP_Output_Data";

export type TSP_Runner = Required<TSPRunnerOptions> &
    SharedOptions & {
        count_of_nodes: number;
        get_random_selection_probability(): number;
        get_time_of_best(): number;
        get_search_count_of_best(): number;

        runOneIteration: () => Promise<void>;

        get_total_time_ms: () => number;

        runIterations: (iterations: number) => Promise<void>;

        get_number_of_iterations: () => number;

        get_best_length: () => number;
        get_best_route: () => number[];
        get_current_search_count: () => number;
        pheromoneStore: ReadOnlyPheromone;

        [Symbol.toStringTag]: string;

        node_coordinates: NodeCoordinates;
        alpha_zero: number;
        beta_zero: number;
        count_of_ants: number;

        get_output_data_and_consume_iteration_data: () => TSP_Output_Data;
    };
