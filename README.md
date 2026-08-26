# HTL Multi-Tool

> Ein zentrales Tool für Organisation, Lernen, Navigation, Programmieren und den alltäglichen Schulbetrieb eines HTL-Schülers.

## Aktueller Entwicklungsstand

Die aktuelle Version `0.3.1` enthält eine modulare NestJS-API und ein Angular-Frontend.
Die User-Verwaltung ist durch JWT-Authentifizierung geschützt. Registrierung und
Login sind öffentlich erreichbar; alle weiteren User-Aktionen benötigen einen
Bearer-Token.

### Backend starten

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

Die Datenbanktabellen werden mit
`backend/src/db/migrations/001_create_users.sql` angelegt.

### Frontend starten

```bash
cd frontend
npm install
npm start
```

Die Frontend-API-Adresse wird in `frontend/src/app/core/app-config.ts` gesetzt.

### Aktuelle API

| Methode | Endpunkt | Authentifizierung |
| --- | --- | --- |
| POST | `/api/auth/login` | Nein |
| POST | `/api/user` | Nein |
| GET | `/api/user` | Bearer-Token |
| GET | `/api/user/:id` | Bearer-Token |
| PATCH | `/api/user/:id` | Bearer-Token |
| DELETE | `/api/user/:id` | Bearer-Token |
| GET | `/api/health` | Nein |

Nach einem erfolgreichen Login wird der JWT als `access_token` gespeichert und
automatisch an geschützte API-Anfragen angehängt. Ein ungültiger oder abgelaufener
Token beendet die lokale Session und leitet zum Login zurück.

Swagger ist unter `http://localhost:3000/api/docs` verfügbar.

## 1. Projektidee

Das **HTL Multi-Tool** soll eine Webanwendung werden, welche mehrere Funktionen kombiniert, die Schüler im täglichen Schulalltag benötigen.

Anstatt Stundenplan, Aufgaben, Notizen, Rechner, Code-Snippets und Termine über mehrere Apps zu verteilen, sollen wichtige Werkzeuge in einer Anwendung gesammelt werden.

Das Projekt soll modular aufgebaut werden, sodass später problemlos weitere Tools ergänzt werden können.

---

# 2. Name

## Namensideen

### HTL Hub

Kurz, verständlich und beschreibt ziemlich genau, was das Projekt sein soll:

> Ein zentraler Hub für den gesamten HTL-Alltag.

### HTL Toolkit

Etwas technischer und passend zu einem Multi-Tool-Projekt.

### SchoolOS

Die Anwendung verhält sich quasi wie ein kleines Betriebssystem für die Schule.

Module könnten beispielsweise wie Programme dargestellt werden:

* Calendar
* Tasks
* Grades
* Notes
* Calculator
* Code Tools
* Files
* Wayfinder

### StudentOS

Nicht nur auf HTLs beschränkt und dadurch später leichter erweiterbar.

### EduDesk

Ein digitaler Arbeitsplatz für Schüler.

### HTLify

Moderner Name mit eindeutigem HTL-Bezug.

### HTL Companion

Ein digitaler Begleiter für den Schulalltag.

### StudyForge

Besonders passend für eine technische Schule.

`Forge` steht dabei sinngemäß für eine Werkstatt, in der Projekte, Wissen und Aufgaben entstehen.

---

## Favoriten

1. **HTL Hub**
2. **SchoolOS**
3. **StudyForge**
4. **HTL Toolkit**
5. **StudentOS**

Für das Projekt würde sich **HTL Hub** besonders anbieten, da der Name kurz ist und sofort erklärt, worum es geht.

---

# 3. Funktionen

Die Anwendung sollte aus mehreren voneinander getrennten **Modulen** bestehen.

Dadurch können einzelne Funktionen unabhängig entwickelt und später erweitert werden.

---

# Dashboard

Das Dashboard ist die Startseite des Programms.

Es zeigt eine kompakte Übersicht über die wichtigsten Informationen.

Beispielsweise:

* nächste Unterrichtsstunde
* Raum der nächsten Unterrichtsstunde
* heutiger Stundenplan
* offene Aufgaben
* bald fällige Abgaben
* nächste Tests
* nächste Schularbeiten
* aktuelle Noten
* persönliche Notizen
* Schnellzugriffe auf häufig verwendete Tools

Optional könnte man Widgets selbst anordnen.

Eine direkte Verknüpfung mit **Wayfinder** wäre ebenfalls sinnvoll:

