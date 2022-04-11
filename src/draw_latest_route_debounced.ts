import { EChartsType } from "echarts";
import { debounce } from "lodash";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { drawChartMaxWait, drawChartWait } from "./drawChartMaxWait";
import { debounce_animation_frame } from "./debounce_animation_frame";
import { drawrouteofnode_coordinates } from "./drawrouteofnode_coordinates";

export const draw_latest_route_debounced = debounce_animation_frame(
    debounce(
        (
            route: number[],
            node_coordinates: NodeCoordinates,
            latestchart: Pick<EChartsType, "resize" | "setOption">
        ) => {
            drawrouteofnode_coordinates({
                route,
                node_coordinates,
                chart: latestchart,
            });
        },
        drawChartWait,
        {
            maxWait: drawChartMaxWait,
        }
    )
);
