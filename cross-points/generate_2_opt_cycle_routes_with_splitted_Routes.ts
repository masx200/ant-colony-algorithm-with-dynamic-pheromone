import { assert_true } from "../test/assert_true";
import { reversearray } from "../functions/reversearray";
export function generate_2_opt_cycle_routes_with_splitted_Routes(
    oldRoute: number[],
    splitted_Routes: [number[], number[]],
): number[][] {
    assert_true(oldRoute.length >= 4);

    assert_true(
        splitted_Routes.every((partial_route) => partial_route.length >= 2),
    );
    const [first, second] = splitted_Routes;
    const routes: number[][] = [
        [true, false],
        [false, false],
    ].map(([i, j]) => {
        return [
            ...(i ? reversearray(first) : first),
            ...(j ? reversearray(second) : second),
        ];
    });
    assert_true(routes.every((route) => route.length === oldRoute.length));
    return routes;
}
