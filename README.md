# vue3-front-demo
一个vue + TypeScript + Vite的项目模板

包含了：
1. vue-router
2. axios
3. element-plus
4. pinia
5. electron (桌面应用支持)
6. cordova (移动应用支持)

## Electron 构建命令（Windows）

- `pnpm run build:electron` - 构建 Vue 应用并打包为 Electron 桌面应用

## Cordova 构建命令（Android）

- `pnpm run create:cordova` - 构建 Vue 应用并创建Cordova项目
- `pnpm run build:cordova` -  构建 Vue 应用并打包为 Android APK

> 注意：运行 Cordova 构建前需要先安装 Android SDK 、 Gradle 以及 cmdline-tools
