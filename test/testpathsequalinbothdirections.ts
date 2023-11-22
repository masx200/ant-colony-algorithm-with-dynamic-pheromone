import { ispathsequalinbothdirectionswithcycle } from "../functions/ispathsequalinbothdirectionswithcycle";
import { assert_true } from "./assert_true";

export function testpathsequalinbothdirections() {
    assert_true(ispathsequalinbothdirectionswithcycle([1, 2, 3], [3, 2, 1]));
    assert_true(ispathsequalinbothdirectionswithcycle([1, 2, 3], [1, 2, 3]));
    assert_true(
        !ispathsequalinbothdirectionswithcycle([1, 2, 3], [0, 10, 100]),
    );
    assert_true(
        !ispathsequalinbothdirectionswithcycle([1, 2, 3], [3, 2, 1, 4]),
    );
    assert_true(ispathsequalinbothdirectionswithcycle([1, 2, 3], [3, 1, 2]));
    assert_true(
        ispathsequalinbothdirectionswithcycle([1, 2, 3, 4], [4, 1, 2, 3]),
    );
    assert_true(
        ispathsequalinbothdirectionswithcycle([1, 2, 3, 4], [4, 3, 2, 1]),
    );

    assert_true(
        ispathsequalinbothdirectionswithcycle([0, 1, 2, 3, 4], [0, 4, 3, 2, 1]),
    );
    assert_true(
        ispathsequalinbothdirectionswithcycle([4, 0, 1, 2, 3], [0, 4, 3, 2, 1]),
    );
    assert_true(
        ispathsequalinbothdirectionswithcycle([1, 2, 3, 4, 0], [4, 3, 2, 1, 0]),
    );
    assert_true(
        ispathsequalinbothdirectionswithcycle([2, 3, 4, 0, 1], [4, 3, 2, 1, 0]),
    );
}
