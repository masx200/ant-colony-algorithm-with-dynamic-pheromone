// import { getUniqueStringOfCircularRoute } from "../functions/getUniqueStringOfCircularRoute";
import { assert_true } from "../test/assert_true";
import { assignOwnKeys } from "./assignOwnKeys";
export function create_collection_of_latest_routes(max_size: number) {
    return new CollectionOfLatestRoutes(0, max_size);
}
export class CollectionOfLatestRoutes extends Array<{
    route: number[];
    length: number;
}> {
    get [Symbol.toStringTag]() {
        return "CollectionOfLatestRoutes";
    }
    filter(
        predicate: (
            value: {
                route: number[];
                length: number;
            },
            index: number,
            array: {
                route: number[];
                length: number;
            }[]
        ) => boolean,
        thisArg?: any
    ): Array<{
        route: number[];
        length: number;
    }> {
        return super.filter.call(Array.from(this), predicate, thisArg);
    }
    // #unique_string_store = new Array<string>();
    constructor(length = 0, public max_size: number) {
        assert_true(0 < max_size, "max_size greater than 0");
        super(length);
        this.length = 0;
    }
    add(route: number[], length: number) {
        assert_true(route.length > 0);
        if (this.some((a) => a.length === length)) {
            return;
        }
        // const unique_string = getUniqueStringOfCircularRoute(route);

        // if (this.#unique_string_store.includes(unique_string)) {
        //     return;
        // }
        // this.#unique_string_store.push(unique_string);
        super.push({ route, length });

        if (this.length > this.max_size) {
            assignOwnKeys(this, this.slice(-this.max_size));
            // this.#unique_string_store = this.#unique_string_store.slice(
            //     -this.max_size
            // );
        }
    }
}
