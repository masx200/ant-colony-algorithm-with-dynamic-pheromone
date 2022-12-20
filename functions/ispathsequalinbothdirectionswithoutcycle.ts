import { isEqual } from "lodash-es";
import { reversearray } from "./reversearray";

export function ispathsequalinbothdirectionswithoutcycle(
    left: Array<number>,
    right: Array<number>
): boolean {
    if (left.length != right.length) {
        return false;
    }
    if (!left.length) {
        return false;
    }
    if (!right.length) {
        return false;
    }

    return isEqual(left, right) || isEqual(reversearray(left), right);
}
