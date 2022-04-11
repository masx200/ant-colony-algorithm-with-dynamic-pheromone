import { random } from "lodash";

export function whether_k_sections_reverse_opt({
    max_of_results,
    k,
}: {
    max_of_results: number;
    k: number;
}): boolean[][] {
    k = Math.round(k);
    const set = new Set<number>();
    const min_binary = 0;
    const max_binary = 2 ** k - 1;
    while (set.size < Math.min(max_of_results, 2 ** k)) {
        set.add(random(min_binary, max_binary, false));
    }

    return Array.from(set).map((n) => {
        return n
            .toString(2)
            .padStart(k, "0")
            .split("")
            .map((a) => a === "1");
    });
}
