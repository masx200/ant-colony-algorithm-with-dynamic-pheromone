import { computed, ComputedRef, /* Ref, */ ref } from "vue";
import { DataOfBestChange } from "../functions/DataOfBestChange";
import { DataOfTotal } from "../functions/DataOfTotal";

export function use_data_of_summary() {
    const on_receive_Data_Of_Global_Best =
        function on_receive_Data_Of_Global_Best(data: DataOfBestChange) {
            data_of_best.value = data;
        };

    const clear_data_of_best = function clear_data_of_best() {
        data_of_best.value = undefined;
    };
    const summary_best_TableHeads = [
        "全局最优长度",
        "最优解的耗时秒",
        "最优解路径序号",
        // "总共耗时秒",
        // "总计路径数量",
        // "总计迭代次数",
    ];
    const summary_total_TableHeads = [
        // "全局最优长度",
        // "最优解的耗时秒",
        // "最优解路径序号",
        "总共耗时秒",
        "总计路径数量",
        "总计迭代次数",
    ];
    const global_best_routeHeads = ["全局最优路径"];
    const global_best_routeBody: ComputedRef<[string][]> = computed(() => {
        const result = data_of_best.value;
        return result ? [[JSON.stringify(result.global_best_route)]] : [];
    });
    const summary_best_TableBody: ComputedRef<
        [number, number, number /* , number, number, number */][]
    > = computed(() => {
        const result = data_of_best.value;
        return result
            ? [
                  [
                      result.global_best_length,
                      result.time_of_best_ms / 1000,
                      result.search_count_of_best,
                      //   result.total_time_ms / 1000,

                      //   result.current_search_count,
                      //   result.current_iterations,
                  ],
              ]
            : [];
    });
    const summary_total_TableBody: ComputedRef<
        [number, number, number /* , number, number, number */][]
    > = computed(() => {
        const result = data_of_total.value;
        return result
            ? [
                  [
                      //   result.global_best_length,
                      //   result.time_of_best_ms / 1000,
                      //   result.search_count_of_best,
                      result.total_time_ms / 1000,

                      result.current_search_count,
                      result.current_iterations,
                  ],
              ]
            : [];
    });
    const data_of_best = ref<DataOfBestChange>();
    const data_of_total = ref<DataOfTotal>();
    const on_receive_Data_Of_total = function (data: DataOfTotal) {
        data_of_total.value = data;
    };

    return {
        on_receive_Data_Of_total,
        data_of_total,
        summary_best_TableHeads,
        summary_total_TableHeads,
        summary_best_TableBody,
        summary_total_TableBody,
        global_best_routeHeads,
        global_best_routeBody,
        data_of_best: data_of_best,
        on_receive_Data_Of_Global_Best,
        clear_data_of_best,
        // summary_best_TableHeads,
        // summary_best_TableBody,
    };
}
