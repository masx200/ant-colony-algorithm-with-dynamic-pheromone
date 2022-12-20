import { EChartsType } from "echarts";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { drawrouteofnode_coordinates } from "./drawrouteofnode_coordinates";
import { debounce } from "lodash-es";
import { drawChartMaxWait, drawChartWait } from "./drawChartMaxWait";
import { debounce_animation_frame } from "./debounce_animation_frame";
export const draw_best_route_debounced = debounce_animation_frame(
    debounce(
        (
            route: number[],
            node_coordinates: NodeCoordinates,
            chart: Pick<EChartsType, "resize" | "setOption">
        ) => {
            drawrouteofnode_coordinates({
                route,
                node_coordinates,
                chart: chart,
            });
        },
        drawChartWait,
        {
            maxWait: drawChartMaxWait,
        }
    )
);
