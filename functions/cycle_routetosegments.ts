export function cycle_routetosegments(path: number[]): [number, number][] {
    return path.map((value, index, array) => {
        const nextindex = index === array.length - 1 ? 0 : index + 1;
        return [value, array[nextindex]];
    });
}
