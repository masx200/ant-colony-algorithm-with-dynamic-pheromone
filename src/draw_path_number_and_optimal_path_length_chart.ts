import { EChartsType } from "echarts";
import { ShallowRef } from "vue";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { draw_line_chart } from "../functions/draw_line_chart";

export function draw_path_number_and_optimal_path_length_chart(
    path_number_and_optimal_path_length_chart: ShallowRef<
        undefined | Pick<EChartsType, "resize" | "setOption">
    >,
    dataofoneroute: DataOfFinishOneRoute[]
) {
    const titletext = "路径序号和最优路径长度";
    const chart = path_number_and_optimal_path_length_chart.value;
    if (chart) {
        const data: [number, number][] = dataofoneroute.map((a) => [
            a.current_search_count,
            a.global_best_length,
        ]);
        draw_line_chart({
            yAxis_min: 0,
            titletext,
            data: data,
            chart: chart,
        });
    }
}
