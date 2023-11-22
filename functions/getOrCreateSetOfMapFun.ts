export function getOrCreateSetOfMapFun<K extends object, B>(
    map: Pick<WeakMap<K, Set<B>>, "set" | "has" | "get">,
): (key: K) => Set<B> {
    return function (key: K): Set<B> {
        let set;
        if (map.has(key)) {
            set = map.get(key);
        }
        if (!set) {
            set = new Set<B>();
            map.set(key, set);
        }

        return set;
    };
}
