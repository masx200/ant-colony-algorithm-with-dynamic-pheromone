import { EChartsType } from "echarts";
import { draw_line_chart_raw } from "./draw_line_chart_raw";
export function draw_line_chart(options: {
    xAxis_min?: string | number;
    yAxis_min?: string | number;
    data: Array<[number, number]>;
    chart: Pick<EChartsType, "resize" | "setOption">;
    titletext: string;
}): void {
    return draw_line_chart_raw(options);
}
