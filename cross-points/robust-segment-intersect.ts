import crosses from "robust-segment-intersect";
export type Coordinate = [number, number];
export function robustsegmentintersect(
    a0: Coordinate,
    a1: Coordinate,
    b0: Coordinate,
    b1: Coordinate
): boolean {
    return crosses(a0, a1, b0, b1);
}
