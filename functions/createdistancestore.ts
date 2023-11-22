import { NodeCoordinates } from "./NodeCoordinates";
import { cachenode_coordinatestostore } from "./cachenode_coordinatestostore";

import { createsymmetrymatrixdistancestore } from "./createsymmetrymatrixdistancestore";
import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";

export function createdistancestore(
    node_coordinates: NodeCoordinates,
    round = false,
): MatrixSymmetry<number> {
    const euclideandistancerecord = createsymmetrymatrixdistancestore(
        node_coordinates,
        round,
    );
    cachenode_coordinatestostore.set(node_coordinates, euclideandistancerecord);

    return euclideandistancerecord;
}
