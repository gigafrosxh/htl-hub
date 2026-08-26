# Changelog

Alle wichtigen Änderungen am HTL-Hub-Frontend werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/) und dieses Projekt verwendet [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

### Changed

* Frontend kann mit dynamischen lokalen Dev-Server-Ports über die Backend-CORS-Konfiguration kommunizieren.

### Fixed

### Removed

---

## [0.3.0] - 2026-08-26

### Added

* App-Shell mit globalem Header und Navigation erstellt.
* Login-Ansicht mit vorbereiteten Formularfeldern ergänzt.
* Registrierungsansicht mit Anbindung an `POST /api/user` ergänzt.
* User-Verwaltungsansicht für `GET /api/user`, `GET /api/user/:id`, `PATCH /api/user/:id` und `DELETE /api/user/:id` hinzugefügt.
* Zentralen `UserApiService` für die Kommunikation mit dem Backend erstellt.
* Tailwind CSS und PrimeNG mit Aura-Theme konfiguriert.
* Responsive Layouts für Desktop- und mobile Ansichten ergänzt.

### Changed

* Leere Angular-Starteransicht durch eine modulare Benutzeroberfläche ersetzt.
* Routing für Login, Registrierung und User-Verwaltung eingerichtet.
* Globale Frontend-Styles für Typografie, Farben und Formulare erweitert.

### Fixed

* Tailwind-CSS-Verarbeitung über PostCSS ergänzt.
* Fehlenden Stylesheet-Verweis auf `styles.css` korrigiert.
* Validierungsfehler der Registrierung werden im Formular verständlich angezeigt.

### Removed

* Keine Einträge.

---

## [0.1.0] - 2026-08-26

### Added

* Angular-Frontend initialisiert.
* Grundlegende Angular-Projektstruktur erstellt.
* Routing- und Bootstrap-Konfiguration angelegt.
