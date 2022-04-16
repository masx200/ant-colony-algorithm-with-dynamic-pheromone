import { max_number_of_stagnation } from "./max_number_of_stagnation";
const convergence_coefficient_grow_speed = 1.25;
export function update_convergence_coefficient({
    number_of_stagnation,
    coefficient_of_diversity_increase,
    convergence_coefficient,
    iterate_best_length,
    greedy_length,
}: {
    number_of_stagnation: number;
    coefficient_of_diversity_increase: number;
    convergence_coefficient: number;
    iterate_best_length: number;
    greedy_length: number;
}): number {
    if (number_of_stagnation > max_number_of_stagnation) {
        return Math.max(
            1,
            convergence_coefficient /
                Math.pow(
                    convergence_coefficient_grow_speed,
                    max_number_of_stagnation
                ) /
                2
        );
    }
    if (coefficient_of_diversity_increase > 0) {
        convergence_coefficient =
            convergence_coefficient *
            Math.pow(1 - coefficient_of_diversity_increase, 2);
        if (convergence_coefficient < 1) {
            convergence_coefficient = 1;
            return convergence_coefficient;
        }
        return convergence_coefficient;
    } else if (iterate_best_length > greedy_length) {
        convergence_coefficient *= convergence_coefficient_grow_speed ** 3;
        return convergence_coefficient;
    } else {
        convergence_coefficient *= convergence_coefficient_grow_speed;
        return convergence_coefficient;
    }

    // return convergence_coefficient;
}
