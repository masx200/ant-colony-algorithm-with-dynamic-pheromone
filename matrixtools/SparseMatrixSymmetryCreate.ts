import { matrixkeyiterator } from "./matrixkeyiterator";
import { SparseMatrixCreate, SparseMatrixOptions } from "./SparseMatrixCreate";
import { SparseMatrixSymmetry } from "./SparseMatrixSymmetry";

/**
 *
 * 创建稀疏二维矩阵对称式
 */
export function SparseMatrixSymmetryCreate<R extends number = number>(
    opts?: SparseMatrixOptions<R, R>
): SparseMatrixSymmetry<R> {
    const { row = 1, column = opts?.row || 1 } = opts || {};
    function checkoutofbounds(inputrow: number, inputcolumn: number) {
        //序号应该从0开始到row-1结束
        if (
            inputrow > row - 1 ||
            inputcolumn > column - 1 ||
            inputrow < 0 ||
            inputcolumn < 0
        ) {
            throw new Error("row or column out of bounds");
        }
    }
    if (row !== column) {
        throw new Error("Symmetry Matrix , row, column should equal");
    }
    const { initializer, ...rest } = opts || {};
    const matrix = SparseMatrixCreate(rest);
    const defaultvalue = opts?.default ?? 0;
    function get(row: number, column: number): number {
        checkoutofbounds(row, column);
        return matrix.has(row, column)
            ? matrix.get(row, column)
            : matrix.has(column, row)
            ? matrix.get(column, row)
            : defaultvalue;
    }

    function set(row: number, column: number, value: number): void {
        checkoutofbounds(row, column);
        matrix.set(Math.min(row, column), Math.max(row, column), value);
    }
    // console.log(SparseMatrix);
    function values() {
        return Array.from(matrix.values());
    }
    function keys(): [number, number][] {
        return Array.from(matrix.keys());
    }

    function entries(): [number, number, number][] {
        return Array.from(matrix.entries());
    }
    const has = (row: number, column: number) =>
        matrix.has(row, column) || matrix.has(column, row);

    const obj: SparseMatrixSymmetry<R> = {
        ...matrix,
        row: row as R,
        column: column as R,
        // delete: (row: number, column: number) => {
        //     return SparseMatrix.delete(
        //         Math.min(row, column),
        //         Math.max(row, column)
        //     );
        // },
        has,
        // clear: SparseMatrix.clear,
        // size: SparseMatrix.size,
        symmetry: true,
        values,
        keys,
        entries,
        get,
        set,
        [Symbol.toStringTag]: "SparseMatrixSymmetry",
    };
    if (initializer) {
        for (let [i, j] of matrixkeyiterator(row, column)) {
            const value = initializer(i, j);
            if (typeof value === "number") {
                obj.set(i, j, value);
            }
        }
    }
    return obj;
}
