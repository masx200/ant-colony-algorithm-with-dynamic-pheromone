export function euclidean_distance(
    leftpair: [number, number],
    rightpair: [number, number],
    round = false,
): number {
    const round_func: (x: number) => number = round ? Math.round : (a) => a;
    return round_func(
        Number(Math.hypot(...leftpair.map((a, i) => a - rightpair[i]))),
    );
}
