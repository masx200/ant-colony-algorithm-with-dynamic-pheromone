import { assert_true } from "../test/assert_true";
import { reversearray } from "../functions/reversearray";
import { split_cycle_route_to_3_sections } from "./split_cycle_route_to_3_sections";
import { whether_3_sections_reverse_opt } from "./whether_3_sections_reverse_opt";
export function generate_3_opt_cycle_routes(oldRoute: number[]): number[][] {
    assert_true(oldRoute.length >= 6);
    const splitted_Routes = split_cycle_route_to_3_sections(oldRoute);

    assert_true(
        splitted_Routes.every((partial_route) => partial_route.length >= 2)
    );
    const [first, second, third] = splitted_Routes;
    const routes: number[][] = [...whether_3_sections_reverse_opt()].map(
        ([i, j, k]) => {
            return [
                ...(i ? reversearray(first) : first),
                ...(j ? reversearray(second) : second),
                ...(k ? reversearray(third) : third),
            ];
        }
    );
    assert_true(routes.every((route) => route.length === oldRoute.length));
    return routes;
}
