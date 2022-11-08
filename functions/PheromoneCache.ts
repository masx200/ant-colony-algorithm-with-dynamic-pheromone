import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { ReadOnlyPheromone } from "./ReadOnlyPheromone";

export type PheromoneCache = MatrixSymmetry<number> &
    ReadOnlyPheromone & {
        clear(): void;
        set: (row: number, column: number, value: number) => void;
    };
