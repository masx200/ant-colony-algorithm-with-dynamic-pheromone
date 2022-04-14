import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";
import { SharedOptions } from "./SharedOptions";
import { greedy_first_search_routes_parallel } from "./greedy_first_search_routes_parallel";
import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "../src/Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
import { get_best_route_Of_Series_routes_and_lengths } from "./get_best_route_Of_Series_routes_and_lengths";
import { DataOfFinishGreedyIteration } from "./DataOfFinishGreedyIteration";
import { sum } from "lodash-es";
import { get_distance_round } from "../src/set_distance_round";
import { assert_true } from "../test/assert_true";

export async function GreedyRoutesGenerator({
    shared,
    emit_finish_greedy_iteration,
    get_best_route,
    get_best_length,
    set_best_length,
    set_best_route,
    onRouteCreated,
    emit_finish_one_route,
}: {
    shared: SharedOptions;
    emit_finish_greedy_iteration: (data: DataOfFinishGreedyIteration) => void;
    get_best_route: () => number[];
    get_best_length: () => number;
    set_best_length: (best_length: number) => void;
    set_best_route: (route: number[]) => void;
    onRouteCreated: (route: number[], length: number) => void;
    emit_finish_one_route: (data: PureDataOfFinishOneRoute) => void;

    count_of_nodes: number;
}): Promise<{ best_length: number; best_route: number[] }> {
    const { count_of_nodes } = shared;
    const greedy_results_iter = greedy_first_search_routes_parallel({
        ...shared,
        round: get_distance_round(),
    });
    const parallel_results: {
        length: number;
        route: number[];
        time_ms: number;
    }[] = [];

    for await (const { route, length, time_ms } of greedy_results_iter) {
        parallel_results.push({
            route,
            length,
            time_ms,
        });

        const oldLength = length;
        const oldRoute = route;
        // if (get_best_route().length === 0) {
        if (oldLength < get_best_length()) {
            set_best_length(oldLength);
            set_best_route(oldRoute);
        }
        // }
        // if (oldLength < get_best_length()) {
        //     set_best_length(oldLength);
        //     set_best_route(oldRoute);
        // }
        onRouteCreated(route, length);

        emit_finish_one_route({
            time_ms_of_one_route: time_ms,
            route,
            length,
        });
    }

    const { length: best_length, route: optimal_route_of_iteration } =
        get_best_route_Of_Series_routes_and_lengths(parallel_results);
    const best_route = optimal_route_of_iteration;
    Greedy_algorithm_to_solve_tsp_with_selected_start_pool.destroy();
    const time_ms_of_one_iteration = sum(
        parallel_results.map((r) => r.time_ms)
    );
    const average_length_of_iteration =
        sum(parallel_results.map((a) => a.length)) / parallel_results.length;
    const worst_length_of_iteration = Math.max(
        ...parallel_results.map((a) => a.length)
    );
    emit_finish_greedy_iteration({
        worst_length_of_iteration,
        average_length_of_iteration,
        current_iterations: 1,
        optimal_length_of_iteration: best_length,
        optimal_route_of_iteration,
        time_ms_of_one_iteration,
        global_best_length: get_best_length(),
    });
    assert_true(get_best_length() < Infinity);
    assert_true(get_best_route().length === count_of_nodes);
    return { best_length, best_route };
}
