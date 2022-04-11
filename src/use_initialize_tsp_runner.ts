import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { create_TSP_Worker_comlink } from "./create_TSP_Worker_comlink";
import { DataOfSummarize } from "./DataOfSummarize";
import { Fun_initialize_TSP_runner } from "./Fun_initialize_TSP_runner";

export function use_initialize_tsp_runner({
    onreceiveDataOfGlobalBest,
    onreceivedataofoneroute,
    onreceivedataofoneIteration,
}: {
    onreceiveDataOfGlobalBest: (data: DataOfSummarize) => void;
    onreceivedataofoneroute: (data: DataOfFinishOneRoute) => void;
    onreceivedataofoneIteration: (data: DataOfFinishOneIteration) => void;
}): Fun_initialize_TSP_runner {
    return async function initializeTSP_runner({
        node_coordinates,
        count_of_ants,
        onglobal_best_routeChange,
        onLatestRouteChange,
        ...rest
    }) {
        const runner = await create_TSP_Worker_comlink({
            node_coordinates,
            count_of_ants,
            ...rest,
        });
        await runner.remote.on_best_change((data) => {
            onreceiveDataOfGlobalBest(data);
            onglobal_best_routeChange(data.global_best_route, node_coordinates);
        });
        await runner.remote.on_finish_one_route((data) => {
            onreceivedataofoneroute(data);
            const { route } = data;
            onLatestRouteChange(route, node_coordinates);
        });
        await runner.remote.on_finish_one_iteration((data) => {
            onreceivedataofoneIteration(data);
        });
        return runner;
    };
}
