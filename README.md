# vue3-front-demo
一个vue + TypeScript + Vite的项目模板

包含了：
1. vue-router
2. axios
3. element-plus
4. pinia
5. electron (桌面应用支持)
6. capacitor (移动应用支持)

## Electron 构建命令（Windows）

- `pnpm run build:electron` - 构建 Vue 应用并打包为 Electron 桌面应用

## Capacitor 构建命令（Android）
- `pnpm run build:capacitor-android` - 构建 Vue 应用并创建安卓 Capacitor 项目
- `pnpm run sync-capacitor-android` - 构建 Vue 应用并同步到已创建的安卓 Capacitor 项目
- `pnpm run open-capacitor-android` - 使用 Android Studio 打开安卓 Capacitor 项目

> 注意：运行 Capacitor 构建前需要先安装 Android SDK 、 Gradle ，并且需要API 24或更高

如果需要在安卓 Capacitor 项目使用返回键来返回上一页，你需要对MainActivity进行如下改动：
```java
package com.example.app;

import android.os.Bundle;

import androidx.activity.OnBackPressedCallback;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private OnBackPressedCallback onBackPressedCallback;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 创建返回按钮回调
        onBackPressedCallback = new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                // 在这里处理返回按钮事件
                if (getBridge().getWebView().canGoBack()) {
                    getBridge().getWebView().goBack();
                }
                else {
                    finish();
                }
            }
        };

        // 注册回调
        getOnBackPressedDispatcher().addCallback(this, onBackPressedCallback);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        // 移除回调（可选，Activity 销毁时会自动清理）
        onBackPressedCallback.remove();
    }
}

```