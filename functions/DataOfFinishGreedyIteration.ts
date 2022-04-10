export interface DataOfFinishGreedyIteration {
    /* "找到最优解的耗时秒" */
    // time_of_best_ms: number;
    // global_best_route: number[];
    // relative_deviation_from_optimal: number;
    current_iterations: number;

    optimallengthofthis_iteration: number;
    optimalrouteofthis_iteration: number[];
    time_ms_of_one_iteration: number;
    globalbestlength: number;
}
