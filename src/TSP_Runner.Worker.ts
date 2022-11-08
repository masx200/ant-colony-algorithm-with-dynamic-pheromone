import { expose } from "comlink";
import { createTSPrunner } from "../functions/createTSPrunner";
import { TSP_Runner } from "../functions/TSP_Runner";

import { TSPRunnerOptions } from "./TSPRunnerOptions";
import { TSP_Worker_API } from "./TSP_Worker_API";
let runner: TSP_Runner | undefined = undefined;
function init_runner(options: TSPRunnerOptions) {
    if (runner) {
        throw new Error("cannot init runner twice");
    }
    runner = createTSPrunner(options);
    Object.assign(API, runner);
}

const API: TSP_Worker_API = {
    init_runner,
} as TSP_Worker_API;

expose(API);
