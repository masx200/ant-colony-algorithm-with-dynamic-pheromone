import { NodeCoordinates } from "../functions/NodeCoordinates";
import { TSPRunnerOptions } from "./TSPRunnerOptions";

export type Initialize_TSP_runner_Options = TSPRunnerOptions & {
    coefficient_of_pheromone_Increase_Non_Optimal_Paths: number;
    // onFinishIteration: () => void;
    pheromone_volatility_coefficient_R1: number;
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
