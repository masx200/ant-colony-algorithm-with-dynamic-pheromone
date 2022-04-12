import { assert_true } from "../test/assert_true";
import { calc_population_relative_information_entropy } from "./calc_population-relative-information-entropy";
import { get_best_route_Of_Series_routes_and_lengths } from "./get_best_route_Of_Series_routes_and_lengths";
import { NodeCoordinates } from "./NodeCoordinates";

import { SharedOptions } from "./SharedOptions";

export function EachIterationHandler(
    options: SharedOptions & {
        routes_and_lengths: {
            route: number[];
            length: number;
        }[];

        get_best_route: () => number[];
        get_best_length: () => number;
        node_coordinates: NodeCoordinates;
    }
): {
    coefficient_of_diversity_increase: number;
    // nextrandom_selection_probability: number;

    optimal_length_of_iteration: number;
    optimal_route_of_iteration: number[];

    population_relative_information_entropy: number;
} {
    const { routes_and_lengths } = options;
    const routes = routes_and_lengths.map(({ route }) => route);

    const current_population_relative_information_entropy =
        calc_population_relative_information_entropy(routes);

    const coefficient_of_diversity_increase = Math.sqrt(
        1 - Math.pow(current_population_relative_information_entropy, 2)
    );

    assert_true(!Number.isNaN(current_population_relative_information_entropy));
    // assert_true(!Number.isNaN(nextrandom_selection_probability));

    const iteratebestlengthandroute =
        get_best_route_Of_Series_routes_and_lengths(routes_and_lengths);

    const iteratebestlength = iteratebestlengthandroute.length;
    const iteratebestroute = iteratebestlengthandroute.route;
    const optimal_route_of_iteration = iteratebestroute;
    const optimal_length_of_iteration = iteratebestlength;
    return {
        coefficient_of_diversity_increase,
        optimal_length_of_iteration,
        optimal_route_of_iteration,

        // nextrandom_selection_probability,
        population_relative_information_entropy:
            current_population_relative_information_entropy,
    };
}
