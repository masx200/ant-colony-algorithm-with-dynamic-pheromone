import { isEqual } from "lodash-es";
import { cycle_reorganize } from "./cycle_reorganize";

export function cyclereorganizeequal(
    left: Array<number>,
    right: Array<number>
): boolean {
    if (!left.length) {
        return false;
    }
    if (!right.length) {
        return false;
    }

    const firstindexinright = right.findIndex((v) => v === left[0]);
    if (firstindexinright < 0) {
        return false;
    }
    const reorganizedright = cycle_reorganize(right, left[0]);
    return isEqual(left, right) || isEqual(left, reorganizedright);
}
