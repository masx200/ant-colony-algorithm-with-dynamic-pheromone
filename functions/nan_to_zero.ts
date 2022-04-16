export function nan_to_zero(r: number): number {
    return Number.isNaN(r) ? 0 : r;
}
