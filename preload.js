const { contextBridge, ipcRenderer } = require('electron');

// Udostępnienie funkcji do front-endu
contextBridge.exposeInMainWorld('electron', {
    getPlayers: () => ipcRenderer.invoke('get-players')  // Funkcja do wywołania komunikacji
});
