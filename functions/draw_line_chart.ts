import { EChartsType } from "echarts";
import { draw_line_chart_raw } from "./draw_line_chart_raw";
import { idle_work } from "./idle_work";
export function draw_line_chart(options: {
    xAxis_min?: string | number;
    yAxis_min?: string | number;
    data: Array<[number, number]>;
    chart: Pick<EChartsType, "resize" | "setOption">;
    title_text: string;
}): void {
    idle_work(() => {
        draw_line_chart_raw(options);
    }, 2000);

    return;
}
