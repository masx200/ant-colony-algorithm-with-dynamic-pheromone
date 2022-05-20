import { assert_true } from "../test/assert_true";
import { closed_total_path_length } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { NodeCoordinates } from "./NodeCoordinates";
import { picknextnodeRoulette } from "./pick-next-node-Roulette";
// import { PickNextNodeRouletteOptions } from "./PickNextNodeRouletteOptions";
import { pickRandomOne } from "./pickRandomOne";
import { SharedOptions } from "./SharedOptions";
import { select_available_cities_from_optimal_and_latest } from "./select_available_cities_from_optimal_and_latest";
import { get_distance_round } from "../src/set_distance_round";
import { ReadOnlyPheromone } from "./ReadOnlyPheromone";

export function generate_paths_using_state_transition_probabilities(
    options: {
        alpha_zero: number;
        beta_zero: number;
        random_selection_probability: number;
        node_coordinates: NodeCoordinates;

        pheromoneStore: ReadOnlyPheromone;
    } & SharedOptions
): {
    route: number[];
    length: number;
} {
    const picknextnode = picknextnodeRoulette;
    const {
        get_convergence_coefficient,
        get_neighbors_from_optimal_routes_and_latest_routes,
        max_cities_of_state_transition,
        random_selection_probability,
        node_coordinates,
        pheromoneStore,

        alpha_zero,
        beta_zero,
    } = options;

    const count_of_nodes = node_coordinates.length;
    const getpheromone = (left: number, right: number) => {
        return pheromoneStore.get(left, right);
    };
    const getdistancebyserialnumber = (left: number, right: number) => {
        return geteuclideandistancebyindex(
            left,
            right,
            node_coordinates,
            get_distance_round()
        );
    };

    const inputindexs = Array(node_coordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const startnode = getnumberfromarrayofnmber(pickRandomOne(inputindexs));
    const route: number[] = [startnode];
    const available_nodes = new Set<number>(
        inputindexs.filter((v) => !route.includes(v))
    );
    const is_count_not_large = count_of_nodes <= max_cities_of_state_transition;
    while (route.length !== count_of_nodes) {
        const current_city = Array.from(route).slice(-1)[0];
        const randomselection = Math.random() < random_selection_probability;
        const get_filtered_nodes = function (): number[] | Set<number> {
            return is_count_not_large
                ? available_nodes
                : select_available_cities_from_optimal_and_latest({
                      available_nodes,
                      get_neighbors_from_optimal_routes_and_latest_routes,
                      current_city,
                      max_size_of_cities: max_cities_of_state_transition,
                  });
        };

        /* 随机选择时,也从缩小的可选城市中选择 */
        const nextnode = randomselection
            ? getnumberfromarrayofnmber(
                  pickRandomOne(Array.from(get_filtered_nodes()))
              )
            : picknextnode({
                  ...options,
                  alpha_zero,
                  beta_zero,
                  get_convergence_coefficient,
                  currentnode: current_city,
                  availablenextnodes: Array.from(get_filtered_nodes()),
                  getpheromone,
                  getdistancebyserialnumber,
              });
        route.push(nextnode);
        available_nodes.delete(nextnode);
    }

    assert_true(route.length == count_of_nodes);
    const routelength = closed_total_path_length({
        round: get_distance_round(),
        path: route,
        getdistancebyindex: creategetdistancebyindex(
            node_coordinates,
            get_distance_round()
        ),
    });
    const length = routelength;
    return { route, length };
}
