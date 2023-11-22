import { random } from "lodash-es";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { generate_k_opt_cycle_routes_limited } from "../k-opt/generate_k_opt_cycle_routes_limited";
import { divide_route_to_2_opt_with_segment } from "./divide_route_to_2-opt-with-segment";
import { find_one_intersection_partial_with_cycle_route } from "./find_one_intersection_partial_with_cycle_route";
import { generate_2_opt_cycle_routes_with_splitted_Routes } from "./generate_2_opt_cycle_routes_with_splitted_Routes";
export function generate_2_opt_routes_by_random_or_cross_point({
    max_of_segments,
    route,
    node_coordinates,
    count_of_nodes,
}: {
    max_of_segments: number;
    route: number[];
    node_coordinates: NodeCoordinates;
    count_of_nodes: number;
}): number[][] {
    const intersection = find_one_intersection_partial_with_cycle_route({
        max_of_segments,
        cycle_route: route,
        node_coordinates,
    });
    if (intersection) {
        const splitted_Routes = divide_route_to_2_opt_with_segment(
            route,
            intersection,
        );
        const routes_of_2_opt_accurate =
            generate_2_opt_cycle_routes_with_splitted_Routes(
                route,
                splitted_Routes,
            );
        return routes_of_2_opt_accurate;
    } else {
        const k = Math.round(random(2, Math.floor(count_of_nodes / 2), false));
        return generate_k_opt_cycle_routes_limited({
            k: k,
            oldRoute: route,
            max_results: 1,
        });
    }
}
