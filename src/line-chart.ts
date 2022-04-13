import { use_escharts_container_pair } from "./use_escharts_container_pair";

import {
    defineComponent,
    onMounted,
    onUnmounted,
    PropType,
    ref,
    watch,
} from "vue";
import { ECBasicOption } from "echarts/types/dist/shared";
import { run_idle_work } from "../functions/run_idle_work";

export default defineComponent({
    props: {
        options: { required: true, type: Object as PropType<ECBasicOption> },
    },
    setup(props) {
        const { container: container, chart: chart } =
            use_escharts_container_pair();
        const intersect = ref(false);
        const intersection_observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    intersect.value = true;
                } else {
                    intersect.value = false;
                }
            });
        });
        onUnmounted(() => {
            intersection_observer.disconnect();
        });
        const update_chart = () =>
            run_idle_work(function update_chart() {
                if (!chart.value) {
                    return;
                }
                if (!intersect.value) {
                    return;
                }
                chart.value.resize();
                chart.value.setOption(props.options);
            }, 4000);
        onMounted(() => {
            watch(
                () => props.options,
                () => {
                    update_chart();
                }
            );
            watch(
                () => {
                    return {
                        chart: chart.value,
                        intersect: intersect.value,
                    };
                },
                () => {
                    update_chart();
                }
            );

            watch(container, (container) => {
                container && intersection_observer.observe(container);
            });
        });

        return { container };
    },
});
