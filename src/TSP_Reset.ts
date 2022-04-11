import { Stop_TSP_Worker } from "./Stop_TSP_Worker";

export function TSP_Reset(clearCallbacks: Array<() => void>) {
    clearCallbacks.forEach((c) => c());
    Stop_TSP_Worker();
}
