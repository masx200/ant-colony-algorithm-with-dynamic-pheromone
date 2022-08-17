import { create_collection_of_optimal_routes } from "../collections/collection-of-optimal-routes";
// import { entriesOwnKeys } from "../collections/entriesOwnKeys";
import { it } from "vitest";
import { expect } from "vitest";
it("test-collection_of_optimal_routes", () => {
    const cl = create_collection_of_optimal_routes(10);

    expect(cl.length).toBe(0);

    cl.add([1, 2, 3, 10], 10);

    expect(cl.length).toBe(1);
    expect(cl[0]).toEqual({ length: 10, route: [1, 2, 3, 10] });
    cl.add([10, 1, 2, 3], 10);

    expect(cl.length).toBe(1);
    expect(cl[0]).toEqual({ length: 10, route: [1, 2, 3, 10] });

    Array(20)
        .fill(0)
        .map((_v, i) => i)
        .map((l) => [1, 2, 3, 4, 6, l + 1])
        .forEach((r, i) => {
            cl.add(r, i + 1);
        });
    expect(cl.length).toBe(10);
    expect(cl[0]).toEqual({ length: 10, route: [1, 2, 3, 10] });
    expect(cl.slice(-1)[0]).toEqual({ length: 9, route: [1, 2, 3, 4, 6, 9] });
    expect(cl[Symbol.toStringTag]).toBe("CollectionOfOptimalRoutes");
    expect(cl.max_size).toBe(10);

    expect(Array.from(cl)).toEqual([
        { route: [1, 2, 3, 10], length: 10 },
        { route: [1, 2, 3, 4, 6, 1], length: 1 },
        { route: [1, 2, 3, 4, 6, 2], length: 2 },
        { route: [1, 2, 3, 4, 6, 3], length: 3 },
        { route: [1, 2, 3, 4, 6, 4], length: 4 },
        { route: [1, 2, 3, 4, 6, 5], length: 5 },
        { route: [1, 2, 3, 4, 6, 6], length: 6 },
        { route: [1, 2, 3, 4, 6, 7], length: 7 },
        { route: [1, 2, 3, 4, 6, 8], length: 8 },
        { route: [1, 2, 3, 4, 6, 9], length: 9 },
    ]);
    // expect(entriesOwnKeys(cl)).toEqual([
    //     ["0", { route: [1, 2, 3, 10], length: 10 }],
    //     ["1", { route: [1, 2, 3, 4, 6, 1], length: 1 }],
    //     ["2", { route: [1, 2, 3, 4, 6, 2], length: 2 }],
    //     ["3", { route: [1, 2, 3, 4, 6, 3], length: 3 }],
    //     ["4", { route: [1, 2, 3, 4, 6, 4], length: 4 }],
    //     ["5", { route: [1, 2, 3, 4, 6, 5], length: 5 }],
    //     ["6", { route: [1, 2, 3, 4, 6, 6], length: 6 }],
    //     ["7", { route: [1, 2, 3, 4, 6, 7], length: 7 }],
    //     ["8", { route: [1, 2, 3, 4, 6, 8], length: 8 }],
    //     ["9", { route: [1, 2, 3, 4, 6, 9], length: 9 }],
    //     ["length", 10],
    //     ["max_size", 10],
    // ]);
});
