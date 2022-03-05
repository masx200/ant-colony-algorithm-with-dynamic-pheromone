import { isEqual } from "lodash";
import { createPathTabooList } from "../functions/createPathTabooList";
import { isPathTabooList } from "../functions/isPathTabooList";
import { assertshouldcatcherror } from "./assertshouldcatcherror";
import { asserttrue } from "./asserttrue";

export function testPathTabooList() {
    console.log("test PathTabooList start");

    const ptl = createPathTabooList(10);
    asserttrue(isPathTabooList(ptl));
    assertshouldcatcherror(() => {
        createPathTabooList(0);
    });
    assertshouldcatcherror(() => {
        createPathTabooList(1);
    });
    console.log(ptl);
    asserttrue(ptl.size() === 0);

    asserttrue(ptl.countofnodes == 10);
    ptl.add([1, 2]);
    ptl.add([2, 1]);
    asserttrue(ptl.size() === 1);
    asserttrue(ptl.has([2, 1]));
    asserttrue(ptl.has([1, 2]));
    asserttrue(!ptl.has([1, 2, 3]));
    asserttrue(!ptl.delete([1, 2, 3]));
    ptl.add([2, 1, 3]);
    asserttrue(ptl.has([2, 1, 3]));
    asserttrue(ptl.has([3, 1, 2]));
    asserttrue(ptl.size() === 2);
    asserttrue(
        isEqual(ptl.keys(), [
            [1, 2],
            [2, 1, 3],
        ])
    );
    asserttrue(
        isEqual(ptl.values(), [
            [1, 2],
            [2, 1, 3],
        ])
    );
    asserttrue(!ptl.delete([1, 2, 3]));
    asserttrue(ptl.size() === 2);
    asserttrue(ptl.delete([3, 1, 2]));
    asserttrue(ptl.size() === 1);
    ptl.clear();
    asserttrue(ptl.size() === 0);

    ptl.add([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    assertshouldcatcherror(() => {
        ptl.add([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10]);
    });

    ptl.add([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    ptl.add([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    asserttrue(ptl.size() === 1);
    asserttrue(ptl.has([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));
    asserttrue(ptl.has([2, 3, 4, 5, 6, 7, 8, 9, 0, 1]));
    asserttrue(isEqual(ptl.values(), [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]]));
    asserttrue(ptl.delete([2, 3, 4, 5, 6, 7, 8, 9, 0, 1]));
    asserttrue(ptl.size() === 0);
    console.log("test PathTabooList end");
}
