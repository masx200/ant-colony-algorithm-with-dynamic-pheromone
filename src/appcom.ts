import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "./Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
import { ECBasicOption } from "echarts/types/dist/shared";
import {
    computed,
    defineComponent,
    onMounted,
    reactive,
    readonly,
    Ref,
    ref,
    watch,
} from "vue";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { assert_number } from "../test/assert_number";
// import { assert_true } from "../test/assert_true";
import Data_table from "./Data_table.vue";
import {
    default_count_of_ants,
    default_search_rounds,
    default_search_time_seconds,
    default_beta,
    default_alpha,
    DefaultOptions,
    // show_every_route,
} from "./default_Options";
import { get_distance_round, set_distance_round } from "./set_distance_round";
// import { draw_best_route_debounced } from "./draw_best_route_debounced";
// import { draw_iteration_rounds_and_information_entropy_chart_debounced } from "./draw_iteration_rounds_and_information_entropy_chart_debounced";
// import { draw_latest_route_debounced } from "./draw_latest_route_debounced";
// import { draw_path_number_and_current_path_length_chart_debounced } from "./draw_path_number_and_current_path_length_chart_debounced";
// import { draw_path_number_and_optimal_path_length_chart_debounced } from "./draw_path_number_and_optimal_path_length_chart_debounced";
import Progress_element from "./Progress-element.vue";
import { RunWay } from "./RunWay";
import { Stop_TSP_Worker } from "./Stop_TSP_Worker";
import { TSP_cities_data } from "./TSP_cities_data";
import { TSP_Reset } from "./TSP_Reset";
import { TSP_RunnerRef } from "./TSP_workerRef";
import { use_data_of_one_iteration } from "./use_data_of_one_iteration";
import { use_data_of_one_route } from "./use_data_of_one_route";
import { use_data_of_summary } from "./use_data_of_summary";
// import { use_escharts_container_pair } from "./use_escharts_container_pair";
import { use_history_of_best } from "./use_history_of_best";
import { use_initialize_tsp_runner } from "./use_initialize_tsp_runner";
import { run_tsp_by_search_rounds } from "./run_tsp-by-search-rounds";
import { run_tsp_by_search_time as run_tsp_by_search_time } from "./run_tsp_by_search_time";
import { generate_greedy_preview_echarts_options } from "./generate_greedy_preview_echarts_options";
import { use_tsp_before_start } from "./use_tsp_before_start";
import { TSP_cities_map } from "./TSP_cities_map";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";
import { use_data_of_greedy_iteration } from "./use_data_of_greedy_iteration";
import LineChart from "./LineChart.vue";
// import { assignOwnKeys } from "../collections/assignOwnKeys";
import { get_options_route_of_node_coordinates } from "./get_options_route_of_node_coordinates";
import { get_options_route_number_and_best_length_chart } from "./get_options_route_number_and_best_length_chart";
import { get_options_iterations_and_information_entropy_chart } from "./get_options_iterations_and_information_entropy_chart";
import { get_options_route_number_and_current_length_chart } from "./get_options_route_number_and_current_length_chart";
// import { ECOption } from "../functions/echarts-line";
import { TSP_Output_Data } from "../functions/TSP_Output_Data";
export default defineComponent({
    components: {
        Data_table: Data_table,
        Progress_element: Progress_element,
        LineChart,
    },
    setup() {
        const selected_value = ref(TSP_cities_data[0]);
        const selected_node_coordinates = ref<NodeCoordinates>();
        const show_progress = ref(true);
        const input_options = reactive(DefaultOptions);

        const round_result = ref(get_distance_round());
        watch(round_result, (round) => {
            set_distance_round(round);
        });
        const show_configurations = ref(true);
        const show_history_routes_of_best = ref(true);
        const show_array_routes_of_best = ref(true);
        const show_chart_of_best = ref(false);
        const show_summary_of_routes = ref(true);
        const show_routes_of_best = ref(true);
        // const show_routes_of_latest = ref(false);
        const show_chart_of_latest = ref(false);
        const show_chart_of_entropy = ref(false);
        const show_summary_of_iterations = ref(true);
        const details_shows_should_hide = [
            show_history_routes_of_best,
            show_array_routes_of_best,
            show_configurations,
            show_summary_of_iterations,
            show_chart_of_entropy,
            show_chart_of_latest,
            // show_routes_of_latest,
            show_summary_of_routes,
            show_routes_of_best,
            show_chart_of_best,
        ];
        onMounted(() => {
            watch(is_running, (running) => {
                if (running) {
                    details_shows_should_hide.forEach((a) => (a.value = false));
                } else {
                    details_shows_should_hide.forEach((a) => (a.value = true));
                }
            });
            window.addEventListener("beforeunload", (e) => {
                if (is_running.value) {
                    e.returnValue = "是否要关闭";
                    e.preventDefault();
                }
            });
        });
        onMounted(() => {
            if (Reflect.has(navigator, "wakeLock")) {
                let lock:
                    | {
                          addEventListener: (
                              arg0: string,
                              arg1: () => void
                          ) => void;
                          release: () => Promise<void>;
                      }
                    | null
                    | undefined;
                watch(is_running, async (running) => {
                    console.log({ running }, { lock });
                    if (running) {
                        if (lock) {
                            return;
                        }
                        const wakeLock = Reflect.get(navigator, "wakeLock");

                        lock = await wakeLock.request("screen");

                        lock?.addEventListener("release", () => {
                            lock = null;
                        });
                    } else {
                        if (lock) {
                            await lock.release();
                            return;
                        }
                    }
                });
            }
        });
        const percentage = ref(0);
        const {
            oneiterationtableheads,
            onreceivedataofoneIteration,
            clearDataOfOneIteration,
            dataofoneiteration,
            oneiterationtablebody,
        } = use_data_of_one_iteration();

        const {
            dataofoneroute,
            // oneroutetablebody,
            onreceivedataofoneroute,
            clearDataOfOneRoute,
            // oneroutetableheads,
        } = use_data_of_one_route();
        const {
            on_receive_Data_Of_total,
            // data_of_total,
            summary_best_TableHeads,
            summary_total_TableHeads,
            summary_best_TableBody,
            summary_total_TableBody,
            global_best_routeHeads,
            global_best_routeBody,
            data_of_best: data_of_best,
            on_receive_Data_Of_Global_Best,
            clear_data_of_best,
        } = use_data_of_summary();
        const {
            clearData: clearDataOfHistoryOfBest,
            TableHeads: TableHeadsOfHistoryOfBest,
            TableBody: TableBodyOfHistoryOfBest,
        } = use_history_of_best(readonly(data_of_best));

        const initializeTSP_runner = use_initialize_tsp_runner();
        //     {
        //     on_receive_Data_Of_Global_Best,
        //     onreceivedataofoneroute,
        //     onreceivedataofoneIteration,
        // }
        const TSP_before_Start = use_tsp_before_start(initializeTSP_runner);

        const is_running = ref(false);

        const disablemapswitching = ref(false);
        const searchrounds = ref(default_search_rounds);
        const count_of_ants_ref = ref(default_count_of_ants);
        const selecteleref = ref<HTMLSelectElement>();

        const options_of_best_route_chart: Ref<ECBasicOption> = ref({});
        // const options_of_latest_route_chart: Ref<ECBasicOption & ECOption> =
        //     ref({});
        const options_of_iterations_and_information_entropy_chart: Ref<ECBasicOption> =
            ref({});
        const options_of_current_path_length_chart: Ref<ECBasicOption> = ref(
            {}
        );
        const options_of_best_path_length_chart: Ref<ECBasicOption> = ref({});
        const submit = async () => {
            const options = await generate_greedy_preview_echarts_options({
                selected_node_coordinates,
                selecteleref,
            });
            options_of_best_route_chart.value = options;
            // options_of_latest_route_chart.value = options;
            // assignOwnKeys(options_of_best_route_chart, options);
            // assignOwnKeys(options_of_latest_route_chart, options);
        };
        const indeterminate = ref(false);
        async function submit_select_node_coordinates() {
            if (indeterminate.value === true) {
                return;
            }
            onprogress(100 * Math.random());
            indeterminate.value = true;
            await submit();
            onprogress(0);
            indeterminate.value = false;
        }
        onMounted(async () => {
            reset();
            const element = selecteleref.value;
            if (element) {
                element.selectedIndex = 0;
            }
            data_change_listener();
            finish_one_iteration_listener();
            finish_one_route_listener();
            await submit_select_node_coordinates();
        });

        const onglobal_best_routeChange = (
            route: number[]
            // node_coordinates: NodeCoordinates
        ) => {
            const node_coordinates = selected_node_coordinates.value;
            if (!node_coordinates) {
                return;
            }
            // console.log('// onglobal_best_routeChange',route)
            // assert_true(route.length > 0);
            // assert_true(route.length === node_coordinates.length);
            // const chart = chart_store_best.value;
            // if (chart) {
            //     draw_best_route_debounced(route, node_coordinates, chart);
            // }
            const options = get_options_route_of_node_coordinates({
                route,
                node_coordinates,
            });
            options_of_best_route_chart.value = options;
            // assignOwnKeys(options_of_best_route_chart, options);
            // assignOwnKeys(options_of_best_route_chart, options);
        };
        onMounted(() => {
            watch(dataofoneiteration, () => {
                finish_one_iteration_listener();
            });
            watch(dataofoneroute, () => {
                finish_one_route_listener();
                data_change_listener();
            });
        });
        const data_change_listener = () => {
            const options =
                get_options_route_number_and_best_length_chart(dataofoneroute);
            options_of_best_path_length_chart.value = options;
            // assignOwnKeys(options_of_best_path_length_chart, options);
            // assignOwnKeys(options_of_best_path_length_chart, options);
            // draw_path_number_and_optimal_path_length_chart_debounced(
            //     path_number_and_optimal_path_length_chart,
            //     dataofoneroute
            // );
        };
        const finish_one_iteration_listener = () => {
            const options =
                get_options_iterations_and_information_entropy_chart(
                    dataofoneiteration
                );
            options_of_iterations_and_information_entropy_chart.value = options;
            // assignOwnKeys(
            //     options_of_iterations_and_information_entropy_chart,
            //     options
            // );
            // draw_iteration_rounds_and_information_entropy_chart_debounced(
            //     iteration_rounds_and_information_entropy_chart,
            //     dataofoneiteration
            // );
        };

        const finish_one_route_listener = () => {
            const options =
                get_options_route_number_and_current_length_chart(
                    dataofoneroute
                );
            options_of_current_path_length_chart.value = options;
            // assignOwnKeys(options_of_current_path_length_chart, options);
            // draw_path_number_and_current_path_length_chart_debounced(
            //     path_number_and_current_path_length_chart,
            //     dataofoneroute
            // );
        };
        const onprogress = (p: number) => {
            assert_number(p);
            const value = Math.min(100, Math.max(0, p));
            percentage.value = value;
            if (value === 100 || value === 0) {
                navbar_float.value = false;
            } else {
                navbar_float.value = true;
            }
        };
        const create_and_run_tsp_by_search_rounds = async () => {
            is_running.value = true;
            TSP_RunnerRef.value ||= await create_runner();
            const runner = TSP_RunnerRef.value;
            return run_tsp_by_search_rounds({
                on_update_output_data,
                runner: runner.remote,

                onprogress,
                searchrounds,
                count_of_ants_ref,
                is_running,
            });
        };
        const data_of_greedy_iteration = use_data_of_greedy_iteration();
        const greedy_iteration_table_heads =
            data_of_greedy_iteration.tableheads;
        const greedy_iteration_table_body = data_of_greedy_iteration.tablebody;
        const on_receive_data_of_greedy =
            data_of_greedy_iteration.onreceivedata;
        function on_update_output_data(data: TSP_Output_Data) {
            on_receive_data_of_greedy(data.data_of_greedy[0]);
            onglobal_best_routeChange(data.global_best_route);
            // onLatestRouteChange(data.latest_route);

            on_receive_Data_Of_total(data);
            on_receive_Data_Of_Global_Best(data);
            onreceivedataofoneIteration(data.data_of_iterations);
            onreceivedataofoneroute(data.data_of_routes);
        }
        const TSP_terminate = () => {
            data_of_greedy_iteration.clearData();
            clearDataOfHistoryOfBest();
            TSP_Reset([
                clearDataOfOneRoute,
                clearDataOfOneIteration,
                clear_data_of_best,
            ]);
        };

        const resetold = () => {
            TSP_terminate();
            disablemapswitching.value = false;
            is_running.value = false;
        };
        const reset = () => {
            percentage.value = 0;
            resetold();
        };

        const disable_stop = computed(() => {
            return !is_running.value;
        });
        const navbar_float = ref(false);
        const can_run = ref(true);
        const stop_handler = () => {
            Stop_TSP_Worker();
            navbar_float.value = false;
            is_running.value = false;
            can_run.value = false;
        };
        const resethandler = () => {
            reset();
            location.reload();
        };
        const search_time_seconds = ref(default_search_time_seconds);

        async function create_runner(): Promise<TSP_Worker_Remote> {
            const count_of_ants_value = count_of_ants_ref.value;
            const element = selecteleref.value;
            const node_coordinates = TSP_cities_map.get(element?.value || "");

            const alpha_value = alpha.value;
            const max_routes_of_greedy_value = max_routes_of_greedy.value;
            const beta_value = beta.value;
            const distance_round = round_result.value;
            if (
                max_routes_of_greedy_value > 0 &&
                beta_value > 0 &&
                alpha_value > 0 &&
                count_of_ants_value >= 2 &&
                node_coordinates
            ) {
                disablemapswitching.value = true;
                const count_of_ants = count_of_ants_value;
                assert_number(count_of_ants);
                const runner = await TSP_before_Start({
                    ...input_options,

                    distance_round,

                    max_routes_of_greedy: max_routes_of_greedy_value,
                    alpha_zero: alpha_value,
                    beta_zero: beta_value,

                    // onglobal_best_routeChange,
                    node_coordinates: await node_coordinates(),
                    count_of_ants,
                    // onLatestRouteChange,
                });
                // await runner.remote.on_finish_one_route(
                //     finish_one_route_listener
                // );
                // await runner.remote.on_finish_one_iteration(
                //     finish_one_iteration_listener
                // );
                // await runner.remote.on_finish_greedy_iteration(
                //     on_receive_data_of_greedy
                // );
                // await runner.remote.on_total_change(on_receive_Data_Of_total);
                Greedy_algorithm_to_solve_tsp_with_selected_start_pool.destroy();
                return runner;
            } else {
                throw new Error("incorrect parameters create_runner");
            }
        }
        const create_and_run_tsp_by_search_time = async () => {
            is_running.value = true;
            TSP_RunnerRef.value ||= await create_runner();
            const runner = TSP_RunnerRef.value;
            return run_tsp_by_search_time({
                on_update_output_data,
                runner: runner.remote,

                search_time_seconds,
                is_running,
                onprogress,
            });
        };

        const radio_run_way = ref(RunWay.round);
        const run_way_time = RunWay.time;
        const run_way_round = RunWay.round;
        const alpha = ref(default_alpha);
        const beta = ref(default_beta);
        const max_routes_of_greedy = ref(DefaultOptions.max_routes_of_greedy);
        return {
            selected_value,
            show_history_routes_of_best,
            show_progress,
            show_array_routes_of_best,
            show_configurations,
            summary_best_TableHeads,
            summary_total_TableHeads,
            summary_best_TableBody,
            summary_total_TableBody,
            input_options,
            show_chart_of_latest,
            show_chart_of_entropy,
            round_result,
            // options_of_latest_route_chart,
            // show_every_route: show_every_route,
            greedy_iteration_table_heads,
            greedy_iteration_table_body,
            max_routes_of_greedy,
            show_chart_of_best,
            alpha,
            beta,
            can_run,
            // show_routes_of_latest,
            show_routes_of_best,
            show_summary_of_routes,
            options_of_best_route_chart,
            navbar_float,
            run_way_round,
            show_summary_of_iterations,
            run_way_time,
            radio_run_way,
            create_and_run_tsp_by_search_time,
            search_time_seconds,
            indeterminate,
            TableHeadsOfHistoryOfBest,
            TableBodyOfHistoryOfBest,
            disable_stop,
            stop_handler,
            global_best_routeBody,
            global_best_routeHeads,
            // container_of_iteration_rounds_and_information_entropy_chart,
            is_running,
            options_of_iterations_and_information_entropy_chart,
            resethandler: resethandler,
            // summary_best_TableHeads,
            // summary_best_TableBody,
            // oneroutetableheads,
            // oneroutetablebody,
            oneiterationtableheads,
            oneiterationtablebody,
            count_of_ants_ref,
            // container_of_path_number_and_current_path_length_chart,
            disablemapswitching,
            // container_of_path_number_and_optimal_path_length_chart,
            create_and_run_tsp_by_search_rounds,
            searchrounds,
            TSP_cities_data,
            submit_select_node_coordinates,
            selecteleref,
            // container_of_best_chart,
            // container_of_latest_chart,
            percentage,
            options_of_current_path_length_chart,
            options_of_best_path_length_chart,
        };
    },
});
