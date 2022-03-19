import { debounce } from "lodash";
import { drawChartMaxWait, drawChartWait } from "./drawChartMaxWait";
import { draw_iteration_rounds_and_information_entropy_chart } from "./draw_iteration_rounds_and_information_entropy_chart";

export const draw_iteration_rounds_and_information_entropy_chart_debounced =
    debounce(
        draw_iteration_rounds_and_information_entropy_chart,
        drawChartWait,
        {
            maxWait: drawChartMaxWait,
        }
    );
