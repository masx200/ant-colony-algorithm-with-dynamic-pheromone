import { NodeCoordinates } from "../functions/NodeCoordinates";
import { TSPRunnerOptions } from "./TSPRunnerOptions";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export type Fun_TSP_Before_Start = ({
    // onglobal_best_routeChange,
    // onLatestRouteChange,
    node_coordinates,
    count_of_ants,
}: TSPRunnerOptions & {
    // onglobal_best_routeChange: (
    //     global_best_route: number[],
    //     node_coordinates: NodeCoordinates
    // ) => void;
    // onLatestRouteChange: (
    //     latestroute: number[],
    //     node_coordinates: NodeCoordinates
    // ) => void;
    count_of_ants: number;
    node_coordinates: NodeCoordinates;
}) => Promise<TSP_Worker_Remote>;
