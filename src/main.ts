import { createApp, h } from "vue";
import "../functions/echarts-line";
import appcom from "./appcom.vue";
import "./style.css";
document.title = "ant-colony-algorithm-with-dynamic-pheromone";

export const app = createApp({
    render() {
        return h(appcom);
    },
});
