import { generate_one_k_exchange_route } from "../cross-points/generate_one_k_exchange_route";
import { isEqual } from "lodash";
it("test-generate_one_k_exchange_route", () => {
    const route = [
        1, 2, 4, 5, 6, 7, 12, 11, 15, 25, 3, 13, 21, 23, 35, 45, 23, 31, 0,
    ];
    let optimized = generate_one_k_exchange_route({ route: route, k: 6 });
    while (isEqual(route, optimized)) {
        optimized = generate_one_k_exchange_route({ route: route, k: 6 });
    }

    expect(route).not.toEqual(optimized);
    expect(route.length).toBe(optimized.length);
});
