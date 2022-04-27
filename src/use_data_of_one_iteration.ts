import { reactive } from "vue";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";

export function use_data_of_one_iteration() {
    const oneiterationtableheads = [
        "序号",
        "信息熵",
        "随机选择概率",
        "耗时秒",
        "迭代最优长度",
        "迭代平均长度",
        "迭代最差长度",
        "全局最优长度",

        "局部优化长度",
        "收敛性系数",
    ];
    const onreceivedataofoneIteration = function onreceivedataofoneIteration(
        datas: DataOfFinishOneIteration[]
    ) {
        if (datas.length > dataofoneiteration.length) {
            for (let i = dataofoneiteration.length; i < datas.length; i++) {
                const data = datas[i];
                dataofoneiteration.push(data);
                oneiterationtablebody.push([
                    data.current_iterations,
                    data.population_relative_information_entropy,
                    data.random_selection_probability,

                    data.time_ms_of_one_iteration / 1000,
                    data.iterate_best_length,
                    data.average_length_of_iteration,
                    data.worst_length_of_iteration,
                    data.global_best_length,

                    data.optimal_length_of_iteration,
                    data.convergence_coefficient,
                ]);
            }
        }
        // dataofoneiteration.length = 0;
        // oneiterationtablebody.length = 0;
        // datas.forEach((data) => {
        //     dataofoneiteration.push(data);
        //     oneiterationtablebody.push([
        //         data.current_iterations,
        //         data.population_relative_information_entropy,
        //         data.random_selection_probability,

        //         data.time_ms_of_one_iteration / 1000,
        //         data.iterate_best_length,
        //         data.average_length_of_iteration,
        //         data.worst_length_of_iteration,
        //         data.global_best_length,

        //         data.optimal_length_of_iteration,
        //         data.convergence_coefficient,
        //     ]);
        // });
    };
    const clearDataOfOneIteration = function clearDataOfOneIteration(): void {
        dataofoneiteration.length = 0;
    };
    const dataofoneiteration = reactive<DataOfFinishOneIteration[]>([]);
    const oneiterationtablebody: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ][] = reactive([]);
    /* computed<
        [
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number
        ][]
    >(() => {
        return dataofoneiteration.map((data, index) => {
            return [
                index + 1,
                data.population_relative_information_entropy,
                data.random_selection_probability,

                data.time_ms_of_one_iteration / 1000,
                data.iterate_best_length,
                data.average_length_of_iteration,
                data.global_best_length,

                data.optimal_length_of_iteration,
                data.convergence_coefficient,
            ];
        });
    }); */
    return {
        oneiterationtableheads,
        onreceivedataofoneIteration,
        clearDataOfOneIteration,
        dataofoneiteration,
        oneiterationtablebody,
    };
}
