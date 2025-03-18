const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const electronDebug = require('electron-debug') // 引入调试工具

// 配置 electron-debug（可选参数）
electronDebug = electronDebug({
  showDevTools: true,      // 自动为所有窗口打开 DevTools
  devToolsMode: 'undocked',// 'right'|'bottom'|'undocked'|'detach'
  isEnabled: true          // 是否启用调试功能
})

let mainWindow;
let settingsWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.webContents.openDevTools();

    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: 'Settings',
                    click: () => {
                        openSettingsWindow();
                    }
                },
                { type: 'separator' },
                { role: 'quit' }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);
});

function openSettingsWindow() {
    if (settingsWindow) {
        settingsWindow.focus();
        return;
    }

    settingsWindow = new BrowserWindow({
        width: 400,
        height: 300,
        parent: mainWindow,
        modal: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    settingsWindow.loadFile('settings.html');

    settingsWindow.on('closed', () => {
        settingsWindow = null;
    });
}

// 监听 "open-file-dialog" 事件
ipcMain.on('open-file-dialog', (event) => {
    dialog.showOpenDialog(settingsWindow, {
        properties: ['openDirectory'] // 允许选择文件夹
    }).then(result => {
        if (!result.canceled && result.filePaths.length > 0) {
            event.reply('selected-folder', result.filePaths[0]);
        }
    }).catch(err => {
        console.error('Error selecting folder:', err);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
