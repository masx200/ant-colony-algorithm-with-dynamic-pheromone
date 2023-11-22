import { create_Worker_comlink } from "../src/create_Worker_comlink";
import { createThreadPool } from "../src/createThreadPool";
import { local_optimization_route_api } from "./local_optimization_route_api";
import { worker_error_listener } from "./worker_error_listener";

export const local_optimization_route_pool = createThreadPool({
    minThreads: 1,
    terminate(w) {
        w.terminate();
    },
    maxThreads: 1,
    create: () => {
        return create_Worker_comlink<local_optimization_route_api>(() => {
            const w = new Worker(
                new URL(
                    "./local_optimization_route.worker.ts",
                    import.meta.url,
                ),
                {
                    type: "module",
                },
            );
            return w;
        }, worker_error_listener);
    },
});
