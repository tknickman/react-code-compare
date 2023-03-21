import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/**/*.ts", "src/**/*.tsx"],
  format: ["cjs"],
  dts: true,
  minify: false,
  clean: true,
  external: ["react"],
  ...options,
}));
