export function update_convergence_coefficient({
    coefficient_of_diversity_increase,
    convergence_coefficient,
    iterate_best_length,
    greedy_length,
}: {
    coefficient_of_diversity_increase: number;
    convergence_coefficient: number;
    iterate_best_length: number;
    greedy_length: number;
}): number {
    if (coefficient_of_diversity_increase > 0) {
        convergence_coefficient *= Math.pow(
            1 - coefficient_of_diversity_increase,
            2
        );
    } else if (iterate_best_length > greedy_length) {
        convergence_coefficient *= 1.7;
    } else {
        convergence_coefficient *= 1.1;
    }

    return convergence_coefficient;
}
