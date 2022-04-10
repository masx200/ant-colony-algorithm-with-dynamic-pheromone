import { createApp, h } from "vue";
import "../functions/echarts-line";
import appcom from "./appcom.vue";
// import { appcontainer } from "./appcontainer";
import "./style.css";
// import { TSP_cities_map } from "./TSP_cities_map";

document.title = "ant-colony-algorithm-without-storing-pheromone";

export const app = createApp({
    render() {
        return h(appcom);
    },
});

// console.log(app);
// console.log(TSP_cities_map);
// console.log(divide_route_to_k_opt_random);
// console.log(split_cycle_route_to_3_sections);
