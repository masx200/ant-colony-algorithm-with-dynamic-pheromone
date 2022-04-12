export function IntegerRange(start: number, end: number): number[] {
    return Array(end - start)
        .fill(0)
        .map((_v, i) => i + start);
}
