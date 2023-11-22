// import { EChartsType } from "echarts";
// import { ShallowRef } from "vue";
import { ECBasicOption } from "echarts/types/dist/shared";
import { create_line_chart_options } from "../functions/create_line_chart_options";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { ECOption } from "../functions/echarts-line";
// import { draw_line_chart } from "../functions/draw_line_chart";

export function get_options_iterations_and_information_entropy_chart(
    // iteration_rounds_and_information_entropy_chart: ShallowRef<
    //     Pick<EChartsType, "resize" | "setOption"> | undefined
    // >,
    dataofoneiteration: DataOfFinishOneIteration[],
): ECBasicOption & ECOption {
    const title_text = "迭代轮次和相对信息熵";
    // const chart = iteration_rounds_and_information_entropy_chart.value;
    // if (chart) {
    const data: [number, number][] = dataofoneiteration.map((a) => [
        a.current_iterations,
        a.population_relative_information_entropy,
    ]);
    return create_line_chart_options({
        yAxis_min: 0,
        title_text,
        data: data,
        // chart: chart,
    });
    // }
}
