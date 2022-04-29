import { MatrixSymmetryCreate, MatrixFill } from "@masx200/sparse-2d-matrix";
import { PheromoneCache } from "./PheromoneCache";

export function create_pheromone_cache(count_of_nodes: number): PheromoneCache {
    let pheromone_cache = MatrixSymmetryCreate({ row: count_of_nodes });
    const max_value = Number.MAX_VALUE;
    const min_value = Number.EPSILON;
    return {
        clear() {
            // pheromone_cache = MatrixSymmetryCreate({ row: count_of_nodes });
            MatrixFill(pheromone_cache, 0);
        },
        row: count_of_nodes,
        get: function (row: number, column: number) {
            return pheromone_cache.get(row, column);
        },
        column: count_of_nodes,
        set: function (row: number, column: number, value: number) {
            value = Math.min(value, max_value);
            value = Math.max(value, min_value);
            pheromone_cache.set(row, column, value);
        },
    };
}
