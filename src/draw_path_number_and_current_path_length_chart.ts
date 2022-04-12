import { EChartsType } from "echarts";
import { ShallowRef } from "vue";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { draw_line_chart } from "../functions/draw_line_chart";

export function draw_path_number_and_current_path_length_chart(
    path_number_and_current_path_length_chart: ShallowRef<
        Pick<EChartsType, "resize" | "setOption"> | undefined
    >,
    dataofoneroute: DataOfFinishOneRoute[]
) {
    const titletext = "路径序号和当前路径长度";
    const chart = path_number_and_current_path_length_chart.value;
    if (chart) {
        const data: [number, number][] = dataofoneroute.map((a) => [
            a.current_search_count,
            a.length,
        ]);
        draw_line_chart({
            yAxis_min: 0,
            titletext,
            data: data,
            chart: chart,
        });
    }
}
