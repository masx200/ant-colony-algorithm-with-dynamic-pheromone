export function update_convergence_coefficient({
    coefficient_of_diversity_increase,
    convergence_coefficient,
    optimal_length_of_iteration,
    greedy_length,
}: {
    coefficient_of_diversity_increase: number;
    convergence_coefficient: number;
    optimal_length_of_iteration: number;
    greedy_length: number;
}): number {
    if (coefficient_of_diversity_increase > 0) {
        convergence_coefficient *= Math.pow(
            1 - coefficient_of_diversity_increase,
            2
        );
    } else if (optimal_length_of_iteration > greedy_length) {
        convergence_coefficient *= 5;
    } else {
        convergence_coefficient += 0.2;
    }

    return convergence_coefficient;
}
