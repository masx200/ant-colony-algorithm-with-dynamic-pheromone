import { NodeCoordinates } from "./NodeCoordinates";
import { cachenode_coordinatestostore } from "./cachenode_coordinatestostore";

import { createdistancestore } from "./createdistancestore";
import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";

export function getstoreofnode_coordinates(
    node_coordinates: NodeCoordinates,
    round = false,
): MatrixSymmetry {
    return (
        cachenode_coordinatestostore.get(node_coordinates) ??
        createdistancestore(node_coordinates, round)
    );
}
