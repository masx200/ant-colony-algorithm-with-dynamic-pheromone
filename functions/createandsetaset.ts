export function createandsetaset(
    store: Map<number, Set<number[]>>,
    key: number,
): Set<number[]> {
    const set = new Set<number[]>();
    store.set(key, set);
    return set;
}
