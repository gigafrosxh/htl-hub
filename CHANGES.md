# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/) und dieses Projekt verwendet [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

### Changed

### Fixed

### Removed

---

## [0.2.1] - 2026-08-26

### Changed

* User-Management mit PostgreSQL-Integration weiter implementiert und bestehende modulare Backend-Architektur erweitert.

---

## [0.2.0] - 2026-08-26

### Added

* User-Management-Modul für Benutzer und Passwörter hinzugefügt.
* User-Erstellung mit Passwort-Hashing implementiert.
* PostgreSQL-Integration mit Repository-Pattern für den Datenzugriff eingeführt.
* DTOs für die Erstellung und Aktualisierung von Benutzern erstellt.
* Health-Check-Endpunkt für den Anwendungsstatus hinzugefügt.
* Swagger-Dokumentation für die API-Endpunkte eingerichtet.
* Globale Validierung für eingehende Requests konfiguriert.
* CORS-Konfiguration für die Kommunikation mit dem Frontend hinzugefügt.

### Changed

* Backend in eine modulare Architektur aufgeteilt.
* Datenbankzugriff über Repository-Interfaces und PostgreSQL-Implementierungen strukturiert.

### Removed

* Nicht verwendeten `AppController` entfernt.
* Nicht verwendeten `AppService` entfernt.

---

## [0.1.0] - 2026-08-26

### Added

* Initiales Projektsetup erstellt.
* Projektkonzept und Brainstorming in der [README](./README.md) dokumentiert.
* Angular-Frontend initialisiert.
* NestJS-Backend initialisiert.
* Grundlegende Frontend- und Backend-Projektstruktur erstellt.
