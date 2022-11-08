import { Remote, wrap } from "comlink";

export function create_Worker_comlink<API>(
    createWorker: () => Worker,
    error_listener: (this: Worker, ev: ErrorEvent) => any
): { remote: Remote<API>; worker: Worker } & { terminate: () => void } {
    const endpoint = createWorker();
    const remote = wrap<API>(endpoint);
    endpoint.addEventListener("error", error_listener);
    const result = {
        remote,
        worker: endpoint,
        terminate: () => {
            endpoint.terminate();
            endpoint.removeEventListener("error", error_listener);
        },
    };

    return result;
}
