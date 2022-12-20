import { sum } from "lodash-es";
import { divide_route_to_k_opt_random } from "../k-opt/divide_route_to_k-opt-random";
import { generate_3_opt_cycle_routes } from "../k-opt/generate_3_opt_cycle_routes";
import { split_cycle_route_to_3_sections } from "../k-opt/split_cycle_route_to_3_sections";
import { assert_true } from "./assert_true";

export function test_3_opt_cycle_routes() {
    for (let i = 0; i < 5; i++) {
        const oldRoute = [0, 1, 2, 3, 4, 5, 6];
        const splitted_Routes = split_cycle_route_to_3_sections(oldRoute);
        assert_true(splitted_Routes.length === 3);
        assert_true(
            splitted_Routes.every((partial_route) => partial_route.length >= 2)
        );
        assert_true(
            (oldRoute.length = sum(splitted_Routes.map((a) => a.length)))
        );
        const newRoutes = generate_3_opt_cycle_routes(oldRoute);
        assert_true(newRoutes.length === 8);
        assert_true(
            newRoutes.every((route) => route.length === oldRoute.length)
        );
    }
    for (let i = 0; i < 5; i++) {
        const oldRoute = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const splitted_Routes = split_cycle_route_to_3_sections(oldRoute);
        assert_true(splitted_Routes.length === 3);
        assert_true(
            splitted_Routes.every((partial_route) => partial_route.length >= 2)
        );
        assert_true(
            (oldRoute.length = sum(splitted_Routes.map((a) => a.length)))
        );
        const newRoutes = generate_3_opt_cycle_routes(oldRoute);
        assert_true(newRoutes.length === 8);
        assert_true(
            newRoutes.every((route) => route.length === oldRoute.length)
        );
    }
    for (let i = 0; i < 5; i++) {
        const oldRoute = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const splitted_Routes = divide_route_to_k_opt_random(oldRoute, 3);
        assert_true(splitted_Routes.length === 3);
        assert_true(
            splitted_Routes.every((partial_route) => partial_route.length >= 2)
        );
        assert_true(
            (oldRoute.length = sum(splitted_Routes.map((a) => a.length)))
        );
        const newRoutes = generate_3_opt_cycle_routes(oldRoute);
        assert_true(newRoutes.length === 8);
        assert_true(
            newRoutes.every((route) => route.length === oldRoute.length)
        );
    }
    for (let i = 0; i < 5; i++) {
        const oldRoute = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const splitted_Routes = divide_route_to_k_opt_random(oldRoute, 5);
        assert_true(splitted_Routes.length === 5);
        assert_true(
            splitted_Routes.every((partial_route) => partial_route.length >= 2)
        );
        assert_true(
            (oldRoute.length = sum(splitted_Routes.map((a) => a.length)))
        );
        const newRoutes = generate_3_opt_cycle_routes(oldRoute);
        assert_true(newRoutes.length === 8);
        assert_true(
            newRoutes.every((route) => route.length === oldRoute.length)
        );
    }
}
