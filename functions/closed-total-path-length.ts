import { sum } from "lodash";
import { assert_number } from "../test/assert_number";
import { cycle_route_to_segments } from "./cycle_route_to_segments";
import { generateUniqueArrayOfCircularPath } from "./generateUniqueArrayOfCircularPath";
export function closed_total_path_length({
    path,
    getdistancebyindex,
    round = false,
}: {
    path: number[];
    getdistancebyindex: (left: number, right: number) => number;
    round?: boolean;
}): number {
    const route = generateUniqueArrayOfCircularPath(path);
    return sum(
        cycle_route_to_segments(route).map(function ([left, right]) {
            const distance = getdistancebyindex(left, right);
            assert_number(distance);
            if (round) {
                return Math.round(distance);
            } else {
                return distance;
            }
        })
    );
}
