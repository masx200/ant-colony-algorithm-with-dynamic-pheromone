import { sum } from "lodash-es";
import { Infinity_to_max_or_min } from "./Infinity_to_max_or_min";
import { is_segment_in_cycle_route } from "./is_segment_in_cycle_route";
import { nan_to_zero } from "./nan_to_zero";
// const default_pheromone_zero = 0;
// const PheromoneZero = default_pheromone_zero;
export function calc_pheromone_dynamic({
    latest_and_optimal_routes,
    // PheromoneZero,
    row,
    column,
    greedy_length,
    convergence_coefficient,
}: {
    latest_and_optimal_routes: { route: number[]; length: number }[];
    // PheromoneZero: number;
    row: number;
    column: number;
    greedy_length: number;
    convergence_coefficient: number;
}): number {
    const length_of_routes = latest_and_optimal_routes.length;
    //0*Infinity===NaN
    return (
        // PheromoneZero +
        sum(
            latest_and_optimal_routes.map(({ route, length: route_length }) => {
                const a = Math.pow(
                    (1 +
                        Number(is_segment_in_cycle_route(route, row, column))) /
                        2,
                    convergence_coefficient
                );
                if (a === 0) {
                    return 0;
                }
                const c = 1 - Math.exp(-convergence_coefficient);
                if (c == 0) {
                    return 0;
                }
                const b = Infinity_to_max_or_min(
                    Math.pow(
                        greedy_length / route_length,
                        convergence_coefficient * convergence_coefficient
                    )
                );
                //b可能是Infinity
                const r = c * a * b;
                return nan_to_zero(r);
            })
        ) / length_of_routes
    );
}
