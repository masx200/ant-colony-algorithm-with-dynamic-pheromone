import { EChartsType } from "echarts";
import { Ref, ShallowRef } from "vue";
import { DefaultOptions } from "./default_Options";
import { get_distance_round } from "./set_distance_round";
import { showanddrawrandomgreedyoftsp } from "./showanddrawrandomgreedyoftsp";
import { TSP_cities_map } from "./TSP_cities_map";

export function use_submit({
    selecteleref,
    chart_store_latest,
    chart_store_best,
}: {
    selecteleref: Ref<HTMLSelectElement | undefined>;
    chart_store_latest: ShallowRef<
        Pick<EChartsType, "resize" | "setOption"> | undefined
    >;
    chart_store_best: ShallowRef<
        Pick<EChartsType, "resize" | "setOption"> | undefined
    >;
}) {
    return async () => {
        const element = selecteleref.value;
        const node_coordinates = TSP_cities_map.get(element?.value || "");
        if (node_coordinates) {
            const latestchart = chart_store_latest.value;
            if (latestchart) {
                await showanddrawrandomgreedyoftsp({
                    node_coordinates: await node_coordinates(),
                    chart: latestchart,
                    round: get_distance_round(),
                    max_cities_of_greedy: DefaultOptions.max_cities_of_greedy,
                });
            }
            const bestchart = chart_store_best.value;
            if (bestchart) {
                await showanddrawrandomgreedyoftsp({
                    node_coordinates: await node_coordinates(),
                    chart: bestchart,
                    round: get_distance_round(),
                    max_cities_of_greedy: DefaultOptions.max_cities_of_greedy,
                });
            }
        }
    };
}
