import { cycle_route_to_segments } from "./cycle_route_to_segments";

export function is_segment_in_cycle_route(
    cycle_route: number[],
    left: number,
    right: number
): boolean {
    return cycle_route_to_segments(cycle_route).some(
        ([city1, city2]) =>
            (city1 === left && city2 === right) ||
            (city2 === left && city1 === right)
    );
}
