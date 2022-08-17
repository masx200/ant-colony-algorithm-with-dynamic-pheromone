import { calc_relative_deviation_from_optimal } from "../functions/calc_relative_deviation_from_optimal";
import { it } from "vitest";
it("relative_deviation_from_optimal", () => {
    expect(0).toEqual(calc_relative_deviation_from_optimal([1, 1, 1], 1));

    const result1 = calc_relative_deviation_from_optimal([1, 3, 4], 8 / 3);
    expect(result1).toEqual(5 / 12);
});
import { expect } from "vitest";
