/**
 * @file ESLint 扁平化配置，覆盖 Vue / JS / TS 文件的代码规范
 */
import js from '@eslint/js'                         // JS 推荐规则
import vuePlugin from 'eslint-plugin-vue'           // Vue 专用规则
import vueParser from 'vue-eslint-parser'            // Vue 文件解析器
import tsParser from '@typescript-eslint/parser'      // TS 解析器
import prettierPlugin from 'eslint-plugin-prettier'   // Prettier 集成
import vuePrettierConfig from '@vue/eslint-config-prettier'  // Vue Prettier 预设

export default [
  // 忽略文件
  {
    ignores: ['dist/**', 'dist-ssr/**', 'coverage/**', 'node_modules/**'],
  },

  // Vue 文件
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
      },
    },
    plugins: {
      vue: vuePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...vuePlugin.configs['flat/essential'].rules,
      ...vuePrettierConfig.rules,
    },
  },

  // JS / TS 文件
  {
    files: ['**/*.js', '**/*.ts'],
    ...js.configs.recommended,
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...vuePrettierConfig.rules,
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
]
