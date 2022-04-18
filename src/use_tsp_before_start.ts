import { Fun_initialize_TSP_runner } from "./Fun_initialize_TSP_runner";
import { Fun_TSP_Before_Start } from "./Fun_TSP_Before_Start";

export function use_tsp_before_start(
    initializeTSP_runner: Fun_initialize_TSP_runner
): Fun_TSP_Before_Start {
    const TSP_before_Start: Fun_TSP_Before_Start =
        async function TSP_before_Start({
            // onglobal_best_routeChange,
            // onLatestRouteChange,
            node_coordinates,
            count_of_ants,
            ...rest
        }) {
            const runner = await initializeTSP_runner({
                // onglobal_best_routeChange,
                // onLatestRouteChange,
                node_coordinates,
                count_of_ants,
                ...rest,
            });
            return runner;
        };
    return TSP_before_Start;
}
