import { calc_population_relative_information_entropy } from "../functions/calc_population-relative-information-entropy";
import { assert_true } from "./assert_true";

export function test_population_relative_information_entropy() {
    assert_true(
        0.75 ===
            calc_population_relative_information_entropy([
                [1, 2, 3, 4, 5],
                [1, 3, 2, 4, 5],
                [1, 3, 2, 4, 5],
                [1, 3, 2, 5, 4],
            ]),
    );
    assert_true(
        1 ===
            calc_population_relative_information_entropy([
                [1, 2, 3, 4, 5, 6, 7],
                [1, 2, 3, 5, 4, 6, 7],
            ]),
    );
    assert_true(
        0 ===
            calc_population_relative_information_entropy([
                [1, 2, 3],
                [1, 3, 2],
            ]),
    );
}
