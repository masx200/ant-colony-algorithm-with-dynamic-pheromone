import { createApp, h } from "vue";
import "../functions/echarts-line";
import appcom from "./appcom.vue";
import { appcontainer } from "./appcontainer";
import "./style.css";
import { TSP_cities_map } from "./TSP_cities_map";

document.title = "ant-colony-algorithm-function-test";

const app = createApp({
    render() {
        return h(appcom);
    },
});
app.mount(appcontainer);
console.log(TSP_cities_map);
