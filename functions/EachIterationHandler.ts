import { assert_true } from "../test/assert_true";
import { calc_population_relative_information_entropy } from "./calc_population-relative-information-entropy";
import { get_best_route_Of_Series_routes_and_lengths } from "./get_best_route_Of_Series_routes_and_lengths";
import { local_optimization_route } from "./local_optimization_route";
import { NodeCoordinates } from "./NodeCoordinates";

import { SharedOptions } from "./SharedOptions";

export async function EachIterationHandler(
    options: SharedOptions & {
        routes_and_lengths: {
            route: number[];
            length: number;
        }[];

        get_best_route: () => number[];
        get_best_length: () => number;
        node_coordinates: NodeCoordinates;
    }
): Promise<{
    iterate_best_length: number;
    coefficient_of_diversity_increase: number;
    // nextrandom_selection_probability: number;

    optimal_length_of_iteration: number;
    optimal_route_of_iteration: number[];

    population_relative_information_entropy: number;
    time_ms: number;
    iterate_best_route: number[];
}> {
    const starttime_of_process_iteration = Number(new Date());
    const {
        distance_round,
        routes_and_lengths,
        get_best_length,
        get_best_route,
        count_of_nodes,
        max_segments_of_cross_point,
        max_results_of_k_opt,
        node_coordinates,
        max_results_of_k_exchange,
        max_results_of_2_opt,
    } = options;
    const routes = routes_and_lengths.map(({ route }) => route);

    const current_population_relative_information_entropy =
        calc_population_relative_information_entropy(routes);

    const coefficient_of_diversity_increase = Math.sqrt(
        1 - Math.pow(current_population_relative_information_entropy, 2)
    );

    assert_true(!Number.isNaN(current_population_relative_information_entropy));
    // assert_true(!Number.isNaN(nextrandom_selection_probability));

    const iterate_best_lengthandroute =
        get_best_route_Of_Series_routes_and_lengths(routes_and_lengths);

    const iterate_best_length = iterate_best_lengthandroute.length;
    const iterate_best_route = iterate_best_lengthandroute.route;
    const endtime_of_process_iteration = Number(new Date());
    const {
        route: optimal_route_of_iteration,
        length: optimal_length_of_iteration,
        time_ms: optimal_time_ms,
    } = await local_optimization_route({
        count_of_nodes,
        max_segments_of_cross_point,
        distance_round,
        oldRoute: get_best_route(),
        max_results_of_k_opt,
        node_coordinates,
        oldLength: get_best_length(),
        max_results_of_k_exchange,
        max_results_of_2_opt,
    });

    // const optimal_route_of_iteration = iterate_best_route;
    // const optimal_length_of_iteration = iterate_best_length;

    const timems_of_process_iteration =
        endtime_of_process_iteration -
        starttime_of_process_iteration +
        optimal_time_ms;
    return {
        time_ms: timems_of_process_iteration,
        coefficient_of_diversity_increase,
        optimal_length_of_iteration,
        optimal_route_of_iteration,
        iterate_best_length,
        iterate_best_route,
        // nextrandom_selection_probability,
        population_relative_information_entropy:
            current_population_relative_information_entropy,
    };
}
