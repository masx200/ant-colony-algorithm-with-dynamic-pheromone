import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { Nodecoordinates } from "./Nodecoordinates";

/* 缓存节点坐标和距离的稀疏二维对称矩阵 */
export const cachenodecoordinatestostore = new WeakMap<
    Nodecoordinates,
    SparseMatrixSymmetry
>();
console.log(cachenodecoordinatestostore);
