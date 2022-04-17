import { worker_error_listener } from "../functions/worker_error_listener";
import { createThreadPool } from "./createThreadPool";
import { create_Worker_comlink } from "./create_Worker_comlink";
import { GreedyWorkerAPI } from "./GreedyWorkerAPI";
import Greedy_algorithm_to_solve_tsp_with_selected_start_Worker from "./Greedy_algorithm_to_solve_tsp_with_selected_start.worker?worker&inline";

export const Greedy_algorithm_to_solve_tsp_with_selected_start_pool =
    createThreadPool({
        terminate(w) {
            w.terminate();
        },
        maxThreads: navigator.hardwareConcurrency,
        minThreads: 1,
        create: () => {
            return create_Worker_comlink<GreedyWorkerAPI>(() => {
                const w =
                    new Greedy_algorithm_to_solve_tsp_with_selected_start_Worker();

                return w;
            }, worker_error_listener);
        },
    });
