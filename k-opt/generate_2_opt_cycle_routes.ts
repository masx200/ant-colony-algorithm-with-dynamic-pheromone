import { assert_true } from "../test/assert_true";
import { reversearray } from "../functions/reversearray";
import { split_cycle_route_to_2_sections } from "./split_cycle_route_to_2_sections";
import { whether_2_sections_reverse_opt } from "./whether_2_sections_reverse_opt";
export function generate_2_opt_cycle_routes(oldRoute: number[]): number[][] {
    assert_true(oldRoute.length >= 4);
    const splitted_Routes = split_cycle_route_to_2_sections(oldRoute);

    assert_true(
        splitted_Routes.every((partial_route) => partial_route.length >= 2)
    );
    const [first, second] = splitted_Routes;
    const routes: number[][] = [...whether_2_sections_reverse_opt()].map(
        ([i, j]) => {
            return [
                ...(i ? reversearray(first) : first),
                ...(j ? reversearray(second) : second),
            ];
        }
    );
    assert_true(routes.every((route) => route.length === oldRoute.length));
    return routes;
}
