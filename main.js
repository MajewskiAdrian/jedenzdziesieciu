const { app, BrowserWindow, ipcMain } = require('electron');
const sqlite3 = require('better-sqlite3');  // Nie używamy .verbose()
const mysql = require('mysql2/promise'); // TEMP!!!
const path = require('path');

// Tworzymy okno aplikacji
let win;

// MYSQL - POCZĄTEK 
/*
// Tworzenie puli połączeń do MySQL
const pool = mysql.createPool({
    host: 'localhost',   // Adres serwera MySQL
    user: 'root',        // Domyślny użytkownik XAMPP
    password: '',        // Domyślnie w XAMPP brak hasła
    database: 'jedenzdziesieciu', // Zmień na swoją bazę danych
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Funkcja do pobierania danych graczy - MySQL
async function getPlayers() {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM players');
        return rows;
    } finally {
        connection.release(); // Zwolnienie połączenia
    }
}

// Obsługa IPC dla pobierania graczy - MySQL
ipcMain.handle('get-players', async () => {
    return await getPlayers();
});
// MYSQL - KONIEC
*/
// SQLITE - POCZĄTEK
///*
// Odbieramy zapytanie z frontendu (odczyt danych z bazy) - w SQLite
ipcMain.handle('get-players', () => {
    const db = new sqlite3('jedenzdziesieciu.db');  // Łączenie z bazą danych

    // Zapytanie do bazy danych, aby pobrać wszystkich użytkowników
    const rows = db.prepare('SELECT * FROM players').all();  // Używamy metody .prepare().all() dla lepszej wydajności
    return rows;  // Zwracamy dane użytkowników
});
// SQLITE - KONIEC
//*/

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,  // Pozwala na używanie Node.js w frontendzie
            preload: path.join(__dirname, 'preload.js')  // Plik preload (używany do komunikacji z frontendem)
        }
    });

    win.loadFile('index.html');  // Ładujemy nasz frontend (HTML)
}


// Kiedy aplikacja jest gotowa
app.whenReady().then(createWindow);

// Obsługa zamykania aplikacji
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});



