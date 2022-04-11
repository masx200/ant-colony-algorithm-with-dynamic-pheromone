import { assert_true } from "../test/assert_true";
import { assert_Integer } from "../test/assert_Integer";
import uniq from "lodash/uniq";
import { CollectionOfLatestRoutes } from "../collections/collection-of-latest-routes";
import { CollectionOfOptimalRoutes } from "../collections/collection-of-optimal-routes";
import "core-js/stable/array/at";
export function create_get_neighbors_from_optimal_routes_and_latest_routes(
    collection_of_latest_routes: CollectionOfLatestRoutes,
    collection_of_optimal_routes: CollectionOfOptimalRoutes
): (city: number) => number[] {
    return function get_neighbors_from_optimal_routes_and_latest_routes(
        city: number
    ): number[] {
        assert_true(collection_of_latest_routes);
        assert_true(collection_of_optimal_routes);
        assert_Integer(city);

        return uniq(
            [
                ...collection_of_latest_routes,
                ...collection_of_optimal_routes.map(({ route }) => route),
            ]
                .map((route) => {
                    const index = route.findIndex((v) => v === city);

                    if (index < 0) {
                        throw Error("Incorrect_route_found of city");
                    }

                    return [
                        route.at((index - 1 + route.length) % route.length),
                        route.at((index + 1 + route.length) % route.length),
                    ].filter(Boolean) as number[];
                })
                .flat()
        );
    };
}
