import "core-js/actual/array/at";

import { testcheckcurrentsegmentsintersectnextsegment } from "../test/testcheckcurrentsegmentsintersectnextsegment";
import { testclosedtotalpathlength } from "../test/testclosedtotalpathlength";
//import { testpathTabooList } from "../test/testPathTabooList";

it("main test functions-1", () => {
    //testpathTabooList();
    testcheckcurrentsegmentsintersectnextsegment();
    testclosedtotalpathlength();
});
