# Changelog

Alle wichtigen Änderungen am HTL-Hub-Backend werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/) und dieses Projekt verwendet [Semantic Versioning](https://semver.org/).

Die Release-Reihenfolge für eine neue Version lautet: `alpha.1`, `alpha.2`, ...,
`beta.1`, `beta.2`, ..., `rc.1`, `rc.2`, ..., stabile Version, danach bei
Bugfixes eine Patch-Version und bei neuen Features eine neue Minor-Version.

## [Unreleased]

### Added

### Changed

* CORS-Konfiguration für lokale Angular-Ports und konfigurierbare Origins erweitert.

### Fixed

* Keine Einträge.
* DTO-Validierung für User-Erstellung und Updates ergänzt, damit gültige Requests die globale ValidationPipe passieren.
* JWT-Provider für den Guard im `UserModule` verfügbar gemacht.
* `POST /api/user` für neue Registrierungen öffentlich zugänglich gemacht.
* Öffentliche Registrierung trotz geschützter User-CRUD-Routen ermöglicht.

### Removed

---

## [0.3.0-alpha.3] - 2026-08-26

### Added

* JWT-Guard zum Schutz der User-CRUD-Endpunkte ergänzt.
* Authentifizierungsfehler für fehlende, ungültige und abgelaufene Tokens ergänzt.
* Test-Setups für Health-, User- und JWT-Abhängigkeiten aktualisiert.

### Changed

* Backend-Version auf `0.3.0-alpha.3` aktualisiert.

---

## [0.3.0-alpha.2] - 2026-08-26

### Added

* Login-Endpunkt unter `POST /api/auth/login` ergänzt.
* Passwortprüfung mit bcrypt und signierte JWT-Access-Tokens hinzugefügt.
* User-Suche per E-Mail im Repository ergänzt.

### Changed

* Backend-Version auf `0.3.0-alpha.2` aktualisiert.

---

## [0.3.0-alpha.1] - 2026-08-26

### Changed

* User-Management mit PostgreSQL-Integration weiter implementiert.
* Modulare Backend-Architektur erweitert und Verantwortlichkeiten in eigene Unterordner gegliedert.
* Repository-Dateinamen und Klassennamen vereinheitlicht.
* SQL-Schema nach `src/db/migrations/001_create_users.sql` verschoben.
* Globale Versionskonfiguration unter `src/config/app.config.ts` ergänzt.

### Removed

* Nicht verwendete generierte App- und Entity-Dateien entfernt.

---

## [0.2.0] - 2026-08-26

### Added

* User-Management-Modul für Benutzer und Passwörter hinzugefügt.
* User-Erstellung mit Passwort-Hashing und sicherer Speicherung implementiert.
* PostgreSQL-Integration mit Repository-Pattern für den Datenzugriff eingeführt.
* DTOs für die Erstellung und Aktualisierung von Benutzern erstellt.
* Health-Check-Endpunkt für den Anwendungsstatus hinzugefügt.
* Swagger-Dokumentation für die API-Endpunkte eingerichtet.
* Globale Validierung und CORS-Konfiguration ergänzt.

### Changed

* Backend in `ConfigModule`, `DbModule`, `HealthModule` und `UserModule` aufgeteilt.
* User- und Passwortzugriff über Repository-Interfaces und PostgreSQL-Implementierungen strukturiert.

### Removed

* Nicht verwendeten `AppController` und `AppService` entfernt.

---

## [0.1.0] - 2026-08-26

### Added

* NestJS-Backend initialisiert.
* Grundlegende Backend-Projektstruktur erstellt.
* PostgreSQL-Verbindungs- und Umgebungsvariablen vorbereitet.
