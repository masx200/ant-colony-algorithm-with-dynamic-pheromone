import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { NodeCoordinates } from "./NodeCoordinates";

export const cachenode_coordinatestostore = new WeakMap<
    NodeCoordinates,
    MatrixSymmetry
>();
