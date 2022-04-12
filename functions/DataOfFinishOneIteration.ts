export interface DataOfFinishOneIteration {
    current_iterations: number;
    population_relative_information_entropy: number;

    randomselectionprobability: number;

    optimal_length_of_iteration: number;
    optimal_route_of_iteration: number[];
    time_ms_of_one_iteration: number;
    globalbestlength: number;
    convergence_coefficient: number;
}
