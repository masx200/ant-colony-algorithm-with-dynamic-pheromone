import { EChartsType } from "echarts";
import { create_line_chart_options } from "./create_line_chart_options";
import { ECOption } from "./echarts-line";

export function draw_line_chart_raw({
    xAxis_min = "dataMin",
    yAxis_min = "dataMin",
    data,
    chart,
    title_text,
}: {
    xAxis_min?: string | number;
    yAxis_min?: string | number;
    data: Array<[number, number]>;
    chart: Pick<EChartsType, "resize" | "setOption">;
    title_text: string;
}) {
    const option: ECOption = create_line_chart_options({
        title_text,
        xAxis_min,
        yAxis_min,
        data,
    });
    chart.setOption(option, { lazyUpdate: false });
    chart.resize();
}

