const { app, BrowserWindow, ipcMain } = require('electron');
const sqlite3 = require('better-sqlite3');
const mysql = require('mysql2/promise'); 
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

// Aktualizacja bazy - zmiana punktów - SQLite
ipcMain.handle('add-points', (event, playerId, points) => {
    const db = new sqlite3('jedenzdziesieciu.db');  // Łączenie z bazą danych
    return new Promise((resolve, reject) => {
        const query = 'UPDATE players SET score = score + ? WHERE id = ?';
        
        try {
            const stmt = db.prepare(query);  // Przygotowujemy zapytanie
            const result = stmt.run(points, playerId);  // Uruchamiamy zapytanie

            if (result.changes > 0) {
                resolve(true);  // Jeśli zmieniono rekordy, zwracamy sukces
            } else {
                reject('Brak gracza o tym ID lub brak zmian.');
            }
        } catch (err) {
            reject(err);  // Zwracamy błąd, jeśli wystąpił problem
        }
    });
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



