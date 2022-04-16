// import { getUniqueStringOfCircularRoute } from "../functions/getUniqueStringOfCircularRoute";
import { assert_true } from "../test/assert_true";
import { assignOwnKeys } from "./assignOwnKeys";
import type { CollectionOfRoutes } from "./CollectionOfRoutes";
export type { CollectionOfRoutes };
export function create_collection_of_latest_routes(
    max_size: number
): CollectionOfRoutes {
    assert_true(0 < max_size, "max_size greater than 0");
    const result: Array<{
        route: number[];
        length: number;
    }> = Array(0);
    assignOwnKeys(result, {
        max_size,
        get [Symbol.toStringTag]() {
            return "CollectionOfRoutes";
        },
        add(route: number[], length: number) {
            assert_true(route.length > 0);
            if (result.some((a) => a.length === length)) {
                return;
            }
            result.push({ route, length });

            if (result.length > max_size) {
                assignOwnKeys(this, result.slice(-max_size));
                // this.#unique_string_store = this.#unique_string_store.slice(
                //     -this.max_size
                // );
            }
        },
    });
    return result as CollectionOfRoutes;
    // return new CollectionOfRoutes(0, max_size);
}
// export class CollectionOfRoutes extends Array<{
//     route: number[];
//     length: number;
// }> {
//     get [Symbol.toStringTag]() {
//         return "CollectionOfRoutes";
//     }
//     filter(
//         predicate: (
//             value: {
//                 route: number[];
//                 length: number;
//             },
//             index: number,
//             array: {
//                 route: number[];
//                 length: number;
//             }[]
//         ) => boolean,
//         thisArg?: any
//     ): Array<{
//         route: number[];
//         length: number;
//     }> {
//         return super.filter.call(Array.from(this), predicate, thisArg);
//     }
//     // #unique_string_store = new Array<string>();
//     constructor(length = 0, public max_size: number) {
//         assert_true(0 < max_size, "max_size greater than 0");
//         super(length);
//         this.length = 0;
//     }
//     add(route: number[], length: number) {
//         assert_true(route.length > 0);
//         if (this.some((a) => a.length === length)) {
//             return;
//         }
//         // const unique_string = getUniqueStringOfCircularRoute(route);

//         // if (this.#unique_string_store.includes(unique_string)) {
//         //     return;
//         // }
//         // this.#unique_string_store.push(unique_string);
//         super.push({ route, length });

//         if (this.length > this.max_size) {
//             assignOwnKeys(this, this.slice(-this.max_size));
//             // this.#unique_string_store = this.#unique_string_store.slice(
//             //     -this.max_size
//             // );
//         }
//     }
// }
