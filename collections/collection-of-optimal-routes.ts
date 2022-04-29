// import { getUniqueStringOfCircularRoute } from "../functions/getUniqueStringOfCircularRoute";
import { assert_number } from "../test/assert_number";
import { assert_true } from "../test/assert_true";
import { assignOwnKeys } from "./assignOwnKeys";
import type { CollectionOfRoutes } from "./CollectionOfRoutes";
import { get_entries_by_max_value } from "./get_entries_by_max_value";
export type { CollectionOfRoutes };
export function create_collection_of_optimal_routes(
    max_size: number
): CollectionOfRoutes {
    assert_true(0 < max_size, "max_size greater than 0");

    const result: Array<{
        route: number[];
        length: number;
    }> = Array(0);
    function get_longest_length_of_routes():
        | { index: number; value: number }
        | undefined {
        if (result.length === 0) {
            return;
        } else {
            const [index, value] = get_entries_by_max_value(
                result.map((a) => a.length)
            );
            return { index, value };
        }
    }
    // return new CollectionOfRoutes(0, max_size);
    assignOwnKeys(result, {
        max_size,
        get [Symbol.toStringTag]() {
            return "CollectionOfRoutes";
        },
        add: (route: number[], length: number) => {
            assert_true(route.length > 0, "route length is not greater than 0");
            assert_number(length);
            assert_true(0 < length, "length must be greater than 0");
            assert_true(Infinity > length);
            if (result.some((a) => a.length === length)) {
                return;
            }
            if (result.length < max_size) {
                result.push({ route, length });
                return;
            }
            // const unique_string = getUniqueStringOfCircularRoute(route);

            // if (this.#unique_string_store.includes(unique_string)) {
            //     return;
            // }
            const longest = get_longest_length_of_routes();
            if (longest) {
                if (length > longest.value) {
                    return;
                }
            }
            // this.#unique_string_store.push(unique_string);
            result.push({ route, length });
            // this.#length_of_routes_store.push(length);

            while (result.length > max_size) {
                const longest = get_longest_length_of_routes();
                assert_true(longest);
                const index = longest.index;
                assignOwnKeys(
                    result,
                    Array.from(result).filter((_v, i) => i !== index)
                );
            }
        },
    });
    return result as CollectionOfRoutes;
}
// export class CollectionOfRoutes extends Array<{
//     route: number[];
//     length: number;
// }> {
//     get [Symbol.toStringTag]() {
//         return "CollectionOfRoutes";
//     }

//     #get_longest_length_of_routes():
//         | { index: number; value: number }
//         | undefined {
//         if (this.length === 0) {
//             return;
//         } else {
//             const [index, value] = get_entries_by_max_value(
//                 this.map((a) => a.length)
//             );
//             return { index, value };
//         }
//     }
//     // #length_of_routes_store = new Array<number>();

//     // #unique_string_store = new Array<string>();
//     constructor(length = 0, public max_size: number) {
//         assert_true(0 < max_size, "max_size greater than 0");
//         super(length);
//         this.length = 0;
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
//     add(route: number[], length: number) {
//         assert_true(route.length > 0, "route length is not greater than 0");
//         assert_number(length);
//         assert_true(0 < length, "length must be greater than 0");
//         assert_true(Infinity > length);
//         if (this.some((a) => a.length === length)) {
//             return;
//         }
//         // const unique_string = getUniqueStringOfCircularRoute(route);

//         // if (this.#unique_string_store.includes(unique_string)) {
//         //     return;
//         // }
//         const longest = this.#get_longest_length_of_routes();
//         if (longest) {
//             if (length > longest.value) {
//                 return;
//             }
//         }
//         // this.#unique_string_store.push(unique_string);
//         super.push({ route, length });
//         // this.#length_of_routes_store.push(length);

//         while (this.length > this.max_size) {
//             const longest = this.#get_longest_length_of_routes();
//             assert_true(longest);
//             const index = longest.index;
//             assignOwnKeys(
//                 this,
//                 Array.from(this).filter((_v, i) => i !== index)
//             );
//             // this.#unique_string_store = this.#unique_string_store.filter(
//             //     (_v, i) => i !== index
//             // );
//             // this.#length_of_routes_store = this.#length_of_routes_store.filter(
//             //     (_v, i) => i !== index
//             // );
//         }
//     }
// }
