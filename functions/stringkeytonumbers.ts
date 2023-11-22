export function stringkeytonumbers(
    value: `${number},${number}`,
): [number, number] {
    let s = value;
    let a = s.split(",");
    let left = Number(a[0]);
    let right = Number(a[1]);
    return [left, right];
}
