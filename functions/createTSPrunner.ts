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

// import { DataOfBestChange } from "./DataOfBestChange";

import { DataOfFinishOneIteration } from "./DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { EachIterationHandler } from "./EachIterationHandler";

import { EachRouteGenerator } from "./EachRouteGenerator";
import { generateUniqueArrayOfCircularPath } from "./generateUniqueArrayOfCircularPath";
import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";

import { TSP_Runner } from "./TSP_Runner";
// import { ReadOnlyPheromone } from "./ReadOnlyPheromone";
import { SharedOptions } from "./SharedOptions";

// import { create_collection_of_latest_routes } from "../collections/collection-of-latest-routes";
import { create_collection_of_optimal_routes } from "../collections/collection-of-optimal-routes";
import { GreedyRoutesGenerator } from "./GreedyRoutesGenerator";
import { DataOfFinishGreedyIteration } from "./DataOfFinishGreedyIteration";
import { set_distance_round } from "../src/set_distance_round";
import { assignOwnKeys } from "../collections/assignOwnKeys";
// import { create_global_optimal_routes } from "./create_global_optimal_routes";
import { calc_pheromone_dynamic } from "./calc_pheromone_dynamic";
import { update_convergence_coefficient } from "./update_convergence_coefficient";
import { update_last_random_selection_probability } from "./update_last_random_selection_probability";
import { create_pheromone_cache } from "./create_pheromone_cache";
import { sum } from "lodash-es";
// import { DataOfTotal } from "./DataOfTotal";
import { PheromoneCache } from "./PheromoneCache";
import { max_number_of_stagnation } from "./max_number_of_stagnation";
import { TSP_Output_Data } from "./TSP_Output_Data";
// import { Data_Of_best } from "./Data_Of_best";
// import { reactive } from "@vue/reactivity";

