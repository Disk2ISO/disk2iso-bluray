# GitHub Setup Anleitung für disk2iso-bluray

## Repository auf GitHub erstellen

### 1. Neues Repository auf GitHub anlegen

1. Gehe zu https://github.com/new
2. Setze **Repository name**: disk2iso-bluray
3. **Description**: Blu-ray Ripping Module for disk2iso - ddrescue/dd support for encrypted BD discs
4. Wähle **Public**
5. **NICHT** 'Initialize with README' aktivieren (wir haben schon eins)
6. Klicke **Create repository**

### 2. Lokales Repository initialisieren

`ash
cd l:/clouds/onedrive/Dirk/projects/disk2iso-bluray

# Git initialisieren
git init

# Dateien hinzufügen
git add .

# Erster Commit
git commit -m 'Initial commit: Blu-ray module v1.2.0'

# Main Branch umbenennen (falls nötig)
git branch -M main

# Remote hinzufügen
git remote add origin https://github.com/DirkGoetze/disk2iso-bluray.git

# Push
git push -u origin main
`

### 3. Release erstellen

1. Gehe zu: https://github.com/DirkGoetze/disk2iso-bluray/releases/new
2. **Tag version**: 1.2.0
3. **Release title**: 1.2.0 - Initial Module Release
4. **Description**:
   `
   Initial release of the Blu-ray module as standalone repository.
   
   Features:
   - ddrescue support for robust copying
   - dd fallback method
   - Encrypted Blu-ray ISO creation
   - Progress tracking
   - Multi-language support (DE, EN, ES, FR)
   
   Install:
   See README.md for installation instructions
   `
5. **Attach binaries**: ZIP-Datei erstellen (siehe nächsten Schritt)
6. Klicke **Publish release**

### 4. Release ZIP erstellen

`ash
cd l:/clouds/onedrive/Dirk/projects/disk2iso-bluray

# ZIP erstellen (ohne .git, .vscode etc)
zip -r bluray-module.zip conf/ lang/ lib/ LICENSE README.md VERSION CHANGELOG.md -x '*.git*' -x '*.vscode*'
`

Oder mit PowerShell:
`powershell
cd l:\clouds\onedrive\Dirk\projects\disk2iso-bluray

Compress-Archive -Path conf,lang,lib,LICENSE,README.md,VERSION,CHANGELOG.md 
                 -DestinationPath bluray-module.zip 
                 -CompressionLevel Optimal
`

Diese ZIP-Datei dann als Asset zum Release hochladen.

### 5. Topics hinzufügen

Gehe zu: https://github.com/DirkGoetze/disk2iso-bluray

Klicke auf das Zahnrad bei 'About' und füge Topics hinzu:
- luray
- iso
- ipping
- ddrescue
- disk2iso
- module
- ash

### 6. README Badge URLs aktualisieren

Falls noch nicht geschehen, ersetze in README.md:
`markdown
[![Version](https://img.shields.io/github/v/release/DirkGoetze/disk2iso-bluray)](https://github.com/DirkGoetze/disk2iso-bluray/releases)
`

## Fertig!

Das Repository ist nun auf GitHub verfügbar unter:
https://github.com/DirkGoetze/disk2iso-bluray

