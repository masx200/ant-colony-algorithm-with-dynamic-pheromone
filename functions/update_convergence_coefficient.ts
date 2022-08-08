import { convergence_coefficient_max } from "./convergence_coefficient_max";
import {
    convergence_coefficient_min,
    convergence_coefficient_grow_speed,
} from "./convergence_coefficient_min";
import { max_number_of_stagnation as default_max_number_of_stagnation } from "./max_number_of_stagnation";
import { relative_Information_Entropy_Factor as default_relative_Information_Entropy_Factor } from "./relative_Information_Entropy_Factor";
export function update_convergence_coefficient({
    number_of_stagnation,
    coefficient_of_diversity_increase,
    convergence_coefficient,
    iterate_best_length,
    greedy_length,
    relative_Information_Entropy_Factor = default_relative_Information_Entropy_Factor,
    max_number_of_stagnation = default_max_number_of_stagnation,
}: {
    number_of_stagnation: number;
    coefficient_of_diversity_increase: number;
    convergence_coefficient: number;
    iterate_best_length: number;
    greedy_length: number;
    relative_Information_Entropy_Factor?: number;
    max_number_of_stagnation?: number;
}): number {
    if (coefficient_of_diversity_increase > 0) {
        convergence_coefficient = Math.max(
            convergence_coefficient_min,
            convergence_coefficient *
                Math.pow(
                    1 - coefficient_of_diversity_increase,
                    relative_Information_Entropy_Factor
                )
        );

        return convergence_coefficient;
    }
    if (number_of_stagnation >= max_number_of_stagnation) {
        return Math.max(
            convergence_coefficient_min,
            convergence_coefficient /
                Math.pow(
                    convergence_coefficient_grow_speed,
                    max_number_of_stagnation / 4
                )
        );
    }
    if (iterate_best_length > greedy_length) {
        convergence_coefficient *= convergence_coefficient_grow_speed ** 5;
        return Math.min(convergence_coefficient_max, convergence_coefficient);
    } else {
        convergence_coefficient *= convergence_coefficient_grow_speed;
        return Math.min(convergence_coefficient_max, convergence_coefficient);
    }

    // return convergence_coefficient;
}
