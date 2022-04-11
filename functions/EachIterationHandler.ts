import { assert_true } from "../test/assert_true";
import { calc_population_relative_information_entropy } from "./calc_population-relative-information-entropy";
import { get_best_routeOfSeriesRoutesAndLengths } from "./get_best_routeOfSeriesRoutesAndLengths";
import { NodeCoordinates } from "./NodeCoordinates";

import { SharedOptions } from "./SharedOptions";

export function EachIterationHandler(
    options: SharedOptions & {
        routesandlengths: {
            route: number[];
            length: number;
        }[];

        get_best_route: () => number[];
        get_best_length: () => number;
        node_coordinates: NodeCoordinates;
    }
): {
    coefficient_of_diversity_increase: number;
    // nextrandomselectionprobability: number;

    optimallengthofthis_iteration: number;
    optimalrouteofthis_iteration: number[];

    population_relative_information_entropy: number;
} {
    const { routesandlengths } = options;
    const routes = routesandlengths.map(({ route }) => route);

    const current_population_relative_information_entropy =
        calc_population_relative_information_entropy(routes);

    const coefficient_of_diversity_increase = Math.sqrt(
        1 - Math.pow(current_population_relative_information_entropy, 2)
    );

    assert_true(!Number.isNaN(current_population_relative_information_entropy));
    // assert_true(!Number.isNaN(nextrandomselectionprobability));

    const iteratebestlengthandroute =
        get_best_routeOfSeriesRoutesAndLengths(routesandlengths);

    const iteratebestlength = iteratebestlengthandroute.length;
    const iteratebestroute = iteratebestlengthandroute.route;
    const optimalrouteofthis_iteration = iteratebestroute;
    const optimallengthofthis_iteration = iteratebestlength;
    return {
        coefficient_of_diversity_increase,
        optimallengthofthis_iteration,
        optimalrouteofthis_iteration,

        // nextrandomselectionprobability,
        population_relative_information_entropy:
            current_population_relative_information_entropy,
    };
}
