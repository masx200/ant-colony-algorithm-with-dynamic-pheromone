import { expose } from "comlink";
import { local_optimization_route } from "./local_optimization_route";
import { local_optimization_route_api } from "./local_optimization_route_api";
const api: local_optimization_route_api = { local_optimization_route };
expose(api);
