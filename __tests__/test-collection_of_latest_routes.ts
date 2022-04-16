import { create_collection_of_latest_routes } from "../collections/collection-of-latest-routes";
// import { entriesOwnKeys } from "../collections/entriesOwnKeys";

it("collection_of_latest_routes", () => {
    const cl = create_collection_of_latest_routes(10);

    expect(cl.length).toBe(0);

    cl.add([1, 2, 3], 3);

    expect(cl.length).toBe(1);
    expect(cl[0]).toEqual({ length: 3, route: [1, 2, 3] });
    cl.add([3, 2, 1], 1);

    expect(cl.length).toBe(2);
    expect(cl[0]).toEqual({ length: 3, route: [1, 2, 3] });

    Array(20)
        .fill(0)
        .map((_v, i) => i)
        .map((l) => [1, 2, 3, 4, 6, l])
        .forEach((r) => {
            cl.add(r, r.slice(-1)[0]);
        });
    expect(cl.length).toBe(10);
    expect(cl[0]).toEqual({ length: 10, route: [1, 2, 3, 4, 6, 10] });
    expect(cl.slice(-1)[0]).toEqual({ length: 19, route: [1, 2, 3, 4, 6, 19] });
    expect(cl[Symbol.toStringTag]).toBe("CollectionOfRoutes");
    expect(cl.max_size).toBe(10);
    expect(Array.from(cl)).toEqual([
        {
            length: 10,
            route: [1, 2, 3, 4, 6, 10],
        },
        {
            length: 11,
            route: [1, 2, 3, 4, 6, 11],
        },
        {
            length: 12,
            route: [1, 2, 3, 4, 6, 12],
        },
        {
            length: 13,
            route: [1, 2, 3, 4, 6, 13],
        },
        {
            length: 14,
            route: [1, 2, 3, 4, 6, 14],
        },
        {
            length: 15,
            route: [1, 2, 3, 4, 6, 15],
        },
        {
            length: 16,
            route: [1, 2, 3, 4, 6, 16],
        },
        {
            length: 17,
            route: [1, 2, 3, 4, 6, 17],
        },
        {
            length: 18,
            route: [1, 2, 3, 4, 6, 18],
        },

        {
            length: 19,
            route: [1, 2, 3, 4, 6, 19],
        },
    ]);
    // expect(entriesOwnKeys(cl)).toEqual([
    //     ["0", [1, 2, 3, 4, 6, 10]],
    //     ["1", [1, 2, 3, 4, 6, 11]],
    //     ["2", [1, 2, 3, 4, 6, 12]],
    //     ["3", [1, 2, 3, 4, 6, 13]],
    //     ["4", [1, 2, 3, 4, 6, 14]],
    //     ["5", [1, 2, 3, 4, 6, 15]],
    //     ["6", [1, 2, 3, 4, 6, 16]],
    //     ["7", [1, 2, 3, 4, 6, 17]],
    //     ["8", [1, 2, 3, 4, 6, 18]],
    //     ["9", [1, 2, 3, 4, 6, 19]],
    //     ["length", 10],
    //     ["max_size", 10],
    // ]);
});
