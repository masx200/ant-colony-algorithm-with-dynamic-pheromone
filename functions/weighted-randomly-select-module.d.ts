declare module "weighted-randomly-select" {
    function select<T>(options: Array<{ result: T; chance: number }>): T;
    const selectWithoutValidation: typeof select;
    export { select, selectWithoutValidation };
}
