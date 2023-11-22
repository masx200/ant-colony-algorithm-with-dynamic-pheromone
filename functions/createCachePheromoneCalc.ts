import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { Cached_hash_table_of_path_lengths_and_path_segments } from "./Cached_hash_table_of_path_lengths_and_path_segments";
import { calc_pheromone_dynamic } from "./calc_pheromone_dynamic";
import { create_pheromone_cache } from "./create_pheromone_cache";
import { PheromoneCache } from "./PheromoneCache";

export function createCachePheromoneCalc(
    count_of_nodes: number,
    global_optimal_routes: { route: number[]; length: number }[],
    greedy_length: () => number,
    convergence_coefficient: () => number,
    routes_segments_cache: Cached_hash_table_of_path_lengths_and_path_segments,
    pheromone_exceeds_maximum_range: (exceeds: boolean) => void,
): Omit<
    PheromoneCache & {
        calcAll(): void;
        calc(row: number, column: number): void;
    },
    "clear"
> &
    MatrixSymmetry<number> {
    const target = create_pheromone_cache(count_of_nodes);
    const raw_get = target.get;
    const n = count_of_nodes;

    const result = {
        calcAll(): void {
            target.clear();
            for (let i = 0; i < n; i++)
                for (let j = i; j < n; j++) {
                    if (i !== j) {
                        result.calc(i, j);
                    }
                }
        },
        calc(row: number, column: number) {
            result.set(row, column, 0);
            result.set(row, column, result.get(row, column));
        },
        set(row: number, column: number, value: number) {
            return target.set(row, column, value);
        },
        get: function (row: number, column: number): number {
            if (row === column) return 0;

            if (
                row < 0 ||
                row > count_of_nodes - 1 ||
                column < 0 ||
                column > count_of_nodes - 1
            ) {
                throw Error("row,column,out of bounds:" + row + "," + column);
            } else {
                const cached = raw_get(row, column);
                if (0 >= cached) {
                    const result = calc_pheromone_dynamic({
                        latest_and_optimal_routes: global_optimal_routes,

                        row,
                        column,
                        greedy_length: greedy_length(),
                        convergence_coefficient: convergence_coefficient(),
                        routes_segments_cache: routes_segments_cache,
                    });

                    if (result > Number.MAX_VALUE) {
                        pheromone_exceeds_maximum_range(true);
                    }
                    const max_value = Number.MAX_VALUE;
                    const min_value = Number.EPSILON;
                    let value = Math.min(result, max_value);
                    value = Math.max(value, min_value);
                    target.set(row, column, value);
                    return value;
                } else {
                    return cached;
                }
            }
        },
    };
    return Object.assign(Object.create(target), result);
}
