import { assert_Integer } from "../test/assert_Integer";
import { uniq } from "lodash-es";

import "core-js/stable/array/at";

export function create_get_neighbors_from_optimal_routes_and_latest_routes(
    latest_and_optimal_routes: {
        route: number[];
        length: number;
    }[],
): { get: (city: number) => number[]; clear(): void } {
    const cache = new Map<number, number[]>();
    function get_neighbors_from_optimal_routes_and_latest_routes(
        city: number,
    ): number[] {
        assert_Integer(city, "city should be an integer,but received:" + city);
        const cached = cache.get(city);
        if (cached) {
            return cached;
        }
        const result = uniq(
            latest_and_optimal_routes
                .map(({ route }) => {
                    /*  route)
                    .map((route) =>  */
                    const index = route.findIndex((v) => v === city);

                    if (index < 0) {
                        throw Error("Incorrect_route_found of city");
                    }

                    return [
                        route.at((index - 1 + route.length) % route.length),
                        route.at((index + 1 + route.length) % route.length),
                    ].filter((n) => typeof n === "number") as number[];
                })
                .flat(),
        );
        cache.set(city, result);
        return result;
    }
    return {
        get: get_neighbors_from_optimal_routes_and_latest_routes,
        clear() {
            cache.clear();
        },
    };
}
