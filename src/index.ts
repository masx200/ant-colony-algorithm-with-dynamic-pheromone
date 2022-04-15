import "core-js/stable/array/at";
import { appcontainer } from "./appcontainer";
import { app } from "./main";
app.config.errorHandler = (e) => {
    alert(e);
    setTimeout(() => {
        throw e;
    });
};
app.mount(appcontainer);
!(async () => {
    if (process.env.NODE_ENV === "production") {
        const { registerSW } = await import("virtual:pwa-register");

        if (
            location.hostname !== "localhost" &&
            "127.0.0.1" !== location.hostname
        ) {
            "serviceWorker" in navigator &&
                (function () {
                    const updateSW = registerSW({
                        onNeedRefresh() {},
                        onOfflineReady() {},
                    });
                    updateSW(true).catch(() => {});
                })();
        }
    }
})();
