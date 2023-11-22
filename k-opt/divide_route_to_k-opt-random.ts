import { random, sum } from "lodash-es";
import { assert_true } from "../test/assert_true";
import { cycle_reorganize } from "../functions/cycle_reorganize";

import { pickRandomOne } from "../functions/pickRandomOne";
import { reversearray } from "../functions/reversearray";

export const divide_route_to_k_opt_random = (
    oldRoute: number[],
    k: number,
): number[][] => {
    k = Math.round(k);
    assert_true(oldRoute.length >= 2 * k);
    const length_of_old = oldRoute.length;
    assert_true(k <= length_of_old / 2);
    assert_true(k >= 2);
    const start = pickRandomOne(oldRoute);

    const cloned = cycle_reorganize(oldRoute, start);
    const routes: number[][] = [];
    const lengths_of_parts: number[] = Array(k).fill(2);
    while (sum(lengths_of_parts) < length_of_old) {
        const index = random(0, k - 1);

        lengths_of_parts[index] += random(
            1,
            length_of_old - sum(lengths_of_parts),
        );
    }
    for (let length_of_part of lengths_of_parts) {
        routes.push(cloned.slice(-length_of_part));
        cloned.length = cloned.length - length_of_part;
    }
    const result = reversearray(routes);
    assert_true(result.length >= 2);
    assert_true(result.length === k);
    assert_true(result.every((r) => r.length >= 2));
    assert_true(length_of_old === sum(result.map((a) => a.length)));
    return result;
};
