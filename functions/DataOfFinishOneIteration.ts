export interface DataOfFinishOneIteration {
    current_iterations: number;
    population_relative_information_entropy: number;

    randomselectionprobability: number;

    optimallengthofthis_iteration: number;
    optimalrouteofthis_iteration: number[];
    time_ms_of_one_iteration: number;
    globalbestlength: number;
    // locally_optimized_length: number;
}
