import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'vue3-front-demo',
  webDir: 'dist',
  android: {
    path: 'capacitor/android',
    allowMixedContent: true,
    webContentsDebuggingEnabled: true,
    minWebViewVersion: 60,
    minHuaweiWebViewVersion: 10,
    buildOptions: {
      releaseType: 'APK',
    },
  },
  ios: {
    path: 'capacitor/ios',
  },
  server: {
    cleartext: true,
    errorPath: '/error.html',
  },
};

export default config;
