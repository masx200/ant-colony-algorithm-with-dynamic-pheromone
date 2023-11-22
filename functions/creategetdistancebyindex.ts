import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { NodeCoordinates } from "./NodeCoordinates";

export function creategetdistancebyindex(
    node_coordinates: NodeCoordinates,
    round = false,
): (left: number, right: number) => number {
    return (left: number, right: number) =>
        geteuclideandistancebyindex(left, right, node_coordinates, round);
}
