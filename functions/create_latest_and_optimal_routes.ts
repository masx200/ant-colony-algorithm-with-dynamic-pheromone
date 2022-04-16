import { uniqWith } from "lodash-es";
import { CollectionOfRoutes } from "../collections/collection-of-latest-routes";
// import { CollectionOfRoutes } from "../collections/collection-of-optimal-routes";

export function create_latest_and_optimal_routes(
    collection_of_latest_routes: CollectionOfRoutes,
    collection_of_optimal_routes: CollectionOfRoutes
): { route: number[]; length: number }[] {
    return uniqWith(
        [...collection_of_latest_routes, ...collection_of_optimal_routes],
        (a, b) => a.length === b.length
    );
}
