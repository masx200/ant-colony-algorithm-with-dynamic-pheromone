import { expose } from "comlink";
import { Greedy_solve_tsp_with_selected_start_length_time_ms } from "../functions/Greedy-solve-tsp-with-selected-start-length-time-ms";
import { Greedy_algorithm_to_solve_tsp_with_selected_start } from "../functions/Greedy_algorithm_to_solve_tsp_with_selected_start";
import { GreedyWorkerAPI } from "./GreedyWorkerAPI";
const API: GreedyWorkerAPI = {
    Greedy_algorithm_to_solve_tsp_with_selected_start:
        Greedy_algorithm_to_solve_tsp_with_selected_start,
    Greedy_solve_tsp_with_selected_start_length_time_ms,
};
expose(API);
