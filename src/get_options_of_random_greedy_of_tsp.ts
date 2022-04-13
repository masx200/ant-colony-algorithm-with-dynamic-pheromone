import { ECBasicOption } from "echarts/types/dist/shared";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { cacheble_greed_random_route } from "./cacheble_greed_random_route";
import { drawrouteofnode_coordinates } from "./drawrouteofnode_coordinates";
import { get_options_route_of_node_coordinates } from "./get_options_route_of_node_coordinates";

export async function get_options_of_random_greedy_of_tsp({
    node_coordinates,
    // chart,
    round = false,
    max_cities_of_greedy = Infinity,
}: {
    round?: boolean;
    max_cities_of_greedy?: number;
    node_coordinates: NodeCoordinates;
    // chart: Pick<EChartsType, "resize" | "setOption">;
}): Promise<ECBasicOption> {
    const { route } = await cacheble_greed_random_route({
        node_coordinates,
        round,
        max_cities_of_greedy,
    });
    return get_options_route_of_node_coordinates({
        route,
        node_coordinates,
        // chart,
    });
}
