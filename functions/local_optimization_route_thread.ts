import { local_optimization_route_pool } from "./local_optimization_route_pool";
import { LocalOptimizationRoutesOptions } from "./LocalOptimizationRouteOptions";

export async function local_optimization_route_thread(
    options: LocalOptimizationRoutesOptions
): Promise<{ route: number[]; length: number; time_ms: number }> {
    return local_optimization_route_pool.run((w) => {
        return w.remote.local_optimization_routes(options);
    });
}
