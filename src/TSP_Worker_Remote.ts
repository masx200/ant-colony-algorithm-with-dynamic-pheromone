import * as comlink from "comlink";
// import { DataOfBestChange } from "../functions/DataOfBestChange";
// import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
// import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { TSP_Worker_API } from "./TSP_Worker_API";

export type TSP_Worker_Remote = { worker: Worker; terminate: () => void } & {
    remote: comlink.RemoteObject<TSP_Worker_API> &
        comlink.ProxyMethods & {
            // on_finish_one_route: (
            //     callback: (data: DataOfFinishOneRoute) => void
            // ) => Promise<void>;
            // on_finish_one_iteration: (
            //     callback: (data: DataOfFinishOneIteration) => void
            // ) => Promise<void>;
            // on_best_change: (
            //     callback: (data: DataOfBestChange) => void
            // ) => Promise<void>;
        };
};
