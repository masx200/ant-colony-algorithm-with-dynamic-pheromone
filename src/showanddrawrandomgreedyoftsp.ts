import { EChartsType } from "echarts";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { cacheble_greed_random_route } from "./cacheble_greed_random_route";
import { drawrouteofnode_coordinates } from "./drawrouteofnode_coordinates";

export async function showanddrawrandomgreedyoftsp({
    node_coordinates,
    chart,
    round = false,
    max_cities_of_greedy = Infinity,
}: {
    round?: boolean;
    max_cities_of_greedy?: number;
    node_coordinates: NodeCoordinates;
    chart: Pick<EChartsType, "resize" | "setOption">;
}) {
    const { route } = await cacheble_greed_random_route({
        node_coordinates,
        round,
        max_cities_of_greedy,
    });
    drawrouteofnode_coordinates({
        route,
        node_coordinates,
        chart,
    });
}
