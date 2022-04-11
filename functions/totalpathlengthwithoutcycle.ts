import { sum } from "lodash";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { NodeCoordinates } from "./NodeCoordinates";

export function totalpathlengthwithoutcycle(
    path: number[],
    node_coordinates: NodeCoordinates,
    round = false
): number {
    if (path.length >= node_coordinates.length) {
        throw Error("invalid path not match node_coordinates");
    }
    return sum(
        path
            .map((value, index, array) => {
                const nextindex = index === array.length - 1 ? 0 : index + 1;
                return [value, array[nextindex]];
            })
            .slice(0, -1)
            .map(([left, right]) =>
                geteuclideandistancebyindex(
                    left,
                    right,
                    node_coordinates,
                    round
                )
            )
    );
}
