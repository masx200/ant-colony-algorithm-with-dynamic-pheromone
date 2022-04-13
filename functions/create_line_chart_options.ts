import { ECOption } from "./echarts-line";

import { ECBasicOption } from "echarts/types/dist/shared";

export function create_line_chart_options({
    title_text,
    xAxis_min,
    yAxis_min,
    data,
}: {
    title_text: string;
    xAxis_min?: string | number;
    yAxis_min?: string | number;
    data: [number, number][];
}): ECBasicOption & ECOption {
    return {
        animation: false,
        title: { text: title_text },
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
}
