import { uniqWith } from "lodash-es";
import { CollectionOfLatestRoutes } from "../collections/collection-of-latest-routes";
import { CollectionOfOptimalRoutes } from "../collections/collection-of-optimal-routes";

export function create_latest_and_optimal_routes(
    collection_of_latest_routes: CollectionOfLatestRoutes,
    collection_of_optimal_routes: CollectionOfOptimalRoutes
): { route: number[]; length: number }[] {
    return uniqWith(
        [...collection_of_latest_routes, ...collection_of_optimal_routes],
        (a, b) => a.length === b.length
    );
}
