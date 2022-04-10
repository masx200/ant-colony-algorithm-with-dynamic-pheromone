import { Fun_initialize_TSP_runner } from "./Fun_initialize_TSP_runner";
import { Fun_TSP_Before_Start } from "./Fun_TSP_Before_Start";

export function use_tsp_before_start(
    initializeTSP_runner: Fun_initialize_TSP_runner
): Fun_TSP_Before_Start {
    const TSP_before_Start: Fun_TSP_Before_Start =
        async function TSP_before_Start({
            // onFinishIteration,
            onglobal_best_routeChange,
            onLatestRouteChange,
            // iterations_of_search,
            node_coordinates,
            count_of_ants,
            // pheromone_volatility_coefficient_R1,
            ...rest
        }) {
            const runner =
                // console.log("TSP_before_Start", node_coordinates);
                /*  TSP_RunnerRef.value || */ await initializeTSP_runner({
                    // onFinishIteration,
                    // pheromone_volatility_coefficient_R1,
                    onglobal_best_routeChange,
                    onLatestRouteChange,
                    node_coordinates,
                    count_of_ants,
                    ...rest,
                });
            // TSP_RunnerRef.value?.runIterations(iterations_of_search);
            // const runner = TSP_RunnerRef.value;
            return runner;
        };
    return TSP_before_Start;
}
