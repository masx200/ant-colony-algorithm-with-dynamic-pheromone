// import { EChartsType } from "echarts";
import { ECBasicOption } from "echarts/types/dist/shared";
import { closed_total_path_length } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { create_line_chart_options } from "../functions/create_line_chart_options";
import { cycle_reorganize } from "../functions/cycle_reorganize";
import { ECOption } from "../functions/echarts-line";
// import { draw_line_chart } from "../functions/draw_line_chart";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { assert_true } from "../test/assert_true";
import { get_distance_round } from "./set_distance_round";

export function get_options_route_of_node_coordinates({
    route,
    node_coordinates,
}: {
    route: number[];
    node_coordinates: NodeCoordinates;
}): ECBasicOption & ECOption {
    assert_true(node_coordinates.length === route.length);
    const reorganize_route = cycle_reorganize(route, 0);
    const length = closed_total_path_length({
        round: get_distance_round(),
        path: route,
        getdistancebyindex: creategetdistancebyindex(
            node_coordinates,
            get_distance_round()
        ),
    });
    const linechardata = [...reorganize_route, reorganize_route[0]].map(
        (v) => node_coordinates[v]
    );
    return create_line_chart_options({
        xAxis_min:"dataMin",
        yAxis_min:"dataMin",
        data: linechardata,
        // chart: chart,
        title_text: `城市数:${node_coordinates.length},路径长度:${length}`,
    });
}
