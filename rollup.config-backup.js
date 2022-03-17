import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import resolve from "@rollup/plugin-node-resolve";

const name = require("./package.json").main.replace(/\.js$/, "");

const bundle = (config) => ({
    ...config,
    input: "src/index.ts",
    external: (id) => !/^[./]/.test(id),
});

export default [
    bundle({
        plugins: [resolve(), esbuild()],
        output: [
            {
                file: `${name}.js`,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: `${name}.mjs`,
                format: "es",
                sourcemap: true,
            },
        ],
    }),
    bundle({
        plugins: [resolve(), dts()],
        output: {
            file: `${name}.d.ts`,
            format: "es",
        },
    }),
];
