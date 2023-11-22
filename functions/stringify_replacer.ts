import { isObjectButNotFunction } from "./isObjectButNotFunction";
import { ObjectSorted } from "./ObjectSorted";

export function stringify_replacer(): (
    this: any,
    key: string,
    value: any,
) => any {
    return (_key, v) => {
        if (Array.isArray(v)) {
            return v;
        }
        if (isObjectButNotFunction(v)) {
            return ObjectSorted(v);
        }
        return v;
    };
}