```text
Nächste Stunde:
INSY

Raum:
C301

[Raum finden]
```

---

# Stundenplan

Digitaler Stundenplan mit:

* Montag bis Freitag
* Fach
* Lehrer
* Raum
* Beginn
* Ende
* Pausen
* Ersatzstunden
* Freistunden

Zusätzlich:

* aktuelle Stunde hervorheben
* nächste Stunde anzeigen
* Tagesansicht
* Wochenansicht
* Raum direkt in Wayfinder öffnen

Beispiel:

```text
08:00 - 08:50 | Mathematik | B204
08:55 - 09:45 | Deutsch    | A103
09:55 - 10:45 | INSY       | C301
```

---

# Wayfinder

**Wayfinder** ist eine interaktive Karte der Schule.

Das Tool soll Schülern dabei helfen, Räume, Klassen, Labore und andere wichtige Orte innerhalb der HTL schnell zu finden.

Besonders für neue Schüler, Schüler aus anderen Abteilungen oder bei Raumänderungen kann die Orientierung in einem größeren Schulgebäude unnötig kompliziert werden.

Wayfinder soll dieses Problem lösen.

## Grundfunktionen

Der Benutzer kann nach einem Raum suchen:

```text
C301
```

Wayfinder zeigt anschließend:

* Gebäude
* Stockwerk
* Raumposition
* aktuellen Standort beziehungsweise gewählten Startpunkt
* möglichen Weg zum Raum

Beispiel:

```text
Ziel:
C301

Gebäude:
C

Stockwerk:
3. Stock

Route:

Haupteingang
    ↓
Stiege C
    ↓
3. Stock
    ↓
Gang rechts
    ↓
C301
```

---

## Interaktive Karte

Die Schule wird grafisch als Karte dargestellt.

Der Benutzer kann:

* Gebäude auswählen
* Stockwerke wechseln
* Karte verschieben
* Karte vergrößern und verkleinern
* Räume anklicken
* Räume suchen
* Start- und Zielpunkt auswählen

Mögliche Struktur:

```text
HTL

├── Gebäude A
│   ├── Erdgeschoss
│   ├── 1. Stock
│   └── 2. Stock
│
├── Gebäude B
│   ├── Erdgeschoss
│   ├── 1. Stock
│   └── 2. Stock
│
└── Gebäude C
    ├── Erdgeschoss
    ├── 1. Stock
    ├── 2. Stock
    └── 3. Stock
```

---

## Raumsuche

Über eine Suchleiste können Räume gesucht werden.

Beispiel:

```text
> C301
```

Ergebnis:

```text
C301
Netzwerklabor

Gebäude C
3. Stock

[Auf Karte anzeigen]
[Route starten]
```

Die Suche könnte auch nach Raumnamen funktionieren:

```text
> Netzwerklabor
```

oder:

```text
> Chemielabor
```

---

## Raumtypen

Wayfinder könnte verschiedene Orte kategorisieren:

* Klassenräume
* EDV-Säle
* Labore
* Werkstätten
* Lehrerzimmer
* Sekretariat
* Direktion
* Bibliothek
* Turnsaal
* Buffet
* Toiletten
* Garderoben
* Aufenthaltsbereiche
* Erste-Hilfe-Stellen
* Ein- und Ausgänge

---

## Routing

Später könnte Wayfinder einen echten kürzesten Weg innerhalb der Schule berechnen.

Dafür könnte die Schule intern als Graph gespeichert werden.

Beispiel:

```text
Node:
C301

Connections:
C302
C-Stair-3
C-Hallway-3
```

Der Weg könnte anschließend beispielsweise mit:

```text
Dijkstra
```

oder:

```text
A*
```

berechnet werden.

Damit wäre Wayfinder nicht einfach nur eine Karte, sondern gleichzeitig ein interessantes Informatik-Projekt.

---

## Barrierefreie Navigation

Eine Erweiterung könnte alternative Wege anzeigen.

Beispielsweise:

```text
Treppen vermeiden
```

Wayfinder verwendet dann:

* Aufzüge
* barrierefreie Eingänge
* geeignete Übergänge zwischen Gebäuden

Das könnte auch für verletzte Schüler oder Personen mit eingeschränkter Mobilität hilfreich sein.

---

## Verbindung mit dem Stundenplan

Wayfinder soll direkt mit dem Stundenplan verbunden sein.

Beispiel:

```text
10:50

Nächste Stunde:
NWT

Raum:
B214

Beginn:
10:55

[Route anzeigen]
```

