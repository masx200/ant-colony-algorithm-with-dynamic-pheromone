import { getstoreofnode_coordinates } from "./getstoreofnode_coordinates";
import { NodeCoordinates } from "./NodeCoordinates";

export function geteuclideandistancebyindex(
    left: number,
    right: number,
    node_coordinates: NodeCoordinates,
    round = false,
): number {
    const euclideandistancerecord = getstoreofnode_coordinates(
        node_coordinates,
        round,
    );
    if (euclideandistancerecord.has(left, right)) {
        return euclideandistancerecord.get(left, right);
    } else {
        throw Error("out of bounds:" + left + "," + right);
    }
}
