import { EChartsType } from "echarts";
import { ECOption } from "./echarts-line";

export function drawlinechart({
    xAxis_min = "dataMin",
    yAxis_min = "dataMin",
    data,
    chart,
    titletext,
}: {
    xAxis_min?: string | number;
    yAxis_min?: string | number;
    data: Array<[number, number]>;
    chart: Pick<EChartsType, "resize" | "setOption">;
    titletext: string;
}) {
    const option: ECOption = {
        animation: false,
        title: { text: titletext },
        xAxis: { min: xAxis_min, max: "dataMax" },
        yAxis: { min: yAxis_min, max: "dataMax" },
        series: [
            {
                label: {
                    show: false,
                },
                emphasis: {
                    label: {
                        show: true,
                        formatter(parm) {
                            return (
                                "(" +
                                Array.from([parm.data].flat()).join(",") +
                                ")"
                            );
                        },
                    },
                },
                data: data,
                type: "line",
            },
        ],
    };
    chart.setOption(option, { lazyUpdate: true });
    chart.resize();
}