Dadurch muss der Schüler den Raum nicht einmal manuell suchen.

---

## Raumdetails

Beim Anklicken eines Raums könnten zusätzliche Informationen angezeigt werden.

Beispielsweise:

```text
C301

Typ:
EDV-Saal

Abteilung:
Informatik

Stockwerk:
3

Gebäude:
C

Ausstattung:
- PCs
- Beamer
- Netzwerk-Laborequipment
```

---

## Mögliche technische Umsetzung

Die einzelnen Stockwerke könnten beispielsweise als:

* SVG
* Canvas
* eigene Karten-Datenstruktur

gespeichert werden.

SVG wäre besonders interessant, da einzelne Räume direkt als Elemente definiert werden können.

Beispiel:

```html
<svg>
    <rect id="C301"></rect>
    <rect id="C302"></rect>
    <rect id="C303"></rect>
</svg>
```

Angular könnte anschließend auf einzelne Räume reagieren.

---

# Aufgaben / To-do-System

Aufgaben können mit folgenden Informationen gespeichert werden:

* Titel
* Beschreibung
* Fach
* Deadline
* Priorität
* Status
* geschätzte Arbeitszeit

Status:

```text
TODO
IN_PROGRESS
DONE
```

Priorität:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

Zusätzliche Funktionen:

* Aufgaben nach Fach filtern
* Aufgaben nach Deadline sortieren
* überfällige Aufgaben markieren
* Erinnerungen
* wiederkehrende Aufgaben
* Unteraufgaben

---

# Notizen

Ein integriertes Notizsystem.

Features:

* Markdown-Unterstützung
* Ordner
* Tags
* Volltextsuche
* Favoriten
* Codeblöcke
* Tabellen
* Links

---

# Noten-Tracker

Notenverwaltung für jedes Fach.

Gespeichert werden können:

* Fach
* Note
* Art
* Datum
* Gewichtung

Arten:

* Test
* Schularbeit
* Mitarbeit
* Referat
* Labor
* Hausübung

Die Anwendung könnte automatisch berechnen:

* Durchschnitt pro Fach
* Gesamtdurchschnitt
* gewichteten Durchschnitt
* benötigte Note für einen gewünschten Schnitt

---

# Rechner

Ein Bereich mit mehreren Rechnern.

## Standard-Rechner

* Grundrechenarten
* Potenzen
* Wurzeln
* Prozentrechnung

## Wissenschaftlicher Rechner

* Sinus
* Cosinus
* Tangens
* Logarithmen
* Exponentialfunktionen

---

# Zahlensystem-Konverter

Für Informatik besonders praktisch.

Umrechnung zwischen:

* Binär
* Dezimal
* Hexadezimal
* Oktal

---

# Netzwerk-Rechner

Für Netzwerktechnik und Informatik.

Funktionen:

* IPv4 Subnet Calculator
* CIDR Rechner
* Netzwerkadresse
* Broadcastadresse
* Hostbereich
* Anzahl Hosts
* Binärdarstellung einer IP

---

# Hash Tool

Unterstützte Hashes könnten sein:

* SHA-256
* SHA-512
* MD5

Zusätzlich:

* String → Hash
* Datei → Hash
* Hashes vergleichen

---

# Passwortgenerator

Optionen:

* Passwortlänge
* Großbuchstaben
* Kleinbuchstaben
* Zahlen
* Sonderzeichen
* Passwortstärke
* Passphrase Generator

---

# Developer Tools

Da das Projekt speziell für HTL-Schüler gedacht ist, sollte dieser Bereich umfangreicher sein als bei einem normalen Schulplaner.

## JSON Formatter

Funktionen:

* JSON formatieren
* JSON validieren
* Fehler anzeigen
* JSON minimieren

## Base64 Encoder / Decoder

Texte können in Base64 umgewandelt und wieder decodiert werden.

## URL Encoder / Decoder

Umwandlung von URLs und Query-Parametern.

## Regex Tester

Features:

* Regex eingeben
* Teststring eingeben
* Matches hervorheben
* Gruppen anzeigen

## Code Snippets

Persönliche Sammlung häufig verwendeter Codes.

Beispielsweise:

```text
Java
├── File Reader
├── HTTP Request
└── Sorting

TypeScript
├── Fetch
├── Interfaces
└── Array Helpers

Python
├── File Handling
├── JSON
└── Flask
```

---

# SQL Playground

Ein kleiner Bereich zum Üben von SQL.

