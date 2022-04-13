// import { EChartsType } from "echarts";
// import { ShallowRef } from "vue";
import { ECBasicOption } from "echarts/types/dist/shared";
import { create_line_chart_options } from "../functions/create_line_chart_options";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { ECOption } from "../functions/echarts-line";
// import { draw_line_chart } from "../functions/draw_line_chart";

export function get_options_route_number_and_current_length_chart(
    // path_number_and_current_path_length_chart: ShallowRef<
    //     Pick<EChartsType, "resize" | "setOption"> | undefined
    // >,
    dataofoneroute: DataOfFinishOneRoute[]
): ECBasicOption & ECOption {
    const title_text = "路径序号和当前路径长度";
    // const chart = path_number_and_current_path_length_chart.value;
    // if (chart) {
    const data: [number, number][] = dataofoneroute.map((a) => [
        a.current_search_count,
        a.length,
    ]);
    return create_line_chart_options({
        yAxis_min: 0,
        title_text,
        data: data,
        // chart: chart,
    });
    // }
}
