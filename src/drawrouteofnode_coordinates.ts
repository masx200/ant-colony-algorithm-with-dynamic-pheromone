import { EChartsType } from "echarts";
import { closed_total_path_length } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { cycle_reorganize } from "../functions/cycle_reorganize";
import { drawlinechart } from "../functions/drawlinechart";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { get_distance_round } from "./set_distance_round";

export function drawrouteofnode_coordinates({
    route,
    node_coordinates,
    chart,
}: {
    route: number[];
    node_coordinates: NodeCoordinates;

    chart: Pick<EChartsType, "resize" | "setOption">;
}) {
    //画图的时候重新排列一下顺序
    const greedypath = cycle_reorganize(route, 0);
    const length = closed_total_path_length({
        round: get_distance_round(),
        path: route,
        getdistancebyindex: creategetdistancebyindex(
            node_coordinates,
            get_distance_round()
        ),
    });
    const linechardata = [...greedypath, greedypath[0]].map(
        (v) => node_coordinates[v]
    );
    // console.log("贪心算法路径结果画图坐标", linechardata);
    // console.log("贪心算法得到的路径是", greedypath);
    // console.log("贪心算法得到的长度是", length);
    // console.log("test drawlinechart", route, greedypath);
    // const chart = chart;
    drawlinechart({
        // resize,
        data: linechardata,
        chart: chart,
        titletext: `城市数:${node_coordinates.length},路径长度:${length}`,
    });
}
