import { generate_k_opt_cycle_routes_limited } from "./generate_k_opt_cycle_routes_limited";
import { random } from "lodash-es";
import { assert_true } from "../test/assert_true";

export function random_k_opt_limited_full({
    oldRoute,
    max_results_of_k_opt,
}: {
    oldRoute: number[];
    max_results_of_k_opt: number;
}): number[][] {
    assert_true(oldRoute.length >= 4);
    const count_of_nodes = oldRoute.length;
    const routes_of_max: number[][] = [];

    while (routes_of_max.length < max_results_of_k_opt) {
        const k = Math.round(random(2, Math.floor(count_of_nodes / 2), false));
        const routes_of_k_opt = generate_k_opt_cycle_routes_limited({
            oldRoute,
            k,
            max_results: max_results_of_k_opt - routes_of_max.length,
        });
        routes_of_k_opt.forEach((r) => {
            routes_of_max.push(r);
        });
    }
    return routes_of_max;
}
