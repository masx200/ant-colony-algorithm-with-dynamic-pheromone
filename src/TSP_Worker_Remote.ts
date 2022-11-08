import { ProxyMethods, RemoteObject } from "comlink";

import { TSP_Worker_API } from "./TSP_Worker_API";

export type TSP_Worker_Remote = { worker: Worker; terminate: () => void } & {
    remote: RemoteObject<TSP_Worker_API> & ProxyMethods & {};
};
