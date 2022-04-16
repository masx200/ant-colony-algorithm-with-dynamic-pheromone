import { ReadOnlyPheromone } from "./ReadOnlyPheromone";

export type PheromoneCache = ReadOnlyPheromone & {
    clear(): void;
    set: (row: number, column: number, value: number) => void;
};
