// import intersection from "lodash/intersection";
// import difference from "lodash/difference";
// import { ArrayShuffle } from "./ArrayShuffle";

import { assert_true } from "../test/assert_true";

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
}): number[] | Set<number> {
    assert_true(available_nodes.size > 0);
    const maximum = Math.min(max_size_of_cities, available_nodes.size);
    const slice_from_start = Math.random() < 0.5;
    // const neighbors = intersection(
    //     get_neighbors_from_optimal_routes_and_latest_routes(current_city),
    //     Array.from(available_nodes)
    // );

    // let rest_nodes = difference(Array.from(available_nodes), neighbors);
    // rest_nodes = slice_from_start
    //     ? rest_nodes.slice(0, maximum - neighbors.length)
    //     : rest_nodes.slice(-maximum - neighbors.length);
    const source = new Set<number>();
    for (const city of get_neighbors_from_optimal_routes_and_latest_routes(
        current_city
    )) {
        if (available_nodes.has(city)) {
            source.add(city);
        }
    }
    const rest_nodes = Array.from(available_nodes);
    if (slice_from_start) {
        for (let i = 0; i < rest_nodes.length; i++) {
            if (source.size < maximum) {
                source.add(rest_nodes[i]);
            } else {
                break;
            }
        }
    } else {
        for (let i = rest_nodes.length - 1; i >= 0; i--) {
            if (source.size < maximum) {
                source.add(rest_nodes[i]);
            } else {
                break;
            }
        }
    }
    const result = Array.from(source);
    // const result: number[] = Array.from(source).slice(0, maximum);
    assert_true(result.length <= available_nodes.size);
    assert_true(result.length <= max_size_of_cities);
    assert_true(result.length > 0);
    return result;
}
