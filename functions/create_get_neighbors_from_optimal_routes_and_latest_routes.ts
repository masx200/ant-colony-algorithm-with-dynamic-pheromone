// import { assert_true } from "../test/assert_true";
import { assert_Integer } from "../test/assert_Integer";
import uniq from "lodash/uniq";
// import { CollectionOfRoutes } from "../collections/collection-of-latest-routes";
// import { CollectionOfRoutes } from "../collections/collection-of-optimal-routes";
import "core-js/stable/array/at";
// import { uniqWith } from "lodash-es";
export function create_get_neighbors_from_optimal_routes_and_latest_routes(
    latest_and_optimal_routes: {
        route: number[];
        length: number;
    }[]
): (city: number) => number[] {
    return function get_neighbors_from_optimal_routes_and_latest_routes(
        city: number
    ): number[] {
        // assert_true(collection_of_latest_routes);
        // assert_true(collection_of_optimal_routes);
        assert_Integer(city);

        return uniq(
            latest_and_optimal_routes
                .map(({ route }) => route)
                .map((route) => {
                    const index = route.findIndex((v) => v === city);

                    if (index < 0) {
                        throw Error("Incorrect_route_found of city");
                    }

                    return [
                        route.at((index - 1 + route.length) % route.length),
                        route.at((index + 1 + route.length) % route.length),
                    ].filter((n) => typeof n === "number") as number[];
                })
                .flat()
        );
    };
}
