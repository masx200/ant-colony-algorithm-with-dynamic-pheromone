import { EChartsType } from "echarts";
import { draw_line_chart_raw } from "./draw_line_chart_raw";
import { run_idle_work } from "./run_idle_work";
export function draw_line_chart(options: {
    xAxis_min?: string | number;
    yAxis_min?: string | number;
    data: Array<[number, number]>;
    chart: Pick<EChartsType, "resize" | "setOption">;
    title_text: string;
}): void {
    run_idle_work(() => {
        draw_line_chart_raw(options);
    }, 4000);

    return;
}
