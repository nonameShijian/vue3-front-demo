import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
/**
 * 需要将对应包的package.json的import字段修改如下：
 * ```json
 * "import": {
 *   "types": "./dist/index.d.ts",
 *   "default": "./dist/index.mjs"
 * },
 * ```
 */
// @ts-expect-error 对应包的package.json的import不对
import eslintPlugin from 'vite-plugin-eslint';
import { fileURLToPath } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		port: 3000,
		//解决跨域
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8080/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						// 将 element-plus 单独分包
						if (id.includes('element-plus')) {
							return 'element-plus';
						}
						// 将 vue 生态相关库分包
						if (id.includes('vue') || id.includes('pinia') || id.includes('vue-router')) {
							return 'vue-vendor';
						}
						// 其他第三方库归为 vendor
						return 'vendor';
					}
				}
			}
		},
	}
});
