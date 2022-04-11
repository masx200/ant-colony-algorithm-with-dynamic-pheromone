import { computed, ComputedRef, Ref, ref } from "vue";
import { DataOfBestChange } from "../functions/DataOfBestChange";
import { DataOfSummarize } from "./DataOfSummarize";

export function use_data_of_summary(): {
    dataofresult: Ref<DataOfBestChange | undefined>;
    onreceiveDataOfGlobalBest: (data: DataOfSummarize) => void;
    clearDataOfResult: () => void;
    resultTableHeads: string[];
    resultTableBody: ComputedRef<
        [number, number, number, number, number, number][]
    >;
    global_best_routeHeads: string[];
    global_best_routeBody: ComputedRef<[string][]>;
} {
    const onreceiveDataOfGlobalBest = function onreceiveDataOfGlobalBest(
        data: DataOfSummarize
    ) {
        dataofresult.value = data;
    };

    const clearDataOfResult = function clearDataOfResult() {
        dataofresult.value = undefined;
    };
    const resultTableHeads = [
        "全局最优长度",
        "最优解的耗时秒",
        "最优解路径序号",
        "总共耗时秒",
        "总计路径数量",
        "总计迭代次数",
    ];
    const global_best_routeHeads = ["全局最优路径"];
    const global_best_routeBody: ComputedRef<[string][]> = computed(() => {
        const result = dataofresult.value;
        return result ? [[JSON.stringify(result.global_best_route)]] : [];
    });
    const resultTableBody: ComputedRef<
        [number, number, number, number, number, number][]
    > = computed(() => {
        const result = dataofresult.value;
        return result
            ? [
                  [
                      result.globalbestlength,
                      result.time_of_best_ms / 1000,
                      result.search_count_of_best,
                      result.total_time_ms / 1000,

                      result.current_search_count,
                      result.current_iterations,
                  ],
              ]
            : [];
    });

    const dataofresult = ref<DataOfSummarize>();
    return {
        global_best_routeHeads,
        global_best_routeBody,
        dataofresult,
        onreceiveDataOfGlobalBest,
        clearDataOfResult,
        resultTableHeads,
        resultTableBody,
    };
}
