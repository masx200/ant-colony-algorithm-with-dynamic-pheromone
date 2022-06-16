import { DataOfBestChange } from "./DataOfBestChange";
import { DataOfFinishGreedyIteration } from "./DataOfFinishGreedyIteration";
import { DataOfFinishOneIteration } from "./DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { DataOfTotal } from "./DataOfTotal";

export type TSP_Output_Data = DataOfTotal &
    DataOfBestChange & {
        data_of_greedy: DataOfFinishGreedyIteration[];
        delta_data_of_iterations: DataOfFinishOneIteration[];
        data_of_routes: DataOfFinishOneRoute[];
    };
