import { computed, ComputedRef, reactive } from "vue";
import { DataOfFinishGreedyIteration } from "../functions/DataOfFinishGreedyIteration";

export function use_data_of_greedy_iteration(): {
    onreceivedata: (data: DataOfFinishGreedyIteration) => void;
    clearData: () => void;
    dataraw: DataOfFinishGreedyIteration[];
    tablebody: ComputedRef<
        [
            number,
            number,
            number,
            // boolean,
            number
            // number,
            // number,
            // number,
            // number
            // number
        ][]
    >;
    tableheads: string[];
} {
    const tableheads = [
        "序号",
        // "信息熵",
        // "随机选择概率",
        // "是否信息素扩散",
        // "信息素扩散概率",

        "耗时秒",
        "贪心最优长度",
        // "与最优的相对偏差",
        "全局最优长度",
        // "局部优化长度",
    ];
    const onreceivedata = function onreceivedataofoneIteration(
        data: DataOfFinishGreedyIteration
    ) {
        // console.log("onreceivedataofoneIteration");
        dataraw.push(data);
        // console.log(dataofoneiteration);
        // console.log(tablebody);
    };
    const clearData = function clearData(): void {
        dataraw.length = 0;
    };
    const dataraw = reactive<DataOfFinishGreedyIteration[]>([]);
    const tablebody = computed<
        [
            number,
            number,
            number,
            // boolean,
            number
            // number,
            // number,
            // number,
            // number
            // number
        ][]
    >(() => {
        return dataraw.map((data, index) => {
            return [
                index + 1,
                // data.population_relative_information_entropy,
                // data.randomselectionprobability,

                data.time_ms_of_one_iteration / 1000,
                data.optimallengthofthis_iteration,
                // data.relative_deviation_from_optimal,
                //找到这一轮的迭代的数据
                data.globalbestlength,
                // data.locally_optimized_length,
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
