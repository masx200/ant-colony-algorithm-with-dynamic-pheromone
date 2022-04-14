import { NodeCoordinates } from "./NodeCoordinates";

export interface LocalOptimizationRouteOptions {
    count_of_nodes: number;
    max_segments_of_cross_point: number;
    distance_round: boolean;
    route: number[];
    max_results_of_k_opt: number;
    node_coordinates: NodeCoordinates;
    length: number;
    max_results_of_k_exchange: number;
    max_results_of_2_opt: number;
}
