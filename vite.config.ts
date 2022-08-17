import { babel } from "@rollup/plugin-babel";
import vuePlugin from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import ElementPlus from "unplugin-element-plus/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig, UserConfigExport } from "vite";
import vpchecker from "vite-plugin-checker";
import { createHtmlPlugin } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa";
//@ts-ignore
const checker = vpchecker.default;
// console.log(babel)
//@ts-ignore
export default defineConfig(({ mode, command }) => {
    // console.log(mode, command);
    const isdrop = mode === "production" && command === "build";
    const config: UserConfigExport = {
        worker: {
            plugins: [
                //@ts-ignore
                babel({
                    babelHelpers: "bundled",
                    exclude: [/node_modules/],
                    extensions: [".ts", ".js"],
                    plugins: [
                        [
                            "@babel/plugin-proposal-async-generator-functions",
                            // { allowAllFormats: true },
                        ],
                    ],
                }),
            ],
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
                // vueTsc: true,
                typescript: { root: path.resolve(__dirname) },
            }),
            // checker({ vueTsc: true }),

            ElementPlus({
                // options
            }),
            vuePlugin(),
            // mode === "production" &&
            //     command === "build" &&
            // isdrop &&
            babel({
                babelHelpers: "bundled",
                sourceMaps: mode !== "production",
                exclude: [/node_modules/],
                extensions: [".ts", ".js"],
                //@ts-ignore
                plugins: [
                    [
                        "babel-plugin-import",
                        {
                            libraryName: "lodash",
                            libraryDirectory: "",
                            camel2DashComponentName: false, // default: true
                        },
                    ],
                    isdrop && "babel-plugin-clean-code",
                    // "@babel/plugin-syntax-typescript",
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
            babel({
                babelHelpers: "bundled",
                exclude: [/node_modules/],
                extensions: [".ts", ".js"],
                plugins: [
                    [
                        "@babel/plugin-proposal-async-generator-functions",
                        // { allowAllFormats: true },
                    ],
                ],
            }),
            // getBabelOutputPlugin({ plugins: ["babel-plugin-clean-code"] }),
        ],
        build: {
            rollupOptions: {
                input: resolve(__dirname, "src", "index.html"),
                // output: { file: resolve(__dirname, "dist", "index.html") },
            },
            cssCodeSplit: false,
            minify: "esbuild",
            emptyOutDir: true,
            outDir: path.resolve(__dirname, "dist"),
            target: "es2018",
            // terserOptions: {
            //     compress: { drop_console: true, drop_debugger: true },
            // },
        },
    };
    return config;
});
import { resolve } from "path";
