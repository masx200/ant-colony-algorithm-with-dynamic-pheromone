export function update_convergence_coefficient({
    coefficient_of_diversity_increase,
    convergence_coefficient,
}: {
    coefficient_of_diversity_increase: number;
    convergence_coefficient: number;
}): number {
    if (coefficient_of_diversity_increase > 0) {
        convergence_coefficient *= Math.pow(
            1 - coefficient_of_diversity_increase,
            3
        );
    } else {
        convergence_coefficient += 0.08;
    }
    return convergence_coefficient;
}