Beispielsweise mit einer isolierten SQLite-Datenbank.

Unterstützt:

```sql
SELECT
INSERT
UPDATE
DELETE
CREATE TABLE
```

---

# Lernmodus

Ein Lernsystem innerhalb der Anwendung.

Features:

* Karteikarten
* Fragen und Antworten
* Multiple Choice
* zufällige Fragen
* Lernfortschritt

---

# Flashcards

Eigene Karteikarten-Sets.

Optional könnte später **Spaced Repetition** eingebaut werden.

---

# Pomodoro Timer

Lern-Timer:

```text
25 Minuten Lernen
5 Minuten Pause

×4

30 Minuten große Pause
```

Statistiken könnten gespeichert werden:

* Lernzeit heute
* Lernzeit diese Woche
* Lernzeit pro Fach

---

# Prüfungsplaner

Tests und Schularbeiten verwalten.

Informationen:

* Fach
* Datum
* Prüfungsart
* Themen
* Lernfortschritt

---

# Dateiablage

Kleine Dateiablage für Schulmaterialien.

Beispiel:

```text
3AHIF
│
├── Mathematik
│   ├── Übungen
│   └── Formelsammlung
│
├── INSY
│   ├── SQL
│   └── Backend
│
└── NW2
    ├── Cisco
    └── Subnetting
```

---

# Link Manager

Links speichern und kategorisieren.

Beispiele:

* Moodle
* WebUntis
* GitHub
* Microsoft Teams
* Schulhomepage
* Dokumentationen
* Stack Overflow
* MDN
* Angular Docs

---

# Clipboard / Quick Notes

Ein temporärer Bereich für Inhalte, die kurzfristig benötigt werden.

Beispielsweise:

```text
192.168.10.34

sudo systemctl restart nginx

SELECT * FROM users;
```

---

# Random Picker

Praktisch für:

* zufällige Schüler auswählen
* Gruppen bilden
* Themen verteilen
* Reihenfolge bestimmen

---

# Gruppen-Generator

Eine Liste von Schülern kann automatisch in Gruppen aufgeteilt werden.

Optional:

* bestimmte Personen nicht gemeinsam einteilen
* gespeicherte Klassenlisten
* zufällige Gruppen
* ausgeglichene Gruppengrößen

---

# Anwesenheits-Tracker

Persönliche Übersicht:

* Fehlstunden
* entschuldigt
* unentschuldigt
* Verspätungen

---

# Kalender

Neben dem Stundenplan ein normaler Kalender für:

* Tests
* Schularbeiten
* Projekte
* Abgaben
* private Termine

Ansichten:

* Tag
* Woche
* Monat

---

# Projekt-Tracker

Verwaltung eigener Schul- und Softwareprojekte.

Features:

* Projektname
* Beschreibung
* Deadline
* Team
* Aufgaben
* GitHub Repository
* Projektstatus
* Fortschritt

---

# GitHub Integration

Über die GitHub API könnten eingebunden werden:

* eigene Repositories
* letzte Commits
* offene Issues
* Pull Requests
* Repository-Links

---

# Benachrichtigungen

Beispielsweise:

```text
Mathematik-Abgabe morgen

NW2 Test in 3 Tagen

INSY Projekt seit 2 Tagen überfällig
```

---

# Globale Suche

Eine Suchleiste durchsucht:

* Aufgaben
* Notizen
* Dateien
* Links
* Projekte
* Code Snippets
* Lernkarten
* Räume

Beispielsweise öffnet:

```text
Ctrl + K
```

eine globale Command Palette.

Auch Wayfinder könnte integriert werden:

```text
> C301
```

```text
Raum C301 gefunden
[In Wayfinder öffnen]
```

---

# Command Palette

Ähnlich wie in VS Code.

```text
> New Task
> Open Calculator
> Find Room C301
> Search Notes
> Start Pomodoro
> Open Timetable
> Add Exam
```

---

# Personalisierung

Einstellungen für:

* Dark Mode
* Light Mode
* Theme
* Dashboard Widgets
* Standardseite
* Sprache

---

# 4. Frontend / Backend

## Empfohlener Stack

### Frontend

**Angular + TypeScript**

Warum:

* stark strukturierte Architektur
* Components
* Services
* Routing
* Dependency Injection
* Reactive Forms
* ideal für größere Anwendungen
* TypeScript
* gut für modulare Anwendungen geeignet

Zusätzlich:

```text
Angular
TypeScript
Tailwind CSS
PrimeNG
```

