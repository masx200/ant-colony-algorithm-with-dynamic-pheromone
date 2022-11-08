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
}

const API: TSP_Worker_API = new Proxy(
    {
        init_runner,
    },
    {
        ownKeys(target) {
            return [
                Reflect.ownKeys(target),
                runner ? Reflect.ownKeys(runner) : [],
            ].flat();
        },
        defineProperty: () => false,
        deleteProperty: () => false,
        get(target, key) {
            const value = Reflect.get(target, key);
            if (typeof value !== "undefined") {
                return value;
            } else {
                if (runner) {
                    return Reflect.get(runner, key);
                } else {
                    throw new Error("No runner found");
                }
            }
        },
        has(target, key) {
            return Boolean(
                Reflect.has(target, key) || (runner && Reflect.has(runner, key))
            );
        },
    }
) as TSP_Worker_API;

expose(API);
