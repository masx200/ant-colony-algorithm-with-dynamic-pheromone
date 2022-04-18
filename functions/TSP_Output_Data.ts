import { DataOfBestChange } from "./DataOfBestChange";
import { DataOfFinishGreedyIteration } from "./DataOfFinishGreedyIteration";
import { DataOfFinishOneIteration } from "./DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { DataOfTotal } from "./DataOfTotal";
// import { Data_Of_best } from "./Data_Of_best";

export type TSP_Output_Data = DataOfTotal &
    DataOfBestChange & {
        // best_route: number[];
        latest_route: number[];
        data_of_greedy: DataOfFinishGreedyIteration[];
        data_of_iterations: DataOfFinishOneIteration[];
        data_of_routes: DataOfFinishOneRoute[];
        // data_of_best: Data_Of_best[];
    };
