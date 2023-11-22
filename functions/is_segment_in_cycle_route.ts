// import { cycle_route_to_segments } from "./cycle_route_to_segments";

export function is_segment_in_cycle_route(
    cycle_route: number[],
    left: number,
    right: number,
): boolean {
    for (const [index, value] of cycle_route.entries()) {
        const array = cycle_route;
        const nextindex = index === cycle_route.length - 1 ? 0 : index + 1;
        const [city1, city2] = [value, array[nextindex]];

        if (
            (city1 === left && city2 === right) ||
            (city2 === left && city1 === right)
        ) {
            return true;
        }
    }
    return false;
    // return cycle_route_to_segments(cycle_route).some(
    //     ([city1, city2]) =>
    //         (city1 === left && city2 === right) ||
    //         (city2 === left && city1 === right)
    // );
}
