import { whether_k_sections_reverse_opt } from "../k-opt/whether_k_sections_reverse-opt";
import { it, expect } from "vitest";
it("whether_k_sections_reverse_opt", () => {
    test1();

    test2();
});
function test2() {
    const result = Array.from(
        whether_k_sections_reverse_opt({ max_of_results: 30, k: 3 })
    );
    expect(result.length).toBe(8);
    expect(result.every((a) => a.length === 3)).toBe(true);
    expect(result.flat().every((a) => typeof a === "boolean")).toBe(true);
}

function test1() {
    const result = Array.from(
        whether_k_sections_reverse_opt({ max_of_results: 30, k: 7 })
    );
    expect(result.length).toBe(30);
    expect(result.every((a) => a.length === 7)).toBe(true);
    expect(result.flat().every((a) => typeof a === "boolean")).toBe(true);
}
