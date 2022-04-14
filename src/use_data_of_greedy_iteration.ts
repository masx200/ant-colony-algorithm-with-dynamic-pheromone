import { computed, ComputedRef, reactive } from "vue";
import { DataOfFinishGreedyIteration } from "../functions/DataOfFinishGreedyIteration";

export function use_data_of_greedy_iteration(): {
    onreceivedata: (data: DataOfFinishGreedyIteration) => void;
    clearData: () => void;
    dataraw: DataOfFinishGreedyIteration[];
    tablebody: ComputedRef<[number, number, number, number, number, number][]>;
    tableheads: string[];
} {
    const tableheads = [
        "序号",
        "耗时秒",
        "贪心最优长度",
        "贪心平均长度",
        "贪心最差长度",
        "全局最优长度",
    ];
    const onreceivedata = function onreceivedataofoneIteration(
        data: DataOfFinishGreedyIteration
    ) {
        dataraw.push(data);
    };
    const clearData = function clearData(): void {
        dataraw.length = 0;
    };
    const dataraw = reactive<DataOfFinishGreedyIteration[]>([]);
    const tablebody = computed<
        [number, number, number, number, number, number][]
    >(() => {
        return dataraw.map((data, index) => {
            return [
                index + 1,
                data.time_ms_of_one_iteration / 1000,
                data.optimal_length_of_iteration,
                data.average_length_of_iteration,
                data.worst_length_of_iteration,
                data.global_best_length,
            ];
        });
    });
    return {
        tableheads,
        onreceivedata,
        clearData,
        dataraw: dataraw,
        tablebody,
    };
}
