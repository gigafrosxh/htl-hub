# Changelog

Alle wichtigen Änderungen am HTL-Hub-Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/) und dieses Projekt verwendet [Semantic Versioning](https://semver.org/).

Die Release-Reihenfolge für eine neue Version lautet: `alpha.1`, `alpha.2`, ...,
`beta.1`, `beta.2`, ..., `rc.1`, `rc.2`, ..., stabile Version, danach bei
Bugfixes eine Patch-Version und bei neuen Features eine neue Minor-Version.

## [Unreleased]

### Added

### Changed

* Backend-CORS für konfigurierbare Origins und lokale Frontend-Entwicklung robust gemacht.

### Fixed

* Tailwind-CSS-Verarbeitung im Frontend ergänzt, damit Header und UI-Utilities korrekt dargestellt werden.
* 400-Fehler bei der User-Registrierung durch fehlende DTO-Validierungsregeln behoben.

### Removed

---

## [0.3.0-alpha.3] - 2026-08-26

### Added

* JWT-Guard zum Schutz der User-API ergänzt.
* Frontend-Interceptor für Bearer-Tokens hinzugefügt.
* Auth-Guard für geschützte Frontend-Routen ergänzt.
* Logout mit Session-Bereinigung hinzugefügt.
* Bestehende Backend- und Frontend-Tests an die neue Authentifizierung angepasst.

### Changed

* Backend- und Frontend-Version auf `0.3.0-alpha.3` aktualisiert.

---

## [0.3.0-alpha.2] - 2026-08-26

### Added

* Login-Endpunkt unter `POST /api/auth/login` ergänzt.
* Passwortprüfung mit bcrypt und signierte JWT-Access-Tokens hinzugefügt.
* Login-Formular im Frontend mit dem Backend verbunden.
* User-Suche per E-Mail im Repository ergänzt.

### Changed

* Backend- und Frontend-Version auf `0.3.0-alpha.2` aktualisiert.

---

## [0.3.0-alpha.1] - 2026-08-26

### Added

* Globale Versionskonfiguration im Backend ergänzt.
* Frontend-Shell mit Header, Navigation sowie Login- und Registrierungsansichten begonnen.
* User-Verwaltungsoberfläche für das Laden, Suchen, Aktualisieren und Löschen von Benutzern ergänzt.
* Zentrale Frontend-API-Anbindung für die User-Endpunkte hinzugefügt.
* Tailwind CSS und PrimeNG für die Frontend-Oberfläche eingerichtet.

### Changed

* Backend-Struktur in Config-, Core-, User-, Health- und Migrationsbereiche gegliedert.
* PostgreSQL- und Repository-Dateien in eigene Unterordner verschoben.
* Backend-Module über `AppModule`, `HealthModule`, `UserModule` und `DbModule` verdrahtet.

### Removed

* Nicht verwendete generierte App- und Entity-Dateien aus dem Backend entfernt.

---

## [0.2.0] - 2026-08-26

### Added

* User-Management-Modul für Benutzer und Passwörter hinzugefügt.
* User-Erstellung mit Passwort-Hashing implementiert.
* PostgreSQL-Integration mit Repository-Pattern für den Datenzugriff eingeführt.
* DTOs für die Erstellung und Aktualisierung von Benutzern erstellt.
* Health-Check-Endpunkt für den Anwendungsstatus hinzugefügt.
* Swagger-Dokumentation für die API-Endpunkte eingerichtet.
* Globale Validierung und CORS für das Backend konfiguriert.

### Changed

* Backend in eine modulare Architektur aufgeteilt.
* Datenbankzugriff über Repository-Interfaces und PostgreSQL-Implementierungen strukturiert.

### Removed

* Nicht verwendeten `AppController` und `AppService` entfernt.

---

## [0.1.0] - 2026-08-26

### Added

* Initiales Projektsetup erstellt.
* Angular-Frontend initialisiert.
* NestJS-Backend initialisiert.
* Grundlegende Frontend- und Backend-Projektstruktur erstellt.
* Projektkonzept und Brainstorming in der [README](./README.md) dokumentiert.
