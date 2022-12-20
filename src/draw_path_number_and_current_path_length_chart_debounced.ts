import { debounce } from "lodash-es";
import { drawChartMaxWait, drawChartWait } from "./drawChartMaxWait";
import { draw_path_number_and_current_path_length_chart } from "./draw_path_number_and_current_path_length_chart";
import { debounce_animation_frame } from "./debounce_animation_frame";
export const draw_path_number_and_current_path_length_chart_debounced =
    debounce_animation_frame(
        debounce(
            draw_path_number_and_current_path_length_chart,
            drawChartWait,
            {
                maxWait: drawChartMaxWait,
            }
        )
    );
