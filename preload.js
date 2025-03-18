const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openFileDialog: () => ipcRenderer.send('open-file-dialog'),
    onSelectedFolder: (callback) => ipcRenderer.on('selected-folder', (event, path) => callback(path)),
    saveScriptPath: (path) => ipcRenderer.send('save-script-path', path),
    onUpdateScriptPath: (callback) => ipcRenderer.on('update-script-path', (event, path) => callback(path))
});
