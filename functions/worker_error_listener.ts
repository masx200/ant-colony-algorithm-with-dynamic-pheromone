export const worker_error_listener = (e: ErrorEvent): never => {
    typeof alert === "function" &&
        alert?.(
            [String(e), String(e.type), e.message, String(e.error?.stack)].join(
                "\n"
            )
        );
    throw e;
};
