import { random } from "lodash-es";
import { assert_true } from "../test/assert_true";
import "core-js/stable/array/at";
import * as Randomly from "@masx200/weighted-randomly-select";

export function pickRandomOne<T>(input: Array<T>, weights: number[] = []): T {
    assert_true(input.length > 0);
    if (input.length === 1) {
        return input[0];
    }
    if (weights.length) {
        assert_true(weights.length === input.length);

        const choose_array = input.map((result, index) => {
            return {
                result,
                chance: weights[index],
            };
        });
        let result = Randomly.select(choose_array);

        assert_true(typeof result !== "undefined");
        return result;
    } else {
        const index = Math.min(random(0, input.length - 1), input.length - 1);
        assert_true(index >= 0);
        assert_true(index < input.length);
        const result = input[index];
        assert_true(typeof result !== "undefined");
        return result;
    }
}
