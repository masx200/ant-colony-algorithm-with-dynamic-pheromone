import {
    getDimension,
    getNames,
    getNodeCoordinates,
} from "@masx200/tsp-lib-test-data";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { assert_true } from "../test/assert_true";
const TSP_cords: Record<string, () => Promise<NodeCoordinates>> =
    Object.fromEntries(
        getNames()
            .map((n) => ({ name: n, dimension: getDimension(n) }))
            .filter(({ dimension }) => dimension <= 1500)
            .map(({ name }) => [name, () => getNodeCoordinates(name)]),
    );
const entries: [string, () => Promise<NodeCoordinates>][] = Object.entries(
    TSP_cords,
)
    .sort((a, b) => getDimension(a[0]) - getDimension(b[0]))
    .map((entry) => {
        const name = entry[0];
        const scale = getDimension(name);
        return [`名称:${name},规模:${scale}`, entry[1]];
    });
assert_true(entries.length);
export const TSP_cities_map = new Map<string, () => Promise<NodeCoordinates>>(
    entries,
);
