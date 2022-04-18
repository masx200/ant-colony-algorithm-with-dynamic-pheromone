import { reactive } from "vue";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";

export function use_data_of_one_route() {
    const onreceivedataofoneroute = function onreceivedataofoneroute(
        datas: DataOfFinishOneRoute[]
    ): void {
        dataofoneroute.length = 0;
        datas.forEach((data) => {
            dataofoneroute.push(data);
        });
    };

    const clearDataOfOneRoute = function clearDataOfOneRoute() {
        dataofoneroute.length = 0;
    };
    const dataofoneroute = reactive<DataOfFinishOneRoute[]>([]);
    // const oneroutetablebody = computed<
    //     [number, number, number, number, number /* , number, number */][]
    // >(() => {
    //     return dataofoneroute.map((data, index) => {
    //         return [
    //             index + 1,
    //             data.length,
    //             data.global_best_length,
    //             data.time_ms_of_one_route / 1000,
    //             data.total_time_ms / 1000,
    //         ];
    //     });
    // });
    // const oneroutetableheads = [
    //     "序号",
    //     "当前长度",
    //     "全局最优长度",
    //     "当前耗时秒",
    //     "总计耗时秒",
    // ];
    const result = {
        dataofoneroute,
        // oneroutetablebody,
        onreceivedataofoneroute,
        clearDataOfOneRoute,
        // oneroutetableheads,
    };
    return result;
}
