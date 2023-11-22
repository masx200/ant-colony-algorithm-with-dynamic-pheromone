export function getOrCreateMapOfMapFun<K extends object, B, C>(
    map: Pick<WeakMap<K, Map<B, C>>, "set" | "has" | "get">,
    key: K,
): Map<B, C> {
    let set;
    if (map.has(key)) {
        set = map.get(key);
    }
    if (!set) {
        set = new Map<B, C>();
        map.set(key, set);
    }

    return set;
}
