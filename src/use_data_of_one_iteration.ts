import { computed, ComputedRef, reactive } from "vue";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";

export function use_data_of_one_iteration(): {
    onreceivedataofoneIteration: (data: DataOfFinishOneIteration) => void;
    clearDataOfOneIteration: () => void;
    dataofoneiteration: DataOfFinishOneIteration[];
    oneiterationtablebody: ComputedRef<
        [
            number,
            number,
            number,
            // boolean,
            number,
            number,

            // number,
            number
            // number
        ][]
    >;
    oneiterationtableheads: string[];
} {
    const oneiterationtableheads = [
        "序号",
        "信息熵",
        "随机选择概率",
        // "是否信息素扩散",

        "耗时秒",
        "迭代最优长度",
        // "与最优的相对偏差",
        "全局最优长度",
        // "局部优化长度",
    ];
    const onreceivedataofoneIteration = function onreceivedataofoneIteration(
        data: DataOfFinishOneIteration
    ) {
        // console.log("onreceivedataofoneIteration");
        dataofoneiteration.push(data);
        // console.log(dataofoneiteration);
        // console.log(oneiterationtablebody);
    };
    const clearDataOfOneIteration = function clearDataOfOneIteration(): void {
        dataofoneiteration.length = 0;
    };
    const dataofoneiteration = reactive<DataOfFinishOneIteration[]>([]);
    const oneiterationtablebody = computed<
        [
            number,
            number,
            number,
            // boolean,
            number,
            number,
            number
            // number,

            // number
        ][]
    >(() => {
        return dataofoneiteration.map((data, index) => {
            return [
                index + 1,
                data.population_relative_information_entropy,
                data.randomselectionprobability,

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
        oneiterationtableheads,
        onreceivedataofoneIteration,
        clearDataOfOneIteration,
        dataofoneiteration,
        oneiterationtablebody,
    };
}
