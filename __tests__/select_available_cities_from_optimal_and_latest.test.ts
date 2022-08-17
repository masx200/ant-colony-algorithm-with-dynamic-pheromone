import { select_available_cities_from_optimal_and_latest } from "../functions/select_available_cities_from_optimal_and_latest";
import assert from "assert";
import { it } from "vitest";
it("select_available_cities_from_optimal_and_latest-1", () => {
    const result = select_available_cities_from_optimal_and_latest({
        current_city: 1,
        available_nodes: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        get_neighbors_from_optimal_routes_and_latest_routes: (current_city) => [
            current_city,
        ],
        max_cities_of_state_transition: 6,
    });
    assert(Array.isArray(result));
    assert.equal(result.length, 6);
});
it("select_available_cities_from_optimal_and_latest-2", () => {
    const result = select_available_cities_from_optimal_and_latest({
        current_city: 1,
        available_nodes: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        get_neighbors_from_optimal_routes_and_latest_routes: (current_city) => [
            current_city,
        ],
        max_cities_of_state_transition: 9,
    });
    assert(Array.isArray(result));
    assert.equal(result.length, 9);
});
it("select_available_cities_from_optimal_and_latest-3", () => {
    const result = select_available_cities_from_optimal_and_latest({
        current_city: 1,
        available_nodes: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        get_neighbors_from_optimal_routes_and_latest_routes: (current_city) => [
            current_city,
        ],
        max_cities_of_state_transition: 29,
    });
    assert(Array.isArray(result));
    assert.equal(result.length, 9);
});
it("select_available_cities_from_optimal_and_latest-4", () => {
    const result = select_available_cities_from_optimal_and_latest({
        current_city: 21,
        available_nodes: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        get_neighbors_from_optimal_routes_and_latest_routes: (current_city) => [
            current_city,
        ],
        max_cities_of_state_transition: 6,
    });
    assert(Array.isArray(result));
    assert.equal(result.length, 6);
});
