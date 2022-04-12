import { ArrayShuffle } from "../functions/ArrayShuffle";
import { assert_true } from "../test/assert_true";
import { IntegerRange } from "./IntegerRange";

export function generate_one_k_exchange_route({
    route,
    k,
}: {
    route: number[];
    k: number;
}): number[] {
    assert_true(k >= 2);
    assert_true(k <= route.length);
    const index_range = IntegerRange(0, route.length - 1);

    const selected = ArrayShuffle(index_range).slice(0, k);

    const changes = ArrayShuffle(selected);

    const result = route.map((v, i, a) => {
        if (selected.includes(i)) {
            return a[changes[i]];
        } else {
            return v;
        }
    });
    return result;
}
