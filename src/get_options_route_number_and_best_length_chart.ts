// import { EChartsType } from "echarts";
import { ECBasicOption } from "echarts/types/dist/shared";
// import { ShallowRef } from "vue";
import { create_line_chart_options } from "../functions/create_line_chart_options";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
// import { draw_line_chart } from "../functions/draw_line_chart";
import { ECOption } from "../functions/echarts-line";

export function get_options_route_number_and_best_length_chart(
    // path_number_and_optimal_path_length_chart: ShallowRef<
    //     undefined | Pick<EChartsType, "resize" | "setOption">
    // >,
    dataofoneroute: DataOfFinishOneRoute[]
): ECBasicOption & ECOption {
    const title_text = "路径序号和最优路径长度";
    // const chart = path_number_and_optimal_path_length_chart.value;
    // if (chart) {
    const data: [number, number][] = dataofoneroute.map((a) => [
        a.current_search_count,
        a.global_best_length,
    ]);
    return create_line_chart_options({
        yAxis_min: 0,
        title_text,
        data: data,
        // chart: chart,
    });
    // }
}
