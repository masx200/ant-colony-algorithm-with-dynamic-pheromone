export function assert_Integer(con: any, msg?: string): asserts con is number {
    try {
        if (typeof con !== "number") {
            throw Error("assert error number:" + con + msg);
        }
        if (Number.isNaN(con)) {
            throw Error("assert error number:" + con + msg);
        }

        BigInt(con);
    } catch (error) {
        throw Error("assert error integer:" + con + msg);
    }
}
