import { cycle_route_to_segments } from "./cycle_route_to_segments";

export function update_Cached_hash_table_of_path_lengths_and_path_segments(
    map: Cached_hash_table_of_path_lengths_and_path_segments,
    routes_and_lengths: Array<{
        route: number[];
        length: number;
    }>
) {
    for (const { route, length } of routes_and_lengths) {
        if (!map.has(length)) {
            map.set(
                length,
                new Set(
                    cycle_route_to_segments(route).map(([row, column]) => {
                        if (row > column) {
                            [row, column] = [column, row];
                        }
                        return JSON.stringify([row, column]);
                    })
                )
            );
        }
    }
    const lengths = new Set(routes_and_lengths.map(({ length }) => length));

    [...map.keys()].forEach((length) => {
        if (!lengths.has(length)) {
            map.delete(length);
        }
    });
}
export function has_Cached_hash_table_of_path_lengths_and_path_segments(
    map: Cached_hash_table_of_path_lengths_and_path_segments,
    length: number,
    row: number,
    column: number
) {
    if (row > column) {
        [row, column] = [column, row];
    }
    return !!map.get(length)?.has(JSON.stringify([row, column]));
}
export type Cached_hash_table_of_path_lengths_and_path_segments = Map<
    number,
    Set<string>
>;
