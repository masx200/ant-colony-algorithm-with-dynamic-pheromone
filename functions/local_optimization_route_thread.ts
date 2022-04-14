import { LocalOptimizationRouteOptions } from "./LocalOptimizationRouteOptions";
import { local_optimization_route_pool } from "./local_optimization_route_pool";
// import { NodeCoordinates } from "./NodeCoordinates";

export async function local_optimization_route_thread(
    options: LocalOptimizationRouteOptions
): Promise<{ route: number[]; length: number; time_ms: number }> {
    return local_optimization_route_pool.run((w) => {
        return w.remote.local_optimization_route(options);
    });
}
