import { TSP_RunnerRef } from "./TSP_workerRef";

export function Stop_TSP_Worker() {
    TSP_RunnerRef.value?.terminate();
    TSP_RunnerRef.value = undefined;
}
