import { EChartsType } from "echarts";
import { ShallowRef } from "vue";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { drawlinechart } from "../functions/drawlinechart";

export function draw_iteration_rounds_and_information_entropy_chart(
    iteration_rounds_and_information_entropy_chart: ShallowRef<
        Pick<EChartsType, "resize" | "setOption"> | undefined
    >,
    dataofoneiteration: DataOfFinishOneIteration[]
) {
    const titletext = "迭代轮次和相对信息熵";
    const chart = iteration_rounds_and_information_entropy_chart.value;
    if (chart) {
        const data: [number, number][] = dataofoneiteration.map((a) => [
            a.current_iterations,
            a.population_relative_information_entropy,
        ]);
        drawlinechart({
            yAxis_min: 0,
            titletext,
            data: data,
            chart: chart,
        });
    }
}
