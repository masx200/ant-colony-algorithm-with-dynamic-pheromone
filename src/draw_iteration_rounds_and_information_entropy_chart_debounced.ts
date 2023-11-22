import { debounce } from "lodash-es";
import { debounce_animation_frame } from "./debounce_animation_frame";
import { drawChartMaxWait, drawChartWait } from "./drawChartMaxWait";
import { draw_iteration_rounds_and_information_entropy_chart } from "./draw_iteration_rounds_and_information_entropy_chart";

export const draw_iteration_rounds_and_information_entropy_chart_debounced =
    debounce_animation_frame(
        debounce(
            draw_iteration_rounds_and_information_entropy_chart,
            drawChartWait,
            {
                maxWait: drawChartMaxWait,
            },
        ),
    );
