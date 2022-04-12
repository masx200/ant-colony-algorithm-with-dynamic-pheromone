import { MatrixSymmetryCreate } from "@masx200/sparse-2d-matrix";

export function create_pheromone_cache(count_of_nodes: number) {
    return MatrixSymmetryCreate({ row: count_of_nodes });
}
