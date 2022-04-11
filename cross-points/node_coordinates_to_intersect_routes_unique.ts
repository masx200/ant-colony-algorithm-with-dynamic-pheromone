import { NodeCoordinates } from "../functions/NodeCoordinates";
export const node_coordinates_to_intersect_routes_unique: WeakMap<
    NodeCoordinates,
    Map<string, boolean>
> = new WeakMap();
