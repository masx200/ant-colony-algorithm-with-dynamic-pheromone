export interface DataOfFinishGreedyIteration {
    current_iterations: number;

    worst_length_of_iteration: number;
    optimal_length_of_iteration: number;
    optimal_route_of_iteration: number[];
    time_ms_of_one_iteration: number;
    global_best_length: number;
    average_length_of_iteration: number;
}
