# Aplikacja przeznaczona do zarządzania grą "1 z 10".

## Funkcjonalności

**Panel edycji uczestników**:
możliwosć edycji ilości punktów i szans uczestników.
**Dodawanie pytań**:
implementacja pytań do bazy danych przez plik xml.
**Łatwy w użytkowaniu interfejs**:
obsługa poprawności odpowiedzi.
**Wysyłanie danych poprzez websocket**.

## Technologie

- **Electron**
- **node.js**
- **Baza MySQL**
- **Websocket**

## Instalacja aplikacji

Aby uruchomić aplikację, wykonaj poniższe kroki.

### 🔧 Kroki instalacji

1. **Zaimportuj bazę danych**
   - Zaimportuj plik `1z10.sql` do bazy danych MySQL o nazwie **`1z10`**.

2. **Pobierz i zainstaluj Node.js**
   - Przejdź na stronę [Node.js](https://nodejs.org/en) i pobierz najnowszą wersję LTS.
   - Zainstaluj Node.js na swoim komputerze.

3. **Sklonuj repozytorium**
   - Sklonuj repozytorium na swoje urządzenie za pomocą poniższej komendy:
     git clone https://github.com/MajewskiAdrian/jedenzdziesieciu.git

4. **Zainstaluj zależności**
   - Przejdź do katalogu projektu:
     cd C:\xampp\htdocs\jedenzdziesieciu
   
   - Zainstaluj **Electron** globalnie:
     npm install -g electron
   
   - Zainstaluj **mysql2** (moduł do łączenia z bazą MySQL):
     npm install mysql2

   - Zainstaluj **ws** (moduł WebSocket):
     npm install ws

5. **Uruchom aplikację**
   - Po zainstalowaniu zależności uruchom aplikację Electron:
     npm start

## Wymagania 

   - **node.js**
   - **xampp**
   - **electron**
