// import { uniqWith } from "lodash-es";
import { CollectionOfLatestRoutes } from "../collections/collection-of-latest-routes";
import { CollectionOfOptimalRoutes } from "../collections/collection-of-optimal-routes";
import { create_latest_and_optimal_routes } from "./create_latest_and_optimal_routes";

export function create_latest_and_optimal_routes_rank_first_half(
    collection_of_latest_routes: CollectionOfLatestRoutes,
    collection_of_optimal_routes: CollectionOfOptimalRoutes
): { route: number[]; length: number }[] {
    const result = create_latest_and_optimal_routes(
        collection_of_latest_routes,
        collection_of_optimal_routes
    ).sort((a, b) => a.length - b.length);
    return result.slice(0, result.length / 2);
}
