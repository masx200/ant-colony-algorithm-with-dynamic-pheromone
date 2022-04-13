import { EChartsType } from "echarts";
import { onMounted, onUnmounted, Ref, ref, ShallowRef, shallowRef } from "vue";
import { use_create_chart_of_container } from "./use_create_chart_of_container";

export function use_escharts_container_pair(): {
    container: Ref<HTMLDivElement | undefined>;
    chart: ShallowRef<undefined | Pick<EChartsType, "resize" | "setOption">>;
} {
    const container = ref<HTMLDivElement>();
    const chart = shallowRef<Pick<EChartsType, "resize" | "setOption">>();
    onMounted(() => {
        const container_element = container.value;
        if (chart.value) {
            return;
        }
        if (container_element) {
            const bestchart = use_create_chart_of_container(
                container_element,
                onUnmounted
            );
            chart.value = bestchart;
        }
    });
    return { chart, container };
}
