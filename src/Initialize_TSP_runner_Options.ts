import { NodeCoordinates } from "../functions/NodeCoordinates";
import { TSPRunnerOptions } from "./TSPRunnerOptions";

export type Initialize_TSP_runner_Options = TSPRunnerOptions & {
 
    node_coordinates: NodeCoordinates;
    count_of_ants: number;
    onglobal_best_routeChange: (
        global_best_route: number[],
        node_coordinates: NodeCoordinates
    ) => void;
    onLatestRouteChange: (
        latestroute: number[],
        node_coordinates: NodeCoordinates
    ) => void;
};
