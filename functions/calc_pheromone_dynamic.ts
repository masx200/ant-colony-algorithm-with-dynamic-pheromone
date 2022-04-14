import { sum } from "lodash-es";
import { is_segment_in_cycle_route } from "./is_segment_in_cycle_route";
const default_pheromone_zero = 0;
const PheromoneZero = default_pheromone_zero;
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
    return (
        PheromoneZero +
        sum(
            latest_and_optimal_routes.map(({ route, length: route_length }) => {
                return (
                    ((1 +
                        Number(is_segment_in_cycle_route(route, row, column))) /
                        2) *
                    (Math.pow(
                        greedy_length / route_length,
                        convergence_coefficient
                    ) *
                        (1 - Math.exp(-convergence_coefficient)))
                );
            })
        ) /
            length_of_routes
    );
}
