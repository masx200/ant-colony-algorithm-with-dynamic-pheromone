import { isEqual } from "lodash-es";
import { cyclereorganizeequal } from "./cycle_reorganizeequal";
import { reversearray } from "./reversearray";

export function ispathsequalinbothdirectionswithcycle(
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

    return (
        isEqual(left, right) ||
        isEqual(reversearray(left), right) ||
        cyclereorganizeequal(left, right) ||
        cyclereorganizeequal(left, reversearray(right))
    );
}
