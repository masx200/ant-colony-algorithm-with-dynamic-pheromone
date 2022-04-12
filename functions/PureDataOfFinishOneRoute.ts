import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";

export type PureDataOfFinishOneRoute = Omit<
    DataOfFinishOneRoute,
    | "current_search_count"
    | "total_time_ms"
    | "current_iterations"
    | "global_best_route"
    | "global_best_length"
>;
