import {
    get_distance_round,
    set_distance_round,
} from "../src/set_distance_round";
import { ArrayShuffle } from "./ArrayShuffle";
import { closed_total_path_length } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { cycle_reorganize } from "./cycle_reorganize";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { NodeCoordinates } from "./NodeCoordinates";

export function Greedy_algorithm_to_solve_tsp_with_selected_start({
    node_coordinates,
    start,
    round = false,
    max_cities_of_greedy = Infinity,
}: {
    node_coordinates: NodeCoordinates;
    start: number;
    round?: boolean;
    max_cities_of_greedy?: number;
}): { route: number[]; length: number } {
    set_distance_round(round);
    if (start < 0 || start >= node_coordinates.length) {
        throw new Error("incorrect start");
    }
    const inputindexs = Array(node_coordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const indexsset = new Set(inputindexs);
    const firstnode = start;
    const result = [firstnode];
    indexsset.delete(firstnode);

    while (indexsset.size) {
        const currentnode = result.slice(-1)[0];
        const restnodes =
            max_cities_of_greedy < Infinity
                ? ArrayShuffle(Array.from(indexsset)).slice(
                      0,
                      max_cities_of_greedy
                  )
                : Array.from(indexsset);
        const nextnodesanddistances: {
            nextnode: number;
            distance: number;
        }[] = restnodes.map((value) => {
            return {
                nextnode: value,
                distance: geteuclideandistancebyindex(
                    currentnode,
                    value,
                    node_coordinates,
                    round
                ),
            };
        });
        const bestnextnodeanddistance: {
            nextnode: number;
            distance: number;
        } = nextnodesanddistances.reduce((previous, current) => {
            return previous.distance < current.distance ? previous : current;
        }, nextnodesanddistances[0]);
        const nextnode = bestnextnodeanddistance.nextnode;
        if (typeof nextnode !== "number" || nextnode === -1) {
            throw new Error("Accident");
        }
        indexsset.delete(nextnode);
        result.push(nextnode);
    }

    const route = result;
    const greedypath = cycle_reorganize(route, 0);
    const length = closed_total_path_length({
        round: get_distance_round(),
        path: greedypath,
        getdistancebyindex: creategetdistancebyindex(node_coordinates, round),
    });
    return { route: result, length: length };
}
