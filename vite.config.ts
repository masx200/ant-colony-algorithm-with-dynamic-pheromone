import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import ElementPlus from "unplugin-element-plus/vite";
import path from "path";
import vpchecker from "vite-plugin-checker";
import vuePlugin from "@vitejs/plugin-vue";
import { babel } from "@rollup/plugin-babel";
import { createHtmlPlugin } from "vite-plugin-html";
import { defineConfig, PluginOption, UserConfig } from "vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";

const checker = vpchecker;

export default defineConfig(({ mode, command }): UserConfig => {
    const isdrop = mode === "production" && command === "build";
    const config: UserConfig = {
        worker: {
            plugins: [
                babel({
                    babelHelpers: "bundled",
                    exclude: [/node_modules/],
                    extensions: [".ts", ".js"],
                    plugins: [
                        ["@babel/plugin-proposal-async-generator-functions"],
                    ],
                }),
            ] as PluginOption[],
        },
        esbuild: {
            legalComments: "none",
            drop: isdrop ? ["console", "debugger"] : undefined,
        },
        root:
            mode === "test"
                ? path.resolve(__dirname)
                : path.resolve(__dirname, "src"),
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            checker({
                typescript: { root: path.resolve(__dirname) },
            }),

            ElementPlus({}),
            vuePlugin(),

            babel({
                babelHelpers: "bundled",
                sourceMaps: mode !== "production",
                exclude: [/node_modules/],
                extensions: [".ts", ".js"],

                plugins: [
                    "@babel/plugin-proposal-async-generator-functions",
                    [
                        "babel-plugin-import",
                        {
                            libraryName: "lodash",
                            libraryDirectory: "",
                            camel2DashComponentName: false,
                        },
                    ],
                    isdrop && "babel-plugin-clean-code",
                ].filter(Boolean),
            }),
            createHtmlPlugin({
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeAttributeQuotes: false,
                },
            }),
            VitePWA({
                registerType: "autoUpdate",
                workbox: { globPatterns: ["*/*"] },
            }),
        ],
        build: {
            rollupOptions: {
                input: resolve(__dirname, "src", "index.html"),
            },
            cssCodeSplit: false,
            minify: "esbuild",
            emptyOutDir: true,
            outDir: path.resolve(__dirname, "dist"),
            target: "es2018",
        },
    };
    return config;
});
