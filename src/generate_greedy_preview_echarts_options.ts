// import { EChartsType } from "echarts";
import { ECBasicOption } from "echarts/types/dist/shared";
import { Ref } from "vue";
import { DefaultOptions } from "./default_Options";
import { get_distance_round } from "./set_distance_round";
import { get_options_of_random_greedy_of_tsp } from "./get_options_of_random_greedy_of_tsp";
import { TSP_cities_map } from "./TSP_cities_map";
import { ECOption } from "../functions/echarts-line";

export async function generate_greedy_preview_echarts_options({
    selecteleref,
}: // chart_store_latest,
// chart_store_best,
{
    selecteleref: Ref<HTMLSelectElement | undefined>;
    // chart_store_latest: ShallowRef<
    //     Pick<EChartsType, "resize" | "setOption"> | undefined
    // >;
    // chart_store_best: ShallowRef<
    //     Pick<EChartsType, "resize" | "setOption"> | undefined
    // >;
}): Promise<ECBasicOption & ECOption> {
    const element = selecteleref.value;
    const node_coordinates = TSP_cities_map.get(element?.value || "");
    if (node_coordinates) {
        // const latestchart = chart_store_latest.value;
        // if (latestchart) {
        const options = await get_options_of_random_greedy_of_tsp({
            node_coordinates: await node_coordinates(),
            // chart: latestchart,
            round: get_distance_round(),
            max_cities_of_greedy: DefaultOptions.max_cities_of_greedy,
        });
        return options;
        // }
        // const bestchart = chart_store_best.value;
        // if (bestchart) {
        //     await showanddrawrandomgreedyoftsp({
        //         node_coordinates: await node_coordinates(),
        //         chart: bestchart,
        //         round: get_distance_round(),
        //         max_cities_of_greedy: DefaultOptions.max_cities_of_greedy,
        //     });
        // }
    } else {
        throw Error("node_coordinates not found");
    }
}
