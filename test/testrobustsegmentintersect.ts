import { robustsegmentintersect } from "../cross-points/robust-segment-intersect";
import { assert_true } from "./assert_true";

export function testrobustsegmentintersect() {
    assert_true(
        robustsegmentintersect([-1, 0], [1, 0], [0, -1], [0, 1]),
        "general test"
    );
    assert_true(!robustsegmentintersect([0.5, 0], [1, 0], [0, -1], [0, 1]));
    assert_true(robustsegmentintersect([0, 0], [1, 0], [0, -1], [0, 1]));
    assert_true(
        robustsegmentintersect(
            [0, 0],
            [100000000000000020000, 1e-12],
            [1, 0],
            [1e20, 1e-11]
        )
    );
    assert_true(
        !robustsegmentintersect(
            [0, 0],
            [1e20, 1e-11],
            [1, 0],
            [100000000000000020000, 1e-12]
        )
    );

    assert_true(
        !robustsegmentintersect([0, 1], [0, 2], [0, -1], [0, -2]),
        "collinear, no intersect"
    );

    assert_true(
        robustsegmentintersect([0, 1], [0, 2], [0, 1.5], [0, -2]),
        "collinear, intersect"
    );

    assert_true(
        robustsegmentintersect([0, 1], [0, 2], [0, 1], [0, -2]),
        "collinear, endpoint touch"
    );

    assert_true(
        robustsegmentintersect([0, 1], [0, -1], [0, 0], [0, 1]),
        "endpoint touches"
    );
}
