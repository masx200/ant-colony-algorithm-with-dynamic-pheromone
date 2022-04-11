import { EChartsType } from "echarts";
import * as echarts from "echarts";
import { debounce } from "lodash";
import { debounce_animation_frame } from "./debounce_animation_frame";

export function createchartofcontainer(
    container: HTMLElement
): Pick<EChartsType, "resize" | "setOption"> {
    const debouncedresize = debounce_animation_frame(
        debounce(() => {
            chart.resize();
        })
    );
    const chart = echarts.init(container);

    const resizeobserver = new ResizeObserver(debouncedresize);
    resizeobserver.observe(container);
    window.addEventListener("resize", debouncedresize);
    const keys = ["resize", "setOption"];
    keys.forEach((key) => {
        Reflect.set(chart, key, Reflect.get(chart, key).bind(chart));
    });

    const resize = debounce_animation_frame(
        debounce(chart.resize)
    ) as EChartsType["resize"];

    const setOption = debounce_animation_frame(
        debounce(chart.setOption)
    ) as EChartsType["setOption"];

    return { resize, setOption } as Pick<EChartsType, "resize" | "setOption">;
}
