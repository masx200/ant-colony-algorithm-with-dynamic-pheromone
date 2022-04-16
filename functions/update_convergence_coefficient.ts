import { max_number_of_stagnation } from "./max_number_of_stagnation";
const convergence_coefficient_grow_speed = 1.25;
const convergence_coefficient_min = 1;
const convergence_coefficient_max = 5000;
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
            convergence_coefficient_min,
            convergence_coefficient /
                Math.pow(
                    convergence_coefficient_grow_speed,
                    max_number_of_stagnation * 1.5
                )
        );
    }
    if (coefficient_of_diversity_increase > 0) {
        convergence_coefficient = Math.max(
            convergence_coefficient_min,
            convergence_coefficient *
                Math.pow(1 - coefficient_of_diversity_increase, 2)
        );

        return convergence_coefficient;
    } else if (iterate_best_length > greedy_length) {
        convergence_coefficient *= convergence_coefficient_grow_speed ** 2;
        return Math.min(convergence_coefficient_max, convergence_coefficient);
    } else {
        convergence_coefficient *= convergence_coefficient_grow_speed;
        return Math.min(convergence_coefficient_max, convergence_coefficient);
    }

    // return convergence_coefficient;
}
