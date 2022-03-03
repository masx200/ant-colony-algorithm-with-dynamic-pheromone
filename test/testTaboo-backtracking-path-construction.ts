import { pickRandom } from "mathjs";
import { closedtotalpathlength } from "../functions/closed-total-path-length";
import { createmychart } from "../functions/createmychart";
import { createPheromonestore } from "../functions/createPheromonestore";
import { drawlinechart } from "../functions/drawlinechart";
import { fill_sparse_two_dimensional_matrix } from "../functions/fill_sparse_two_dimensional_matrix";
// import { filterforbiddenbeforepick } from "../functions/filterforbiddenbeforepick";
import { getnumberfromarrayofnmber } from "../functions/getnumberfromarrayofnmber";
// import { intersectionfilter } from "../functions/intersectionfilter";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { createPathTabooList } from "../functions/createPathTabooList";
// import { picknextnodeRoulette } from "../functions/pick-next-node-Roulette";
import { taboo_backtracking_path_construction } from "../functions/Taboo-backtracking-path-construction";
import { asserttrue } from "./asserttrue";
import { cachenodecoordinatestopathTabooList } from "../functions/cachenodecoordinatestopathTabooList";
import { cachebestlengthofnodecoordinates } from "../functions/cachebestlengthofnodecoordinates";
export function test_taboo_backtracking_path_construction(
    nodecoordinates: Nodecoordinates
) {
    // const { length } = nodecoordinates;
    const countofnodes = nodecoordinates.length;
    const pathTabooList =
        cachenodecoordinatestopathTabooList.get(nodecoordinates) ??
        createptlandset(countofnodes, nodecoordinates);

    const pheromonestore = createPheromonestore(countofnodes);
    fill_sparse_two_dimensional_matrix(pheromonestore, 1);
    const parameterrandomization = false;
    const alphazero = 1;
    const alphamax = alphazero * 2;
    const alphamin = alphazero / 5;
    const betazero = 5;
    const betamax = betazero * 2;
    const betamin = betazero / 5;
    console.log("test_taboo_backtracking_path_construction start");
    console.log("禁忌回溯要解决的问题的坐标是", nodecoordinates);

    const inputindexs = Array(nodecoordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const startnode = getnumberfromarrayofnmber(pickRandom(inputindexs));
    function getbestpathlength(): number {
        return (
            cachebestlengthofnodecoordinates.get(nodecoordinates) || Infinity
        );
    }
    const route = taboo_backtracking_path_construction({
        getbestpathlength,
        pathTabooList,
        pheromonestore,
        // countofnodes,
        // picknextnode: picknextnodeRoulette,
        nodecoordinates,
        // intersectionfilter,
        parameterrandomization,
        startnode,
        alphamax,
        alphamin,
        alphazero,
        betamax,
        betamin,
        betazero,
        // filterforbiddenbeforepick,
    });
    console.log("禁忌回溯算法得到的路径是", route);
    const totallength = closedtotalpathlength(route, nodecoordinates);
    console.log("禁忌回溯算法得出的路径长度", totallength);

    if (
        typeof cachebestlengthofnodecoordinates.get(nodecoordinates) !==
        "number"
    ) {
        cachebestlengthofnodecoordinates.set(nodecoordinates, totallength);
    } else {
        const bestlength =
            cachebestlengthofnodecoordinates.get(nodecoordinates);
        if (bestlength && bestlength >= totallength) {
            cachebestlengthofnodecoordinates.set(nodecoordinates, totallength);
        } else {
            console.warn("路径长度比最优解得到的结果更差,禁忌此路径", route);
            pathTabooList.add(route);
        }
    }
    console.log(
        "最优路径长度",
        cachebestlengthofnodecoordinates.get(nodecoordinates)
    );
    /* 每条路径构建完成之后,如果路径长度比贪心算法得到的结果更差,则将此路径添加到路径禁忌列表. */
    asserttrue(route.length === nodecoordinates.length);
    const linechardata = [...route, route[0]].map((v) => nodecoordinates[v]);
    console.log("禁忌回溯算法路径结果画图坐标", linechardata);
    console.log("test drawlinechart");
    const mychart = createmychart();
    drawlinechart(linechardata, mychart);
    console.log("test_taboo_backtracking_path_construction end");
}
function createptlandset(
    countofnodes: number,
    nodecoordinates: Nodecoordinates
) {
    const ptl = createPathTabooList(countofnodes);
    cachenodecoordinatestopathTabooList.set(nodecoordinates, ptl);
    return ptl;
}