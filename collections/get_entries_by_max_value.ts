export function get_entries_by_max_value(array: Array<number>): [any, any] {
    return Array.from(array.entries()).reduce(
        ([pi, pv], [ci, cv]) => {
            if (pv > cv) {
                return [pi, pv];
            } else {
                return [ci, cv];
            }
        },
        [0, array[0]],
    );
}
