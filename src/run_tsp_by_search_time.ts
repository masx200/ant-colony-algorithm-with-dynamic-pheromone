import { Ref } from "vue";
import { assert_number } from "../test/assert_number";
import { tsp_runner_run_async } from "./tsp_runner_run_async";

export async function run_tsp_by_search_time({
    runner,
    is_running,
    search_time_seconds,

    // TSP_before_Start,
    // onglobal_best_routeChange,
    // onLatestRouteChange,
    // finish_one_route_listener,
    // finish_one_iteration_listener,
    onprogress,
}: {
    runner: Parameters<typeof tsp_runner_run_async>[0]["runner"];

    search_time_seconds: Ref<number>;

    is_running: Ref<boolean>;
    // TSP_before_Start: Fun_TSP_Before_Start;
    // onglobal_best_routeChange: (
    //     route: number[],
    //     node_coordinates: NodeCoordinates
    // ) => void;
    // onLatestRouteChange: (
    //     route: number[],
    //     node_coordinates: NodeCoordinates
    // ) => void;
    // finish_one_route_listener: () => void;
    // finish_one_iteration_listener: () => void;
    onprogress: (p: number) => void;
}): Promise<void> {
    // return async () => {

    const search_time_ms = search_time_seconds.value * 1000;

    if (
        // pheromone_volatility_coefficient_R1 > 0 &&
        search_time_ms > 0 /* &&
        // count_of_ants_value >= 2 &&
        node_coordinates */
    ) {
        // disablemapswitching.value = true;
        // const count_of_ants = count_of_ants_value;
        // console.log(node_coordinates);
        // assertnumber(count_of_ants);
        assert_number(search_time_ms);
        // assertnumber(pheromone_volatility_coefficient_R1);
        is_running.value = true;
        // const onFinishIteration = () => {
        //
        // };
        // const runner = await TSP_before_Start({

        //     // onFinishIteration,
        //     pheromone_volatility_coefficient_R1,
        //     onglobal_best_routeChange,
        //     node_coordinates: await node_coordinates(),
        //     count_of_ants,
        //     // iterations_of_search,
        //     onLatestRouteChange,
        // });
        // // console.log("runner", runner);
        // await runner.on_finish_one_route(finish_one_route_listener);
        // await runner.on_finish_one_iteration(finish_one_iteration_listener);

        await tsp_runner_run_async({
            time_of_search_ms: search_time_ms,
            runner,

            // count_of_ants,
            onprogress,
        });
        is_running.value = false;
    }
    // };
}
