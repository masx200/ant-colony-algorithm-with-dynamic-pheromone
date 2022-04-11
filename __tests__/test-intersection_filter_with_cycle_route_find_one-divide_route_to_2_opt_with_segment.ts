import { isEqual } from "lodash";
import { divide_route_to_2_opt_with_segment } from "../cross-points/divide_route_to_2-opt-with-segment";
import { intersection_filter_with_cycle_route_find_one_old } from "../cross-points/intersection_filter_with_cycle_route_find_one_old";
import { NodeCoordinates } from "../functions/NodeCoordinates";

it("test-intersection_filter_with_cycle_route_find_one-divide_route_to_2_opt_with_segment", () => {
    const ulysses22: NodeCoordinates = [
        [38.24, 20.42],
        [39.57, 26.15],
        [40.56, 25.32],
        [36.26, 23.12],
        [33.48, 10.54],
        [37.56, 12.19],
        [38.42, 13.11],
        [37.52, 20.44],
        [41.23, 9.1],
        [41.17, 13.05],
        [36.08, -5.21],
        [38.47, 15.13],
        [38.15, 15.35],
        [37.51, 15.17],
        [35.49, 14.32],
        [39.36, 19.56],
        [38.09, 24.36],
        [36.09, 23],
        [40.44, 13.57],
        [40.33, 14.15],
        [40.37, 14.23],
        [37.57, 22.56],
    ];

    const route = [
        0, 7, 21, 17, 3, 16, 1, 2, 15, 11, 12, 13, 6, 5, 14, 4, 10, 8, 9, 18,
        19, 20,
    ];
    const intersection = intersection_filter_with_cycle_route_find_one_old({
        node_coordinates: ulysses22 as NodeCoordinates,
        cycle_route: route,
    });
    expect(Array.isArray(intersection)).toBeTruthy();
    if (intersection) {
        const result = divide_route_to_2_opt_with_segment(route, intersection);
        expect(
            [
                [
                    [0, 7, 21, 17, 3, 16, 1, 2, 15],
                    [11, 12, 13, 6, 5, 14, 4, 10, 8, 9, 18, 19, 20],
                ],
                [
                    [11, 12, 13, 6, 5, 14, 4, 10, 8, 9, 18, 19, 20],
                    [0, 7, 21, 17, 3, 16, 1, 2, 15],
                ],
            ].some((routes) => {
                return isEqual(result, routes);
            })
        ).toBeTruthy();
    }
});
