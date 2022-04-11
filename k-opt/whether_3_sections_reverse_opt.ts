export function* whether_3_sections_reverse_opt(): Generator<
    [boolean, boolean, boolean],
    void,
    unknown
> {
    for (let i of [true, false]) {
        for (let j of [true, false]) {
            for (let k of [true, false]) {
                yield [i, j, k];
            }
        }
    }
}
