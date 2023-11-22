export function Infinity_to_max_or_min(a: number): number {
    return a === Number.POSITIVE_INFINITY
        ? Number.MAX_VALUE
        : a === Number.NEGATIVE_INFINITY
          ? Number.MIN_VALUE
          : a;
}