### UI

**Tailwind CSS**

für:

* Layout
* Spacing
* Responsive Design
* schnelle Anpassungen

und **PrimeNG** für komplexere Komponenten:

* Tabellen
* Dialoge
* Dropdowns
* DatePicker
* Charts
* Menüs
* Toast Notifications

---

# Backend

## Empfehlung

**NestJS + TypeScript**

NestJS passt sehr gut zu Angular, da die Architektur ähnlich aufgebaut ist.

Beispiel:

```text
Controller
Service
Module
DTO
Guard
Interceptor
```

Stack:

```text
NestJS
TypeScript
REST API
Session Authentication
```

---

## Alternative

Das Backend könnte auch mit:

```text
Spring Boot + Java
```

entwickelt werden.

Java wird in vielen HTLs eingesetzt und eignet sich gut für größere Backend-Projekte.

---

# Empfohlene Architektur

```text
Angular Frontend
       │
       │ REST API
       ▼
NestJS Backend
       │
       ▼
PostgreSQL
```

Erweitert:

```text
                Angular
                   │
                REST API
                   │
                 NestJS
                   │
      ┌────────────┼────────────┐
      │            │            │
      ▼            ▼            ▼

PostgreSQL       Redis       GitHub API
      │
      ▼
 Wayfinder Data
```

---

# 5. Datenbank

## Empfehlung

### PostgreSQL

PostgreSQL eignet sich besonders gut für das Projekt.

Vorteile:

* Open Source
* relational
* sehr zuverlässig
* komplexe Queries möglich
* gute Performance
* JSON-Unterstützung
* einfach mit NestJS verwendbar

---

# ORM

Empfohlen:

## Prisma

Beispiel:

```prisma
model User {
  id       Int     @id @default(autoincrement())
  username String  @unique
  email    String  @unique
}
```

Alternative:

```text
TypeORM
```

---

# Mögliche Datenbanktabellen

```text
users

subjects

teachers

rooms

buildings

floors

wayfinder_nodes

wayfinder_edges

room_categories

lessons

timetables

tasks

exams

grades

notes

flashcards

flashcard_sets

projects

project_tasks

links

files

snippets

pomodoro_sessions

settings
```

---

# Wayfinder Datenmodell

Für Wayfinder wären zusätzliche Tabellen notwendig.

## buildings

```text
id
name
description
```

## floors

```text
id
building_id
floor_number
map_data
```

## rooms

```text
id
building_id
floor_id
room_number
name
type
x_position
y_position
```

## wayfinder_nodes

Repräsentiert Punkte, über die navigiert werden kann.

Beispielsweise:

* Kreuzungen
* Türen
* Stiegen
* Aufzüge
* Gänge

```text
id
floor_id
x
y
type
```

## wayfinder_edges

Verbindet zwei Nodes.

```text
id
from_node
to_node
distance
accessible
```

Dadurch kann das Backend automatisch einen Weg berechnen.

---

# Modulsystem

Das Projekt sollte modular aufgebaut werden.

```text
modules/
│
├── dashboard
├── timetable
├── tasks
├── grades
├── notes
├── exams
├── wayfinder
├── learning
├── calculator
├── network-tools
├── developer-tools
├── projects
├── links
└── settings
```

---

# Benutzer-System

Das Projekt sollte Accounts unterstützen.

Features:

* Registrierung
* Login
* Logout
* Passwort ändern
* Passwort vergessen
* Sessions
* persönliche Daten

Jeder Benutzer besitzt seine eigenen:

* Aufgaben
* Notizen
* Noten
* Stundenpläne
* Projekte
* Einstellungen

Wayfinder selbst verwendet dagegen hauptsächlich schulweit gemeinsame Daten.

---

# Authentication

Empfohlen:

```text
Session Authentication
```

oder alternativ:

```text
JWT Authentication
```

Für eine normale Web-App wären HTTP-only Cookies mit serverseitiger Session-Verwaltung eine saubere Lösung.

Passwörter werden nicht direkt gespeichert, sondern beispielsweise mit:

```text
Argon2
```

oder:

```text
bcrypt
```

gehasht.

---

# Responsive Design

Das Programm sollte funktionieren auf:

* Desktop
* Laptop
* Tablet
* Smartphone

Gerade **Wayfinder** sollte stark auf Smartphones optimiert werden, da die Raumsuche meistens unterwegs innerhalb der Schule benötigt wird.

---

# Entwicklungsphasen

