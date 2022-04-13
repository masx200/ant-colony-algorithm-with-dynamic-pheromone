import { local_optimization_route_pool } from "./local_optimization_route_pool";
import { NodeCoordinates } from "./NodeCoordinates";

export async function local_optimization_route_thread({
    count_of_nodes,
    max_segments_of_cross_point,
    distance_round,
    oldRoute,
    max_results_of_k_opt,
    node_coordinates,
    oldLength,
    max_results_of_k_exchange,
    max_results_of_2_opt,
}: {
    count_of_nodes: number;
    max_segments_of_cross_point: number;
    distance_round: boolean;
    oldRoute: number[];
    max_results_of_k_opt: number;
    node_coordinates: NodeCoordinates;
    oldLength: number;
    max_results_of_k_exchange: number;
    max_results_of_2_opt: number;
}): Promise<{ route: number[]; length: number; time_ms: number }> {
    return local_optimization_route_pool.run((w) => {
        return w.remote.local_optimization_route({
            count_of_nodes,
            max_segments_of_cross_point,
            distance_round,
            oldRoute,
            max_results_of_k_opt,
            node_coordinates,
            oldLength,
            max_results_of_k_exchange,
            max_results_of_2_opt,
        });
    });
}