export function createTSPrunner(input: TSPRunnerOptions): TSP_Runner {
    let greedy_length: number = Infinity;
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
    // let latest_route: number[] = [];
    const data_of_routes: DataOfFinishOneRoute[] = [];
    const data_of_iterations: DataOfFinishOneIteration[] = [];
    const data_of_greedy: DataOfFinishGreedyIteration[] = [];
    // const { on: on_best_change, emit: emit_best_change } =
    //     createEventPair<DataOfBestChange>(emitter);

    // const { on: on_total_change, emit: emit_total_change } =
    //     createEventPair<DataOfTotal>(emitter);
    // on_best_change((data) => {
    //     Object.assign(output_data, data);
    // });
    // on_total_change((data) => {
    //     Object.assign(output_data, data);
    // });
    // const data_of_best: Data_Of_best[] = [];
    const output_data: TSP_Output_Data = {
        // data_of_best,
        data_of_greedy,
        data_of_iterations,
        data_of_routes,
        // get latest_route() {
        //     return latest_route;
        // },
        get search_count_of_best() {
            return search_count_of_best;
        },
        get time_of_best_ms() {
            return time_of_best_ms;
        },
        get global_best_route() {
            return global_best.route;
        },
        get global_best_length() {
            return global_best.length;
        },
        get total_time_ms() {
            return total_time_ms;
        },
        get current_search_count() {
            return current_search_count;
        },
        get current_iterations() {
            return get_number_of_iterations();
        },
    };
    const {
        on: on_finish_one_iteration,
        emit: inner_emit_finish_one_iteration,
    } = createEventPair<DataOfFinishOneIteration>(emitter);
    const { on: on_finish_one_route, emit: inner_emit_finish_one_route } =
        createEventPair<DataOfFinishOneRoute>(emitter);

    on_finish_one_route((data) => {
        data_of_routes.push(data);
    });
    on_finish_one_iteration((data) => {
        data_of_iterations.push(data);
    });
    on_finish_greedy_iteration((data) => {
        data_of_greedy.push(data);
    });
    function get_output_data() {
        return output_data;
    }
    let convergence_coefficient = 1;
    let number_of_stagnation = 0;
    function get_convergence_coefficient() {
        return convergence_coefficient;
    }
    const {
        distance_round,
        max_routes_of_greedy,

        // max_size_of_collection_of_latest_routes,
        max_size_of_collection_of_optimal_routes,
    } = options;
    set_distance_round(distance_round);
    const count_of_nodes = node_coordinates.length;

    // const collection_of_latest_routes = create_collection_of_latest_routes(
    //     max_size_of_collection_of_latest_routes
    // );

    const collection_of_optimal_routes = create_collection_of_optimal_routes(
        max_size_of_collection_of_optimal_routes
    );

    let lastrandom_selection_probability = 0;
    let total_time_ms = 0;
    let pheromone_exceeds_maximum_range = false;
    function clear_pheromone_cache() {
        pheromoneStore.clear();
        pheromone_exceeds_maximum_range = false;
    }
    const pheromoneStore: PheromoneCache = new Proxy(
        create_pheromone_cache(count_of_nodes),
        {
            get(target, key) {
                if (key === "get") {
                    const raw_get = Reflect.get(
                        target,
                        key
                    ) as PheromoneCache["get"];
                    function getPheromone(row: number, column: number): number {
                        if (
                            row < 0 ||
                            row > count_of_nodes - 1 ||
                            column < 0 ||
                            column > count_of_nodes - 1
                        ) {
                            throw Error(
                                "row,column,out of bounds:" + row + "," + column
                            );
                        } else {
                            const cached = raw_get(row, column);
                            if (0 === cached) {
                                const result = calc_pheromone_dynamic({
                                    latest_and_optimal_routes:
                                        global_optimal_routes,
                                    // PheromoneZero,
                                    row,
                                    column,
                                    greedy_length,
                                    convergence_coefficient,
                                });
                                // debugger;
                                // console.log(row, column, result);
                                if (result > Number.MAX_VALUE) {
                                    /* 信息素可能太大.如果有信息素超过浮点数最大范围,则在构建一条路径时,直接返回全局最优路径. */
                                    pheromone_exceeds_maximum_range = true;
                                }
                                target.set(row, column, result);
                                return result;
                            } else {
                                return cached;
                            }
                        }
                    }
                    return getPheromone;
                } else {
                    return Reflect.get(target, key);
                }
            },
        }
    );
    const global_optimal_routes = Array.from(collection_of_optimal_routes);

    function update_latest_and_optimal_routes() {
        assignOwnKeys(
            global_optimal_routes,
            Array.from(collection_of_optimal_routes)
        );
    }
    function set_global_best(route: number[], length: number) {
        if (greedy_length === Infinity) {
            greedy_length = length;
        }
        if (length < global_best.length) {
            const formatted_route = generateUniqueArrayOfCircularPath(route);
            number_of_stagnation = 0;
            global_best.length = length;
            global_best.route = formatted_route;
            time_of_best_ms = total_time_ms;
            search_count_of_best = current_search_count + 1;
            // emit_best_change({
            //     search_count_of_best: search_count_of_best,
            //     // current_search_count,
            //     // current_iterations: get_number_of_iterations(),
            //     // total_time_ms: total_time_ms,
            //     time_of_best_ms,
            //     global_best_route: formatted_route,
            //     global_best_length: length,
            // });
        }
    }
    const global_best: {
        length: number;
        route: number[];
    } = { length: Infinity, route: [] };
    const get_best_route = () => {
        return global_best.route;
    };

    const get_best_length = () => {
        return global_best.length;
    };
    let current_search_count = 0;
    // let global_best_route: number[] = [];

    let time_of_best_ms = 0;
    let search_count_of_best = 0;
    // let global_best_length: number = Infinity;

    const get_total_time_ms = () => {
        return total_time_ms;
    };

    const get_current_search_count = () => {
        return current_search_count;
    };
    // const set_best_length = (best_length: number) => {
    //     if (greedy_length === Infinity) {
    //         greedy_length = best_length;
    //     }
    //     if (best_length < global_best_length) {
    //         global_best_length = best_length;
    //         time_of_best_ms = total_time_ms;
    //         search_count_of_best = current_search_count + 1;
    //         emit_best_change({
    //             search_count_of_best: search_count_of_best + 1,
    //             current_search_count,
    //             current_iterations: get_number_of_iterations(),
    //             total_time_ms: total_time_ms,
    //             time_of_best_ms,
    //             global_best_route,
    //             global_best_length: global_best_length,
    //         });
    //     }
    // };
    // const set_best_route = (route: number[]) => {
    //     global_best_route = generateUniqueArrayOfCircularPath(route);
    // };

    const get_number_of_iterations = () => {
        if (current_search_count < max_routes_of_greedy) {
            return current_search_count / max_routes_of_greedy;
        }
        return (
            (current_search_count - max_routes_of_greedy) / count_of_ants + 1
        );
    };

    function emit_finish_one_route(data: PureDataOfFinishOneRoute) {
        total_time_ms += data.time_ms_of_one_route;
        current_search_count++;

        inner_emit_finish_one_route({
            ...data,
            current_search_count,

            // total_time_ms: total_time_ms,
            global_best_length: get_best_length(),
        });
    }

    function emit_finish_one_iteration(
        data: Omit<
            DataOfFinishOneIteration,
            "current_iterations" | "global_best_length"
        >
    ) {
        inner_emit_finish_one_iteration({
            ...data,
            global_best_length: get_best_length(),
            current_iterations: get_number_of_iterations(),
            convergence_coefficient,
        });
    }
    on_finish_one_iteration(() => {
        update_latest_and_optimal_routes();
        clear_pheromone_cache();
        neighbors_from_optimal_routes_and_latest_routes.clear();
    });
    on_finish_greedy_iteration(() => {
        update_latest_and_optimal_routes();
        clear_pheromone_cache();
        neighbors_from_optimal_routes_and_latest_routes.clear();
    });
    const runOneIteration = async () => {
        if (current_search_count === 0) {
            const { best_length, best_route, average_length } =
                await GreedyRoutesGenerator({
                    ...shared,
                    get_best_route,
                    get_best_length,
                    // set_best_length,
                    // set_best_route,
                    onRouteCreated,
                    emit_finish_one_route,

                    count_of_nodes,
                    emit_finish_greedy_iteration,
                });
            if (greedy_length > average_length) {
                greedy_length = average_length;
            }
            set_global_best(best_route, best_length);
            // set_best_length(best_length);
            // set_best_route(best_route);
        } else {
            let time_ms_of_one_iteration: number = 0;
            const routes_and_lengths_of_one_iteration: {
                route: number[];
                length: number;
                time_ms: number;
            }[] = await Promise.all(
                Array.from({ length: count_of_ants }).map(() =>
                    EachRouteGenerator({
                        ...shared,
                        current_search_count,

                        count_of_nodes,
                        node_coordinates,
                        pheromoneStore,
                        alpha_zero,
                        beta_zero,
                        lastrandom_selection_probability,
                        max_results_of_k_opt,
                        get_best_length,
                        get_best_route,
                        greedy_length,
                        pheromone_exceeds_maximum_range: () =>
                            pheromone_exceeds_maximum_range,
                        // set_best_length,
                        // set_best_route,
                    })
                )
            );

            for (let {
                route,
                length,
                time_ms: time_ms_of_one_route,
            } of routes_and_lengths_of_one_iteration) {
                onRouteCreated(route, length);
                // routes_and_lengths_of_one_iteration.push({ time_ms: time_ms_of_one_route,
                //     route,
                //     length,
                // });

                time_ms_of_one_iteration += time_ms_of_one_route;
                emit_finish_one_route({
                    time_ms_of_one_route: time_ms_of_one_route,
                    // route,
                    length,
                });
            }
            if (routes_and_lengths_of_one_iteration.length === count_of_ants) {
                const {
                    // iterate_best_route,
                    coefficient_of_diversity_increase,
                    // nextrandom_selection_probability,
                    population_relative_information_entropy,
                    iterate_best_length,
                    optimal_length_of_iteration,
                    optimal_route_of_iteration,
                    time_ms: timems_of_process_iteration,
                } = await EachIterationHandler({
                    ...shared,

                    routes_and_lengths: routes_and_lengths_of_one_iteration,
                    get_best_length: get_best_length,
                    get_best_route: get_best_route,
                    pheromoneStore,
                    node_coordinates,
                });
                onRouteCreated(
                    optimal_route_of_iteration,
                    optimal_length_of_iteration
                );
                time_ms_of_one_iteration += timems_of_process_iteration;
                total_time_ms += timems_of_process_iteration;

                const average_length_of_iteration =
                    sum(
                        routes_and_lengths_of_one_iteration.map((a) => a.length)
                    ) / routes_and_lengths_of_one_iteration.length;
                const worst_length_of_iteration = Math.max(
                    ...routes_and_lengths_of_one_iteration.map((a) => a.length)
                );
                emit_finish_one_iteration({
                    worst_length_of_iteration,
                    // iterate_best_route,
                    iterate_best_length,
                    average_length_of_iteration,
                    optimal_length_of_iteration,
                    // optimal_route_of_iteration,
                    population_relative_information_entropy,

                    random_selection_probability:
                        lastrandom_selection_probability,
                    time_ms_of_one_iteration: time_ms_of_one_iteration,
                    convergence_coefficient,
                });
                convergence_coefficient = update_convergence_coefficient({
                    number_of_stagnation,
                    coefficient_of_diversity_increase,
                    convergence_coefficient,
                    iterate_best_length,
                    greedy_length,
                });
                if (number_of_stagnation >= max_number_of_stagnation) {
                    number_of_stagnation = 0;
                }
                number_of_stagnation++;

                time_ms_of_one_iteration = 0;
                lastrandom_selection_probability =
                    update_last_random_selection_probability({
                        coefficient_of_diversity_increase,
                        lastrandom_selection_probability,
                    });
                routes_and_lengths_of_one_iteration.length = 0;

                //如果相对信息熵小于1,则在最优路径集合中暂时移除全局最优路径
                // if (population_relative_information_entropy < 1) {
                //     assignOwnKeys(
                //         collection_of_optimal_routes,
                //         collection_of_optimal_routes.filter(
                //             (a) => a.length !== get_best_length()
                //         )
                //     );
                // }
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

    function onRouteCreated(route: number[], length: number) {
        // latest_route = route;
        if (length < get_best_length()) {
            set_global_best(route, length);
            // set_best_length(length);
            // set_best_route(route);
        }
        if (collection_of_optimal_routes) {
            collection_of_optimal_routes.add(route, length);
        }
        // if (collection_of_latest_routes) {
        //     collection_of_latest_routes.add(route, length);
        // }

        // emit_total_change({
        //     total_time_ms,
        //     current_search_count,
        //     current_iterations: get_number_of_iterations(),
        // });
    }

    function get_search_count_of_best() {
        return search_count_of_best;
    }
    function get_time_of_best() {
        return time_of_best_ms;
    }
    function get_random_selection_probability() {
        return lastrandom_selection_probability;
    }

    const neighbors_from_optimal_routes_and_latest_routes =
        create_get_neighbors_from_optimal_routes_and_latest_routes(
            global_optimal_routes
        );
    const get_neighbors_from_optimal_routes_and_latest_routes =
        neighbors_from_optimal_routes_and_latest_routes.get;
    const shared = getShared();
    const result: TSP_Runner = {
        ...shared,
        max_results_of_2_opt,
        // on_total_change,
        // on_finish_greedy_iteration,
        max_results_of_k_opt,
        get_output_data,
        get_search_count_of_best,
        get_time_of_best,
        get_random_selection_probability,
        count_of_nodes,
        // on_best_change,
        get_total_time_ms,
        runIterations,
        // on_finish_one_iteration: on_finish_one_iteration,
        // on_finish_one_route: on_finish_one_route,
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

            get_best_route,
            get_best_length,
            // set_best_route,
            // set_best_length,
            get_current_search_count,
            pheromoneStore,
            count_of_nodes,
            set_global_best,
        };
    }
    return result;
}
