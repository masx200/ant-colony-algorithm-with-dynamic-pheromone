import { random, sum } from "lodash";
import { assert_true } from "../test/assert_true";
import "core-js/stable/array/at";
export function pickRandomOne<T>(input: Array<T>, weights: number[] = []): T {
    assert_true(input.length > 0);
    if (input.length === 1) {
        return input[0];
    }
    if (weights.length) {
        assert_true(weights.length === input.length);
        const sumofweights = sum(weights);
        const Roulette = weights.map((_w, i, a) => {
            return sum(a.slice(0, i + 1)) / sumofweights;
        });
        const ran = Math.random();
        for (let i = 0; i < input.length; i++) {
            if (ran < Roulette[i]) {
                const result = input[i];
                return result;
            }
        }
        const last = input.at(-1);
        assert_true(typeof last !== "undefined");
        return last;
    } else {
        const index = Math.min(random(0, input.length - 1), input.length - 1);
        assert_true(index >= 0);
        assert_true(index < input.length);
        const result = input[index];
        return result;
    }
}
