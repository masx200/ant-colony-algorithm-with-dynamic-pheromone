import { matrixkeyiterator } from "./matrixkeyiterator";
import { numberstostringkeynotsymmetry } from "./numberstostringkeynotsymmetry";
import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";
import { stringkeytonumbers } from "./stringkeytonumbers";
export interface SparseMatrixOptions<
    R extends number = number,
    C extends number = number
> {
    row: R;
    column: C;
    default?: number;
    initializer?: (row: number, column: number) => number;
}
/* 创建稀疏二维矩阵 非对称*/
export function SparseMatrixCreate<R extends number, C extends number>(
    opts: SparseMatrixOptions<R, C>
): SparseTwoDimensionalMatrix<R, C> {
    const { row, column, initializer } = opts;
    function checkoutofbounds(inputrow: number, inputcolumn: number) {
        //序号应该从0开始到row-1结束
        if (
            inputrow > opts.row - 1 ||
            inputcolumn > opts.column - 1 ||
            inputrow < 0 ||
            inputcolumn < 0
        ) {
            throw new Error("row or column out of bounds");
        }
    }
    if (!(row > 0 && column > 0)) {
        throw new Error(" row, column should greater than 0");
    }
    const valuesrecord = new Map<`${number},${number}`, number>();

    function get(row: number, column: number): number {
        checkoutofbounds(row, column);
        return (
            valuesrecord.get(numberstostringkeynotsymmetry(row, column)) ??
            opts.default ??
            0
        );
    }

    function set(row: number, column: number, value: number): void {
        checkoutofbounds(row, column);
        valuesrecord.set(numberstostringkeynotsymmetry(row, column), value);
    }
    // console.log(valuesrecord);
    function values() {
        return Array.from(valuesrecord.values());
    }
    function keys(): [number, number][] {
        return Array.from(valuesrecord.keys()).map(stringkeytonumbers);
    }

    function entries(): [number, number, number][] {
        return Array.from(valuesrecord.entries()).map(([key, value]) => {
            return [...stringkeytonumbers(key), value];
        });
    }
    const has = (row: number, column: number) =>
        valuesrecord.has(numberstostringkeynotsymmetry(row, column));

    const obj = {
        row,
        column,
        clear: () => valuesrecord.clear(),
        has,
        size: () => valuesrecord.size,
        values,
        keys,
        entries,
        get,
        set,
        delete: (row: number, column: number) => {
            return valuesrecord.delete(
                numberstostringkeynotsymmetry(row, column)
            );
        },
        [Symbol.toStringTag]: "SparseTwoDimensionalMatrix",
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