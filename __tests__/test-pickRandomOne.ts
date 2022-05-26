import assert from "assert";
import { pickRandomOne } from "../functions/pickRandomOne";

it("pickRandomOne", () => {
    for (let i = 0; i < 50; i++) {
        assert([7].includes(pickRandomOne([7])));
        const input = [1, 4, 5, 7, 1, 6, 6, 1, 3, 5, 7, 10, 12, 30, 20, 18];
        assert(
            pickRandomOne(
                input,
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ) === 1
        );
        assert(
            pickRandomOne(
                input,
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
            ) === 18
        );
        assert(input.includes(pickRandomOne(input)));
        assert(
            input.includes(
                pickRandomOne(
                    input,
                    input.map((a) => 1 / a)
                )
            )
        );
    }
});
