import { isFunction, isObject } from "lodash";

export function isObjectButNotFunction(
    v: any
): v is Exclude<object, (...args: any[]) => any> {
    return isObject(v) && !isFunction(v);
}