Damit das Projekt schrittweise umgesetzt werden kann, sollte die Entwicklung in mehrere Phasen aufgeteilt werden.

## Phase 1 – Foundation

* Angular Projekt
* NestJS Projekt
* PostgreSQL
* Login
* User Accounts
* grundlegendes Layout
* Sidebar
* Navigation

---

## Phase 2 – Organisation

* Dashboard
* Stundenplan
* Aufgaben
* Prüfungen
* Kalender

---

## Phase 3 – Wayfinder

* Gebäudedatenmodell
* Stockwerke
* Raumdatenbank
* SVG-Karten
* Raumsuche
* Raumdetails
* Stundenplan-Verknüpfung

Danach:

* Nodes und Edges
* Routing
* Dijkstra oder A*
* barrierefreie Routen

---

## Phase 4 – Lernen

* Notizen
* Flashcards
* Noten
* Pomodoro
* Lernstatistiken

---

## Phase 5 – HTL Tools

* Scientific Calculator
* Zahlensystem-Konverter
* Subnet Calculator
* Hash Tool
* Base64
* JSON Formatter
* Regex Tester

---

## Phase 6 – Projekte

* Projektverwaltung
* Code Snippets
* Link Manager
* GitHub Integration

---

## Phase 7 – Erweiterungen

* Notifications
* Command Palette
* globale Suche
* Statistiken
* PWA
* Offline-Unterstützung
* Import/Export
* API Integrationen

---

# Empfohlener finaler Stack

```text
Frontend
├── Angular
├── TypeScript
├── Tailwind CSS
└── PrimeNG

Backend
├── NestJS
├── TypeScript
├── REST API
└── Session Authentication

Database
├── PostgreSQL
└── Prisma ORM

Wayfinder
├── SVG Maps
├── Graph Data Structure
├── Dijkstra / A*
└── PostgreSQL

Infrastructure
├── Docker
├── Nginx
└── GitHub Actions
```

---

# MVP

Die erste tatsächlich verwendbare Version sollte enthalten:

1. Benutzer-Accounts
2. Dashboard
3. Stundenplan
4. Aufgaben
5. Prüfungsplaner
6. Wayfinder mit Raumsuche
7. Notizen
8. Noten-Tracker
9. Zahlensystem-Rechner
10. Subnet Calculator
11. Code Snippets
12. Pomodoro Timer
13. Link Manager

Wayfinder muss im ersten MVP noch keine vollständige automatische Navigation besitzen.

Für Version 1 reicht:

```text
Raum suchen
      ↓
Gebäude anzeigen
      ↓
Stockwerk anzeigen
      ↓
Raum auf Karte markieren
```

Das komplexere Routing kann anschließend ergänzt werden.

---

# Spätere Ideen

Falls das Projekt weiter wächst:

* WebUntis Integration
* Moodle Integration
* Microsoft Teams Integration
* automatische Stundenplan-Synchronisierung
* Push Notifications
* Kalender-Synchronisierung
* gemeinsame Projekte
* gemeinsame Notizen
* Klassengruppen
* Lernstatistiken
* Achievements
* öffentliche API
* Desktop-App
* PWA
* Offline-Modus
* Mobile App
* vollständiges Indoor-Routing
* automatische Navigation zur nächsten Unterrichtsstunde
* QR-Codes an wichtigen Punkten der Schule

Beispielsweise könnte neben einem Stiegenhaus ein QR-Code angebracht werden.

Nach dem Scan weiß Wayfinder:

```text
Aktueller Standort:
Gebäude B
1. Stock
Stiegenhaus B1
```

Danach kann direkt ein Ziel eingegeben werden.

So wäre Indoor-Navigation möglich, ohne GPS verwenden zu müssen.

---

# Projektziel

Das Ziel des Projekts ist eine Anwendung, die **Organisation, Navigation, Lernen und technische Werkzeuge in einer einzigen Plattform kombiniert**.

Sie soll speziell auf Schüler technischer Schulen zugeschnitten sein und Funktionen anbieten, die normale To-do- oder Schulplaner-Apps nicht besitzen.

Besonders durch Tools wie:

* Wayfinder
* Subnet Calculator
* Zahlensystem-Konverter
* Code Snippets
* SQL Playground
* JSON Formatter
* Regex Tester
* Hash Tools
* Projektverwaltung

soll sich die Anwendung von klassischen Schulplanern unterscheiden.

**Arbeitstitel: `HTL Hub`**

> School organization meets developer toolbox.
