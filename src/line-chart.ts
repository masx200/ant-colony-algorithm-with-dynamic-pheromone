import { use_escharts_container_pair } from "./use_escharts_container_pair";
import { throttle } from "lodash-es";
import {
    defineComponent,
    onMounted,
    // onUnmounted,
    PropType,
    // ref,
    watch,
} from "vue";
import { ECBasicOption } from "echarts/types/dist/shared";
import { run_idle_work } from "../functions/run_idle_work";
import { debounce_animation_frame } from "./debounce_animation_frame";
import { drawChartWait } from "./drawChartMaxWait";

export default defineComponent({
    props: {
        options: { required: true, type: Object as PropType<ECBasicOption> },
    },
    setup(props) {
        const debounced_update = throttle(
            debounce_animation_frame(function update_chart() {
                // console.log("update_chart", props.options, chart, intersect);
                if (!chart.value) {
                    return;
                }
                // if (!intersect.value) {
                //     return;
                // }
                // console.log("render chart");
                chart.value.resize();
                chart.value.setOption(props.options, { lazyUpdate: true });
            }),
            drawChartWait
        );
        const { container: container, chart: chart } =
            use_escharts_container_pair();
        // const intersect = ref(true);
        // const intersection_observer = new IntersectionObserver((entries) => {
        //     entries.forEach((entry) => {
        //         if (entry.intersectionRatio > 0) {
        //             intersect.value = true;
        //         } else {
        //             intersect.value = false;
        //         }
        //     });
        // });
        // onUnmounted(() => {
        //     intersection_observer.disconnect();
        // });

        const update_chart = function () {
            run_idle_work(debounced_update, 4000);
        };
        onMounted(() => {
            update_chart();
            watch(props, () => {
                update_chart();
            });
            // watch(
            //     intersect,
            //     // () => {
            //     //     return {
            //     //         chart: chart.value,
            //     //         // intersect: intersect.value,
            //     //     };
            //     // },
            //     () => {
            //         update_chart();
            //     }
            // );
            watch(
                chart,
                // () => {
                //     return {
                //         chart: chart.value,
                //         // intersect: intersect.value,
                //     };
                // },
                () => {
                    update_chart();
                }
            );

            // watch(container, (container) => {
            //     container && intersection_observer.observe(container);
            // });
        });

        return { container };
    },
});
