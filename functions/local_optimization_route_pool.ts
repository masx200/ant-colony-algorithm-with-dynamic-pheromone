import { createThreadPool } from "../src/createThreadPool";
import { create_Worker_comlink } from "../src/create_Worker_comlink";
import local_optimization_route_Worker from "./local_optimization_route.worker?worker&inline";
import { local_optimization_route_api } from "./local_optimization_route_api";
import { worker_error_listener } from "./worker_error_listener";
export const local_optimization_route_pool = createThreadPool({
    minThreads: 1,
    terminate(w) {
        w.terminate();
    },
    maxThreads: navigator.hardwareConcurrency,
    create: () => {
        return create_Worker_comlink<local_optimization_route_api>(() => {
            const w = new local_optimization_route_Worker();

            return w;
        }, worker_error_listener);
    },
});
