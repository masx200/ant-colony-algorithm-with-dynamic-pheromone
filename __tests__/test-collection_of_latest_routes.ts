import { create_collection_of_latest_routes } from "../collections/collection-of-latest-routes";
import { entriesOwnKeys } from "../collections/entriesOwnKeys";

it("collection_of_latest_routes", () => {
    const cl = create_collection_of_latest_routes(10);

    expect(cl.length).toBe(0);

    cl.add([1, 2, 3]);

    expect(cl.length).toBe(1);
    expect(cl[0]).toEqual([1, 2, 3]);
    cl.add([3, 2, 1]);

    expect(cl.length).toBe(1);
    expect(cl[0]).toEqual([1, 2, 3]);

    Array(20)
        .fill(0)
        .map((_v, i) => i)
        .map((l) => [1, 2, 3, 4, 6, l])
        .forEach((r) => {
            cl.add(r);
        });
    expect(cl.length).toBe(10);
    expect(cl[0]).toEqual([1, 2, 3, 4, 6, 10]);
    expect(cl.slice(-1)[0]).toEqual([1, 2, 3, 4, 6, 19]);
    expect(cl[Symbol.toStringTag]).toBe("CollectionOfLatestRoutes");
    expect(cl.max_size).toBe(10);
    expect(Array.from(cl)).toEqual([
        [1, 2, 3, 4, 6, 10],
        [1, 2, 3, 4, 6, 11],
        [1, 2, 3, 4, 6, 12],
        [1, 2, 3, 4, 6, 13],
        [1, 2, 3, 4, 6, 14],
        [1, 2, 3, 4, 6, 15],
        [1, 2, 3, 4, 6, 16],
        [1, 2, 3, 4, 6, 17],
        [1, 2, 3, 4, 6, 18],
        [1, 2, 3, 4, 6, 19],
    ]);
    expect(entriesOwnKeys(cl)).toEqual([
        ["0", [1, 2, 3, 4, 6, 10]],
        ["1", [1, 2, 3, 4, 6, 11]],
        ["2", [1, 2, 3, 4, 6, 12]],
        ["3", [1, 2, 3, 4, 6, 13]],
        ["4", [1, 2, 3, 4, 6, 14]],
        ["5", [1, 2, 3, 4, 6, 15]],
        ["6", [1, 2, 3, 4, 6, 16]],
        ["7", [1, 2, 3, 4, 6, 17]],
        ["8", [1, 2, 3, 4, 6, 18]],
        ["9", [1, 2, 3, 4, 6, 19]],
        ["length", 10],
        ["max_size", 10],
    ]);
});
