import { NodeCoordinates } from "./NodeCoordinates";

export interface GreedyWithStartOptions {
    node_coordinates: NodeCoordinates;
    start: number;
    round?: boolean;
    max_cities_of_greedy?: number;
}
