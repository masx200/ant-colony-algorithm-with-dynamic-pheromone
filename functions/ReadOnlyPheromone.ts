import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";

export type ReadOnlyPheromone = Pick<
    MatrixSymmetry<number>,
    "row" | "column" | "get"
>;
