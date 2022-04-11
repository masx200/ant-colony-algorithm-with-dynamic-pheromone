export function* whether_2_sections_reverse_opt(): Generator<
    [boolean, boolean],
    void,
    unknown
> {
    yield [true, false];
    yield [false, false];
}
