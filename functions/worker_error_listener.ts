export const worker_error_listener = (e: ErrorEvent): never => {
    alert?.(
        [String(e), String(e.type), e.message, String(e.error?.stack)].join(",")
    );
    throw e;
};
