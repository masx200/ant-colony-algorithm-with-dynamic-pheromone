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
        const Roulette = Array.from(weights);

        let i = 0;
        for (const w of weights) {
            Roulette[i] = Math.min(
                1,
                w / sumofweights + (Roulette[i - 1] ?? 0)
            );
            i++;
        }
        // console.log(Roulette)
        assert_true(Roulette.every((n) => n >= 0 && n <= 1));
        const ran = Math.random();
        // for (let i = 0; i < input.length; i++) {
        //     if (ran < Roulette[i]) {
        //         const result = input[i];
        //         return result;
        //     }
        // }
        if (ran <= Roulette[0]) {
            const result = input[0];
            return result;
        }
        if (ran >= (Roulette.at(-1) || 1)) {
            const result = input[input.length - 1];
            return result;
        }
        let left = 0;
        let right = input.length - 1;
        while (right - left >= 1) {
            const mid = Math.floor((right + left) / 2);
            if (ran <= Roulette[mid] && (Roulette[mid - 1] ?? 0) <= ran) {
                const result = input[mid];
                return result;
            } else if (ran < (Roulette[mid - 1] ?? 0)) {
                right = mid - 1;
            } else if (ran > Roulette[mid]) {
                left = mid + 1;
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
