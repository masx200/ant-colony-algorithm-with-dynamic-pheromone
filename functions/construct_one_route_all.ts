import { generate_paths_using_state_transition_probabilities } from "./generate-paths-using-state-transition-probabilities";

import { NodeCoordinates } from "./NodeCoordinates";
import { SharedOptions } from "./SharedOptions";

/* 只是生成一条路径 */
export function construct_one_route_all(
    options: {
        current_search_count: number;

        node_coordinates: NodeCoordinates;
        count_of_nodes: number;

        alpha_zero: number;
        beta_zero: number;
        lastrandomselectionprobability: number;
    } & SharedOptions
): {
    route: number[];
    length: number;
} {
    const {
        node_coordinates,

        pheromoneStore,

        alpha_zero,
        beta_zero,
        lastrandomselectionprobability,
    } = options;

    const result = generate_paths_using_state_transition_probabilities({
        ...options,
        pheromoneStore,
        alpha_zero,
        beta_zero,
        randomselectionprobability: lastrandomselectionprobability,
        node_coordinates,
    });
    //最优解有交叉点
    return result;
}
