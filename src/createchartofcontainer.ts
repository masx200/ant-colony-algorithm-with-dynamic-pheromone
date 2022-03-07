import * as echarts from "echarts/core";
import { debounce } from "lodash";

/* 创建echarts实例 */
export function createchartofcontainer(
    container: HTMLElement
): echarts.ECharts {
    const debouncedresize = debounce(() => {
        myChart.resize();
    });
    // const container = document.body.appendChild(document.createElement("div"));
    // document.body.appendChild(document.createElement("hr"));

    const myChart = echarts.init(container);

    // container.style.width = "100%";
    // container.style.height = "100%";
    const resizeobserver = new ResizeObserver(debouncedresize);
    resizeobserver.observe(container);
    window.addEventListener("resize", debouncedresize);
    return myChart;
}