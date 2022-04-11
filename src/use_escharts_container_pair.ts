import { EChartsType } from "echarts";
import { onMounted, Ref, ref, ShallowRef, shallowRef } from "vue";
import { createchartofcontainer } from "./createchartofcontainer";

export function use_escharts_container_pair(): {
    container: Ref<HTMLDivElement | undefined>;
    chart: ShallowRef<undefined | Pick<EChartsType, "resize" | "setOption">>;
} {
    const container = ref<HTMLDivElement>();
    const chart = shallowRef<Pick<EChartsType, "resize" | "setOption">>();
    onMounted(() => {
        const containerofbest = container.value;

        if (containerofbest) {
            const bestchart = createchartofcontainer(containerofbest);
            chart.value = bestchart;
        }
    });
    return { chart, container };
}
