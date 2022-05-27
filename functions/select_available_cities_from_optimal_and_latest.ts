import intersection from "lodash/intersection";
import difference from "lodash/difference";
// import { ArrayShuffle } from "./ArrayShuffle";

export function select_available_cities_from_optimal_and_latest({
    available_nodes,
    get_neighbors_from_optimal_routes_and_latest_routes,
    current_city,
    max_size_of_cities,
}: {
    available_nodes: Set<number>;
    get_neighbors_from_optimal_routes_and_latest_routes: (
        current_city: number
    ) => number[];
    current_city: number;
    max_size_of_cities: number;
}): number[] {
    const maximum = Math.max(max_size_of_cities, available_nodes.size);

    const neighbors = intersection(
        get_neighbors_from_optimal_routes_and_latest_routes(current_city),
        Array.from(available_nodes)
    );
    const slice_from_start = Math.random() < 0.5;
    let rest_nodes = difference(Array.from(available_nodes), neighbors);
    rest_nodes = slice_from_start
        ? rest_nodes.slice(0, maximum - neighbors.length)
        : rest_nodes.slice(-maximum - neighbors.length);
    const source = [...neighbors, ...rest_nodes]; //.flat();
    const result: number[] = source;
    // const result: number[] = source.slice(0, maximum);
    return result;
}
