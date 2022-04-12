import { create_get_neighbors_from_optimal_routes_and_latest_routes } from "./create_get_neighbors_from_optimal_routes_and_latest_routes";

import uniq from "lodash/uniq";
import EventEmitterTargetClass from "@masx200/event-emitter-target";
import { DefaultOptions } from "../src/default_Options";
import {
    default_alpha,
    default_beta,
    default_count_of_ants,
    default_max_results_of_2_opt,
    default_max_results_of_k_opt,
} from "../src/default_Options";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { assert_number } from "../test/assert_number";
import { assert_true } from "../test/assert_true";

import { createEventPair } from "./createEventPair";

import { DataOfBestChange } from "./DataOfBestChange";

import { DataOfFinishOneIteration } from "./DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { EachIterationHandler } from "./EachIterationHandler";

import { EachRouteGenerator } from "./EachRouteGenerator";
import { generateUniqueArrayOfCircularPath } from "./generateUniqueArrayOfCircularPath";
import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";
import { update_weight_of_opt } from "./update_weight_of_opt";

import { ReadOnlyPheromone, TSP_Runner } from "./TSP_Runner";
import { SharedOptions } from "./SharedOptions";

import { create_collection_of_latest_routes } from "../collections/collection-of-latest-routes";
import { create_collection_of_optimal_routes } from "../collections/collection-of-optimal-routes";
import { GreedyRoutesGenerator } from "./GreedyRoutesGenerator";
import { DataOfFinishGreedyIteration } from "./DataOfFinishGreedyIteration";
import { set_distance_round } from "../src/set_distance_round";
import { assignOwnKeys } from "../collections/assignOwnKeys";
import { create_latest_and_optimal_routes } from "./create_latest_and_optimal_routes";
import { calc_pheromone } from "./calc_pheromone";
import { update_convergence_coefficient } from "./update_convergence_coefficient";
import { update_last_random_selection_probability } from "./update_last_random_selection_probability";
// import { reactive } from "@vue/reactivity";
export function createTSPrunner(input: TSPRunnerOptions): TSP_Runner {
    const emitter = EventEmitterTargetClass({ sync: true });
    const {
        on: on_finish_greedy_iteration,
        emit: emit_finish_greedy_iteration,
    } = createEventPair<DataOfFinishGreedyIteration>(emitter);

    const {
        max_results_of_2_opt = default_max_results_of_2_opt,

        max_results_of_k_opt = default_max_results_of_k_opt,

        node_coordinates,
        alpha_zero = default_alpha,
        beta_zero = default_beta,
        count_of_ants = default_count_of_ants,
    } = input;

    const options: Required<TSPRunnerOptions> = Object.fromEntries(
        uniq([...Object.keys(DefaultOptions), ...Object.keys(input)]).map(
            (k) => [k, Reflect.get(input, k) ?? Reflect.get(DefaultOptions, k)]
        )
    ) as Required<TSPRunnerOptions>;

    assert_number(count_of_ants);
    assert_true(count_of_ants >= 2);
    let convergence_coefficient = 0;
    function get_convergence_coefficient() {
        return convergence_coefficient;
    }
    const {
        distance_round,
        max_routes_of_greedy,

        max_size_of_collection_of_latest_routes,
        max_size_of_collection_of_optimal_routes,
    } = options;
    set_distance_round(distance_round);
    const count_of_nodes = node_coordinates.length;

    const collection_of_latest_routes = create_collection_of_latest_routes(
        max_size_of_collection_of_latest_routes
    );

    const collection_of_optimal_routes = create_collection_of_optimal_routes(
        max_size_of_collection_of_optimal_routes
    );

    let lastrandomselectionprobability = 0;
    let totaltimems = 0;

    const pheromoneStore: ReadOnlyPheromone = {
        row: count_of_nodes,
        get: getPheromone,
        column: count_of_nodes,
    };
    const PheromoneZero = 1;
    const latest_and_optimal_routes = create_latest_and_optimal_routes(
        collection_of_latest_routes,
        collection_of_optimal_routes
    );
    // let length_of_routes = latest_and_optimal_routes.length;
    function update_latest_and_optimal_routes() {
        assignOwnKeys(
            latest_and_optimal_routes,
            create_latest_and_optimal_routes(
                collection_of_latest_routes,
                collection_of_optimal_routes
            )
        );
        // length_of_routes = latest_and_optimal_routes.length;
    }
    function getPheromone(row: number, column: number): number {
        if (
            row < 0 ||
            row > count_of_nodes - 1 ||
            column < 0 ||
            column > count_of_nodes - 1
        ) {
            throw Error("row,column,out of bounds:" + row + "," + column);
        } else {
            // const latest_and_optimal_routes = uniqWith(
            //     [
            //         ...collection_of_latest_routes,
            //         ...collection_of_optimal_routes,
            //     ],
            //     (a, b) => a.length === b.length
            // );
            return calc_pheromone({
                latest_and_optimal_routes,
                PheromoneZero,
                row,
                column,
                greedy_length,
                convergence_coefficient,
            });
        }
    }

    let current_search_count = 0;
    let global_best_route: number[] = [];

    let time_of_best_ms = 0;
    let search_count_of_best = 0;
    let globalbestlength: number = Infinity;
    let greedy_length: number = Infinity;

    const get_total_time_ms = () => {
        return totaltimems;
    };

    const get_current_search_count = () => {
        return current_search_count;
    };
    const set_best_length = (bestlength: number) => {
        if (greedy_length === Infinity) {
            greedy_length = bestlength;
        }
        if (bestlength < globalbestlength) {
            globalbestlength = bestlength;
            time_of_best_ms = totaltimems;
            search_count_of_best = current_search_count + 1;
        }
    };
    const set_best_route = (route: number[]) => {
        global_best_route = generateUniqueArrayOfCircularPath(route);
    };

    const get_best_route = () => {
        return global_best_route;
    };

    const get_best_length = () => {
        return globalbestlength;
    };

    const get_number_of_iterations = () => {
        if (current_search_count < max_routes_of_greedy) {
            return current_search_count / max_routes_of_greedy;
        }
        return (
            (current_search_count - max_routes_of_greedy) / count_of_ants + 1
        );
    };

    const { on: on_best_change, emit: emit_best_change } =
        createEventPair<DataOfBestChange>(emitter);
    const { on: on_finish_one_route, emit: inner_emit_finish_one_route } =
        createEventPair<DataOfFinishOneRoute>(emitter);
    const emit_finish_one_route = (data: PureDataOfFinishOneRoute) => {
        totaltimems += data.time_ms_of_one_route;
        current_search_count++;
        emit_best_change({
            search_count_of_best,
            current_search_count,
            current_iterations: get_number_of_iterations(),
            total_time_ms: totaltimems,
            time_of_best_ms,
            global_best_route,
            globalbestlength: globalbestlength,
        });
        inner_emit_finish_one_route({
            ...data,
            current_search_count,

            total_time_ms: totaltimems,
            globalbestlength,
        });
    };
    const {
        on: on_finish_one_iteration,
        emit: inner_emit_finish_one_iteration,
    } = createEventPair<DataOfFinishOneIteration>(emitter);

    const emit_finish_one_iteration = (
        data: Omit<
            DataOfFinishOneIteration,
            "current_iterations" | "globalbestlength"
        >
    ) => {
        inner_emit_finish_one_iteration({
            ...data,
            globalbestlength: globalbestlength,
            current_iterations: get_number_of_iterations(),
            convergence_coefficient,
        });
    };
    on_finish_one_iteration(() => {
        update_latest_and_optimal_routes();
    });
    on_finish_greedy_iteration(() => {
        update_latest_and_optimal_routes();
    });
    const runOneIteration = async () => {
        if (current_search_count === 0) {
            await GreedyRoutesGenerator({
                shared,
                get_best_route,
                get_best_length,
                set_best_length,
                set_best_route,
                onRouteCreated,
                emit_finish_one_route,
                get_probability_of_opt_best,
                get_probability_of_opt_current,

                count_of_nodes,
                emit_finish_greedy_iteration,
            });
        } else {
            let time_ms_of_one_iteration: number = 0;
            const routes_and_lengths_of_one_iteration: {
                route: number[];
                length: number;
            }[] = [];

            for (let i = 0; i < count_of_ants; i++) {
                const starttime_of_one_route = Number(new Date());
                const { route, length } = EachRouteGenerator({
                    ...shared,
                    current_search_count,
                    get_probability_of_opt_best,
                    count_of_nodes,
                    node_coordinates,
                    pheromoneStore,
                    alpha_zero,
                    beta_zero,
                    lastrandomselectionprobability,
                    max_results_of_k_opt,
                    get_best_length,
                    get_best_route,

                    set_best_length,
                    set_best_route,
                });
                const endtime_of_one_route = Number(new Date());
                onRouteCreated(route, length);
                routes_and_lengths_of_one_iteration.push({
                    route,
                    length,
                });
                const time_ms_of_one_route =
                    endtime_of_one_route - starttime_of_one_route;
                time_ms_of_one_iteration += time_ms_of_one_route;
                emit_finish_one_route({
                    probability_of_opt_best: get_probability_of_opt_best(),
                    probability_of_opt_current:
                        get_probability_of_opt_current(),
                    time_ms_of_one_route: time_ms_of_one_route,
                    route,
                    length,
                });
                if (
                    routes_and_lengths_of_one_iteration.length === count_of_ants
                ) {
                    const starttime_of_process_iteration = Number(new Date());
                    const {
                        coefficient_of_diversity_increase,
                        // nextrandomselectionprobability,
                        population_relative_information_entropy,

                        optimallengthofthis_iteration,
                        optimalrouteofthis_iteration,
                    } = EachIterationHandler({
                        ...shared,

                        routesandlengths: routes_and_lengths_of_one_iteration,
                        get_best_length: get_best_length,
                        get_best_route: get_best_route,
                        pheromoneStore,
                        node_coordinates,
                    });
                    update_weight_of_opt({
                        get_weight_of_opt_best,
                        get_weight_of_opt_current,
                        set_weight_of_opt_best,
                        coefficient_of_diversity_increase,
                        set_weight_of_opt_current,
                    });
                    const endtime_of_process_iteration = Number(new Date());
                    const timems_of_process_iteration =
                        endtime_of_process_iteration -
                        starttime_of_process_iteration;
                    time_ms_of_one_iteration += timems_of_process_iteration;
                    totaltimems += timems_of_process_iteration;

                    convergence_coefficient = update_convergence_coefficient({
                        coefficient_of_diversity_increase,
                        convergence_coefficient,
                    });
                    emit_finish_one_iteration({
                        optimallengthofthis_iteration,
                        optimalrouteofthis_iteration,
                        population_relative_information_entropy,

                        randomselectionprobability:
                            lastrandomselectionprobability,
                        time_ms_of_one_iteration: time_ms_of_one_iteration,
                        convergence_coefficient,
                    });
                    time_ms_of_one_iteration = 0;
                    lastrandomselectionprobability =
                        update_last_random_selection_probability({
                            coefficient_of_diversity_increase,
                            lastrandomselectionprobability,
                        });
                    routes_and_lengths_of_one_iteration.length = 0;
                }
            }
        }
    };
    const runIterations = async (iterations: number) => {
        assert_number(iterations);
        assert_true(iterations > 0);

        for (let i = 0; i < iterations; i++) {
            await runOneIteration();
        }
    };
    let weight_of_opt_best = 1;
    let weight_of_opt_current = 1;

    function get_probability_of_opt_best(): number {
        return (
            weight_of_opt_best / (weight_of_opt_best + weight_of_opt_current)
        );
    }
    function get_probability_of_opt_current(): number {
        return (
            weight_of_opt_current / (weight_of_opt_best + weight_of_opt_current)
        );
    }
    function get_weight_of_opt_best() {
        return weight_of_opt_best;
    }
    function set_weight_of_opt_best(value: number) {
        weight_of_opt_best = value;
    }
    function get_weight_of_opt_current() {
        return weight_of_opt_current;
    }
    function set_weight_of_opt_current(value: number) {
        weight_of_opt_current = value;
    }
    function onRouteCreated(route: number[], length: number) {
        if (collection_of_optimal_routes) {
            collection_of_optimal_routes.add(route, length);
        }
        if (collection_of_latest_routes) {
            collection_of_latest_routes.add(route, length);
        }
    }

    function get_search_count_of_best() {
        return search_count_of_best;
    }
    function get_time_of_best() {
        return time_of_best_ms;
    }
    function get_random_selection_probability() {
        return lastrandomselectionprobability;
    }
    const get_neighbors_from_optimal_routes_and_latest_routes =
        create_get_neighbors_from_optimal_routes_and_latest_routes(
            latest_and_optimal_routes
        );
    const shared = getShared();
    const result: TSP_Runner = {
        ...shared,
        max_results_of_2_opt,
        on_finish_greedy_iteration,
        max_results_of_k_opt,

        get_search_count_of_best,
        get_time_of_best,
        get_random_selection_probability,
        count_of_nodes,
        on_best_change,
        get_total_time_ms,
        runIterations,
        on_finish_one_iteration: on_finish_one_iteration,
        on_finish_one_route: on_finish_one_route,
        get_number_of_iterations,
        get_best_length,
        get_best_route,
        get_current_search_count,
        beta_zero,
        node_coordinates,
        alpha_zero,
        count_of_ants,
        [Symbol.toStringTag]: "TSPRunner",
        runOneIteration,
    };
    function getShared(): SharedOptions {
        return {
            ...options,
            get_convergence_coefficient,
            get_neighbors_from_optimal_routes_and_latest_routes,
            get_random_selection_probability,
            get_search_count_of_best,

            set_weight_of_opt_current,
            get_weight_of_opt_current,
            set_weight_of_opt_best,
            get_weight_of_opt_best,
            get_probability_of_opt_current,
            get_probability_of_opt_best,
            get_best_route,
            get_best_length,
            set_best_route,
            set_best_length,
            get_current_search_count,
            pheromoneStore,
            count_of_nodes,
        };
    }
    return result;
}
