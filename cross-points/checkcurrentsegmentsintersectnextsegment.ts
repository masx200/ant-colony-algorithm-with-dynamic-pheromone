import { NodeCoordinates } from "../functions/NodeCoordinates";
import { robustsegmentintersect } from "./robust-segment-intersect";

export function checkcurrentsegmentsintersectnextsegment(
    currentsegments: [number, number][],
    nextsegment: [number, number],
    node_coordinates: NodeCoordinates,
): boolean {
    return currentsegments.some((segment) => {
        const intersectparameters = [
            segment[0],
            segment[1],
            nextsegment[0],
            nextsegment[1],
        ].map((node) => node_coordinates[node]);
        return robustsegmentintersect(
            intersectparameters[0],
            intersectparameters[1],
            intersectparameters[2],
            intersectparameters[3],
        );
    });
}
