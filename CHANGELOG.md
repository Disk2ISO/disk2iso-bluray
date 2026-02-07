# Changelog

Alle bedeutenden Änderungen am disk2iso Blu-ray Modul werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [1.3.0] - 2026-02-07

### Changed

- Kompatibilität mit disk2iso 1.3.0 Service-Struktur
- Installation nach `services/disk2iso-web/` statt `www/`
- Version auf 1.3.0 aktualisiert

## [Unreleased]

### Geplant

- Entschlüsselung mit MakeMKV Integration
- Automatische Chapter-Erkennung
- Multi-Angle Support
- 3D Blu-ray Unterstützung

## [1.2.0] - 2026-02-04

### Added

- Initiale Abtrennung als eigenständiges Modul
- ddrescue Unterstützung für robustes Kopieren
- dd Fallback-Methode
- Manifest-Datei (libbluray.ini)
- Mehrsprachige Unterstützung (DE, EN, ES, FR)
- Fortschritts-Tracking mit Prozentanzeige
- Ausgabe-Ordner Konfiguration

### Changed

- Unabhängiges Repository von disk2iso Core
- Modulare INI-basierte Konfiguration
- Optionale Integration (nicht mehr im Core)

### Fixed

- Keine bekannten Fehler

## [1.0.0] - 2025-XX-XX

### Features

- Erste Version als Teil von disk2iso Core
- Basis-Funktionalität für Blu-ray Kopieren

---

[Unreleased]: https://github.com/DirkGoetze/disk2iso-bluray/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/DirkGoetze/disk2iso-bluray/releases/tag/v1.2.0
[1.0.0]: https://github.com/DirkGoetze/disk2iso-bluray/releases/tag/v1.0.0
