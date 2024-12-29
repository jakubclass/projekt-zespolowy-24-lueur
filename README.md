# 🌐 **Platforma Społecznościowa**

> Kompleksowa platforma społecznościowa oparta na Express.js i React. Obsługuje zaawansowane funkcje użytkowników, grup, postów i powiadomień.

---

## 📦 **Funkcje projektu**

### 🔒 **Backend**:
- **Sesje i autoryzacja**: Obsługa JWT i cookie-parser.
- **Baza danych**: MongoDB z Mongoose.
- **REST API**: Ponad 27 tras z metodami **POST**, **GET**, **DELETE** i więcej.
- **Zabezpieczenia**: Middleware uniemożliwiający nieautoryzowany dostęp.
- **Hasła**: Przechowywane w postaci zaszyfrowanej dla większego bezpieczeństwa.

### 🎨 **Frontend**:
- **Routing i nawigacja**: Dynamiczne przekierowania i ochrona dostępu.
- **React-Query**: Efektywne zarządzanie stanem aplikacji i cache'owanie danych.
- **Interfejs użytkownika**: Wygodna obsługa, responsywność i system ładowania.

---

## ⚙️ **Instalacja**

Aby rozpocząć korzystanie z projektu, wykonaj następujące kroki:

1. **Zainstaluj zależności backendu**  
   ```bash
   npm i
   ```
2. **Zainstaluj zależności frontendu**
   ```bash
   cd frontend
   npm i
   ```
3. Zbuduj cały projekt
  ```bash
   npm run build
   ```

### 🚀 **Uruchamianie projektu**:

1. **Uruchomienie backendu**
```bash
   npm run dev
```
2. **Uruchomienie frontendu**
```bash
   cd frontend
   npm run dev
```

### 🛠️ **Funkcjonalności użytkownika**:
🧑‍💻 **Profil użytkownika:**
- Wyświetlanie zdjęcia profilowego, tła, bio, linków i innych informacji.
- Edytowanie danych użytkownika, w tym zmiana zdjęć profilowych.
- Informacje o liczbie postów, subskrypcjach i polubieniach.
  
📝 **Posty:**
- Tworzenie: Posty mogą zawierać tekst, zdjęcia lub oba elementy.
- Interakcje: Możliwość polubienia, komentowania i udostępniania.
- Zarządzanie: Usuwanie postów przez autorów.

🏘️ **Grupy (Communities):**
- Przegląd: Wyświetlanie dostępnych grup i ich administratorów.
- Tworzenie: Możliwość założenia własnej grupy i zarządzania nią.
- Administratorzy: Dodawanie i usuwanie administratorów grup.
  
🔔 **Powiadomienia:**
1) Rodzaje powiadomień:
- Polubienia postów.
- Nowi subskrybenci.
- Udostępnienia postów.
- Nowe posty użytkownika.

2) Oznaczenia: Powiadomienia jako "nieprzeczytane" lub "przeczytane".

### 🗂️ **Struktura bazy danych**
1) **Users**
 - _id (primary key)
 - username
 - fullname
 - password
 - email
 - followers (foreign key)
 - following (foreign key)
 - profileImg
 - coverImg
 - bio
 - link
 - likedPosts(foreign key)
2) **Posts**
 - _id (primary key)
 - likes (foreign key)
 - comments (foreign ket)
 - text
 - user (foreign key)
 - img

3) **Notifications**
 - _id (primary key)
 - read 
 - from (foreign key)
 - to (foreign key)
 - type
 - target (foreign key)

4) **Communities**
 - _id (primary key)
 - location
 - headqurters
 - companySize
 - type
 - industry
 - followers (foreign key)
 - admins (foreign key)
 - coverImg
 - profileImg

### ❗ **Obsługa błędów**
- Wszystkie błędy są obsługiwane zarówno po stronie frontendowej, jak i backendowej.
- Mechanizm blokowania przycisków uniemożliwia wielokrotne wysyłanie zapytań.


[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=17521716&assignment_repo_type=AssignmentRepo)
