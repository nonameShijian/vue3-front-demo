import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

/** @type {import('eslint').Linter.Config[]} */
// @ts-expect-error This is a workaround for a known issue with TypeScript and ESLint.
export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { 
      parser: vueParser,
      parserOptions: { 
        parser: tseslint.parser,
        ecmaVersion: 2020,
        sourceType: "module",
      } 
    },
  },
  {
    // 配置规则
    rules: {
    }
  },
  {
    // Electron 文件使用 Node.js 环境
    files: ["electron/**/*.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly"
      }
    },
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off"
    }
  }
];
