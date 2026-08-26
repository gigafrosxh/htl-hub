# Changelog

Alle wichtigen Änderungen am HTL-Hub-Frontend werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/) und dieses Projekt verwendet [Semantic Versioning](https://semver.org/).

Die Release-Reihenfolge für eine neue Version lautet: `alpha.1`, `alpha.2`, ...,
`beta.1`, `beta.2`, ..., `rc.1`, `rc.2`, ..., stabile Version, danach bei
Bugfixes eine Patch-Version und bei neuen Features eine neue Minor-Version.

## [Unreleased]

### Added

### Changed

* Frontend kann mit dynamischen lokalen Dev-Server-Ports über die Backend-CORS-Konfiguration kommunizieren.

### Fixed

### Removed

---

## [0.3.0-rc.1] - 2026-08-26

### Changed

* Release Candidate für die stabile Version `0.3.0` vorbereitet.
* Frontend-Version auf `0.3.0-rc.1` aktualisiert.

---

## [0.3.0-beta.2] - 2026-08-26

### Changed

* Frontend-Version auf `0.3.0-beta.2` aktualisiert.
* API- und Authentifizierungsdokumentation erweitert.

---

## [0.3.0-beta.1] - 2026-08-26

### Changed

* Frontend-Version auf `0.3.0-beta.2` aktualisiert.
* Beta-Release basiert auf einem vollständig getesteten Authentifizierungs-Backend.

---

## [0.3.0-alpha.5] - 2026-08-26

### Added

* Zentrale API-Konfiguration ergänzt.
* Automatisches Ausloggen bei `401 Unauthorized` hinzugefügt.
* Erfolgreiche Registrierung leitet zur Login-Seite weiter.

### Changed

* Frontend-Dokumentation um Login, Session und API-Konfiguration erweitert.
* Frontend-Version auf `0.3.0-alpha.5` aktualisiert.

---

## [0.3.0-alpha.4] - 2026-08-26

### Fixed

* UI-Status nach asynchronen Registrierungs-, Login- und User-Requests aktualisiert.
* Registrierungsanfragen benötigen keinen Authentifizierungs-Token.

---

## [0.3.0-alpha.3] - 2026-08-26

### Added

* Bearer-Token-Interceptor für authentifizierte API-Anfragen ergänzt.
* Auth-Guard für die geschützte User-Verwaltung hinzugefügt.
* Logout mit Entfernung der lokalen Sessiondaten ergänzt.
* Erfolgreicher Login leitet zur User-Übersicht weiter.
* App-Test für Router-Navigation und den neuen Header aktualisiert.

### Changed

* Frontend-Version auf `0.3.0-alpha.3` aktualisiert.

---

## [0.3.0-alpha.2] - 2026-08-26

### Added

* Login-Formular mit dem Backend-Endpoint `POST /api/auth/login` verbunden.
* JWT-Access-Token nach erfolgreicher Anmeldung lokal gespeichert.
* Fehler- und Ladezustände im Login-Formular ergänzt.

### Changed

* Frontend-Version auf `0.3.0-alpha.2` aktualisiert.

---

## [0.3.0-alpha.1] - 2026-08-26

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
* Frontend-Login kann wieder mit dem gestarteten Backend kommunizieren.
* Registrierungsanfragen benötigen keinen Authentifizierungs-Token mehr.
* Erfolgs- und Fehlermeldungen werden nach HTTP-Anfragen sofort in der Oberfläche aktualisiert.

### Removed

* Keine Einträge.

---

## [0.1.0] - 2026-08-26

### Added

* Angular-Frontend initialisiert.
* Grundlegende Angular-Projektstruktur erstellt.
* Routing- und Bootstrap-Konfiguration angelegt.
