import { random_k_opt_limited_full } from "../k-opt/random_k_opt_limited_full";
import { assertshouldcatcherror } from "../test/assertshouldcatcherror";
import { it } from "vitest";
import { expect } from "vitest";
it("random_k_opt_limited_full", () => {
    assertshouldcatcherror(() => {
        random_k_opt_limited_full({ oldRoute: [], max_results_of_k_opt: 7 });
    });
    for (let i = 0; i < 8; i++) {
        expect(
            random_k_opt_limited_full({
                oldRoute: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
                max_results_of_k_opt: 7,
            }).length
        ).toBe(7);
    }
});
