// Preload script runs in a context that has access to Node.js APIs
// This file is loaded before the renderer process loads

const { contextBridge } = require('electron');

// Example: Expose a simple API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  versions: {
    ...process.versions
  }
});
