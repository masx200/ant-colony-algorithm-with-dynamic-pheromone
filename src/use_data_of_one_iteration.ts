import { computed, ComputedRef, reactive } from "vue";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";

export function use_data_of_one_iteration(): {
    onreceivedataofoneIteration: (data: DataOfFinishOneIteration) => void;
    clearDataOfOneIteration: () => void;
    dataofoneiteration: DataOfFinishOneIteration[];
    oneiterationtablebody: ComputedRef<
        [number, number, number, number, number, number, number, number][]
    >;
    oneiterationtableheads: string[];
} {
    const oneiterationtableheads = [
        "序号",
        "信息熵",
        "随机选择概率",
        "耗时秒",
        "迭代最优长度",
        "迭代平均长度",
        "全局最优长度",
        "收敛性系数",
    ];
    const onreceivedataofoneIteration = function onreceivedataofoneIteration(
        data: DataOfFinishOneIteration
    ) {
        dataofoneiteration.push(data);
    };
    const clearDataOfOneIteration = function clearDataOfOneIteration(): void {
        dataofoneiteration.length = 0;
    };
    const dataofoneiteration = reactive<DataOfFinishOneIteration[]>([]);
    const oneiterationtablebody = computed<
        [number, number, number, number, number, number, number, number][]
    >(() => {
        return dataofoneiteration.map((data, index) => {
            return [
                index + 1,
                data.population_relative_information_entropy,
                data.random_selection_probability,

                data.time_ms_of_one_iteration / 1000,
                data.optimal_length_of_iteration,
                data.average_length_of_iteration,
                data.global_best_length,
                data.convergence_coefficient,
            ];
        });
    });
    return {
        oneiterationtableheads,
        onreceivedataofoneIteration,
        clearDataOfOneIteration,
        dataofoneiteration,
        oneiterationtablebody,
    };
}
