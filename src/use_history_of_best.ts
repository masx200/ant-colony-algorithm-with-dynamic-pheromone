import {
    computed,
    ComputedRef,
    DeepReadonly,
    onMounted,
    reactive,
    Ref,
    watch,
} from "vue";
import { DataOfBestChange } from "../functions/DataOfBestChange";

export function use_history_of_best(
    data_of_best: DeepReadonly<Ref<DataOfBestChange | undefined>>
): {
    history_of_best: {
        time_of_best_ms: number;
        global_best_length: number;
        search_count_of_best: number;
    }[];
    clearData: () => void;
    TableHeads: string[];
    TableBody: ComputedRef<[number, number, number][]>;
} {
    const history_of_best = reactive<
        {
            time_of_best_ms: number;
            global_best_length: number;
            search_count_of_best: number;
        }[]
    >([]);
    onMounted(() => {
        watch(data_of_best, (value, old) => {
            const global_best_length = value?.global_best_length;
            const old_global_best_length = old?.global_best_length;
            if (!global_best_length) {
                return;
            }
            const { time_of_best_ms, search_count_of_best } = value;
            if (!old_global_best_length) {
                history_of_best.push({
                    time_of_best_ms,
                    global_best_length,
                    search_count_of_best,
                });
            }
            if (
                old_global_best_length &&
                old_global_best_length > global_best_length
            ) {
                history_of_best.push({
                    time_of_best_ms,
                    global_best_length,
                    search_count_of_best,
                });
            }
        });
    });

    const clearData = function clear_data_of_best() {
        history_of_best.length = 0;
    };
    const TableHeads = ["最优解路径序号", "全局最优长度", "最优解的耗时秒"];

    const TableBody: ComputedRef<[number, number, number][]> = computed(() => {
        const resultbest = history_of_best;
        return resultbest.length
            ? resultbest.map((result) => {
                  return [
                      result.search_count_of_best,
                      result.global_best_length,
                      result.time_of_best_ms / 1000,
                  ];
              })
            : [];
    });

    return {
        clearData,
        TableBody,
        TableHeads,
        history_of_best,
    };
}
