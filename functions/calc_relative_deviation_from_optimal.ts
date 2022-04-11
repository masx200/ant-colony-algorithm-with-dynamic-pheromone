import { sum } from "lodash";
import { assert_true } from "../test/assert_true";
export function calc_relative_deviation_from_optimal(
    arg0: number[],
    best_length: number
): number {
    assert_true(arg0.length > 0);
    const length = arg0.length;

    const Standard_Deviation =
        sum(arg0.map((a) => Math.abs(a - best_length))) / length;
    return Standard_Deviation / best_length;
}
