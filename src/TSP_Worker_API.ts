import { TSP_Runner } from "../functions/TSP_Runner";
// import { DataOfBestChange } from "../functions/DataOfBestChange";
// import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
// import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { TSPRunnerOptions } from "./TSPRunnerOptions";

export type TSP_Worker_API = TSP_Runner & {
    // on_best_change: (callback: (data: DataOfBestChange) => void) => void;
    // on_finish_one_iteration: (
    //     callback: (data: DataOfFinishOneIteration) => void
    // ) => void;
    // on_finish_one_route: (
    //     callback: (data: DataOfFinishOneRoute) => void
    // ) => void;
    init_runner: (options: TSPRunnerOptions) => void;
};
