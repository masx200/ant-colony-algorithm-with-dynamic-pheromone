import { test_population_relative_information_entropy } from "../test/test-population-relative-information-entropy";
import { testgeteuclideandistance } from "../test/testgeteuclideandistance";

import { testpathsequalinbothdirections } from "../test/testpathsequalinbothdirections";
import { testrobustsegmentintersect } from "../test/testrobustsegmentintersect";

it("main test functions-2", () => {
    testgeteuclideandistance();
    testpathsequalinbothdirections();
    testrobustsegmentintersect();

    test_population_relative_information_entropy();
});
