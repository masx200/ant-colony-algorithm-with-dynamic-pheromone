import { computed, ComputedRef, Ref, ref } from "vue";
import { DataOfBestChange } from "../functions/DataOfBestChange";
import { DataOfSummarize } from "./DataOfSummarize";

export function use_data_of_summary(): {
    dataofresult: Ref<DataOfBestChange | undefined>;
    onreceiveDataOfGlobalBest: (data: DataOfSummarize) => void;
    clearDataOfResult: () => void;
    resultTableHeads: string[];
    resultTableBody: ComputedRef<
        [number, number, number, number, number, string][]
    >;
} {
    const onreceiveDataOfGlobalBest = function onreceiveDataOfGlobalBest(
        data: DataOfSummarize
    ) {
        console.log("onreceiveDataOfGlobalBest");
        dataofresult.value = data;
        //current_search_count:相同的可能有两条,有一条是路径构建完成,另一条是一轮迭代完成,
        // dataOfAllResults.push(Object.assign({}, data));
        //current_search_count从1开始
        //取迭代次数多的那个
        //初始可能为空
        console.log(dataofresult);
        console.log(resultTableBody);
    };

    const clearDataOfResult = function clearDataOfResult() {
        dataofresult.value = undefined;
    };
    const resultTableHeads = [
        "全局最优长度",
        "找到最优解的耗时秒",
        "总共耗时秒",
        "总路径数量",
        "总迭代次数",
        "全局最优路径",
    ];
    const resultTableBody: ComputedRef<
        [number, number, number, number, number, string][]
    > = computed(() => {
        const result = dataofresult.value;
        return result
            ? [
                  [
                      result.globalbestlength,
                      result.time_of_best_ms / 1000,
                      result.total_time_ms / 1000,
                      result.current_search_count,
                      result.current_iterations,
                      JSON.stringify(result.globalbestroute),
                  ],
              ]
            : [];
    });

    const dataofresult = ref<DataOfSummarize>();
    return {
        dataofresult,
        onreceiveDataOfGlobalBest,
        clearDataOfResult,
        resultTableHeads,
        resultTableBody,
    };
}