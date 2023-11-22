import { ArrayShuffle } from "../functions/ArrayShuffle";
import { assert_Integer } from "../test/assert_Integer";
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
    assert_true(k === selected.length);
    const changes = ArrayShuffle(selected);
    const selected_to_changes = new Map(
        selected.map((a, i) => [a, changes[i]]),
    );
    const result = route.map((v, i, a) => {
        if (selected_to_changes.has(i)) {
            const t = selected_to_changes.get(i);
            assert_Integer(t);
            return a[t];
        } else {
            return v;
        }
    });
    return result;
}
