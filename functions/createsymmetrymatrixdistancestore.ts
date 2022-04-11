import { NodeCoordinates } from "./NodeCoordinates";

import { euclidean_distance } from "./euclidean_distance";
import { MatrixSymmetryCreate } from "@masx200/sparse-2d-matrix";

export function createsymmetrymatrixdistancestore(
    node_coordinates: NodeCoordinates,
    round = false
) {
    const row = node_coordinates.length;
    return MatrixSymmetryCreate({
        row,
        initializer: (left, right) => {
            let leftpair = node_coordinates[left];
            let rightpair = node_coordinates[right];
            let distance = euclidean_distance(leftpair, rightpair, round);
            return distance;
        },
    });
}
