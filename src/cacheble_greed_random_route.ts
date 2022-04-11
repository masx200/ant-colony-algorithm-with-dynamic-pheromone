import { getnumberfromarrayofnmber } from "../functions/getnumberfromarrayofnmber";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { pickRandomOne } from "../functions/pickRandomOne";
import { thread_Greedy_algorithm_to_solve_tsp_with_selected_start } from "./thread_Greedy_algorithm_to_solve_tsp_with_selected_start";

const node_coordinates_to_greed_random_route = new WeakMap<
    NodeCoordinates,
    Promise<{
        route: number[];
        length: number;
    }>
>();
export async function cacheble_greed_random_route({
    node_coordinates,
    round = false,
    max_cities_of_greedy = Infinity,
}: {
    node_coordinates: NodeCoordinates;
    round?: boolean;
    max_cities_of_greedy?: number;
}): Promise<{
    route: number[];
    length: number;
}> {
    const cache = node_coordinates_to_greed_random_route.get(node_coordinates);
    if (cache) {
        return cache;
    } else {
        const inputindexs = Array(node_coordinates.length)
            .fill(0)
            .map((_v, i) => i);
        const start = getnumberfromarrayofnmber(pickRandomOne(inputindexs));
        const route_promise =
            thread_Greedy_algorithm_to_solve_tsp_with_selected_start({
                node_coordinates,
                start,
                round,
                max_cities_of_greedy,
            });
        node_coordinates_to_greed_random_route.set(
            node_coordinates,
            route_promise
        );
        const route = await route_promise;
        return route;
    }
}
