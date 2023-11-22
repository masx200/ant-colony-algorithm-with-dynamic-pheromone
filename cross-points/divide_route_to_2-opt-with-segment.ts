import { sum } from "lodash-es";
import { assert_true } from "../test/assert_true";
import { cycle_reorganize } from "../functions/cycle_reorganize";

export const divide_route_to_2_opt_with_segment = (
    oldRoute: number[],
    segment: [[number, number], [number, number]],
): [number[], number[]] => {
    const k = 2;
    assert_true(oldRoute.length >= 2 * k);
    const length_of_old = oldRoute.length;
    assert_true(k <= length_of_old / 2);
    assert_true(k >= 2);
    const start = segment[0][1];

    const cloned = cycle_reorganize(oldRoute, start);
    const length_of_first_part = cloned.findIndex((a) => a === segment[1][1]);
    assert_true(length_of_first_part > 1);
    const routes: [number[], number[]] = [
        cloned.slice(0, length_of_first_part),
        cloned.slice(length_of_first_part),
    ];

    assert_true(routes.length >= 2);
    assert_true(routes.length === k);
    assert_true(routes.every((r) => r.length >= 2));
    assert_true(length_of_old === sum(routes.map((a) => a.length)));
    return routes;
};
