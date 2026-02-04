# disk2iso Blu-ray Module

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/github/v/release/DirkGoetze/disk2iso-bluray)](https://github.com/DirkGoetze/disk2iso-bluray/releases)

Blu-ray Ripping Plugin für [disk2iso](https://github.com/DirkGoetze/disk2iso) - ermöglicht das Kopieren von Blu-ray Discs mit ddrescue oder dd.

## 🚀 Features

- **Verschlüsselte Blu-ray Kopien** - ISO-Images bleiben verschlüsselt
- **Robustes Kopieren** - ddrescue mit automatischer Fehlerbehandlung
- **Fallback-Methode** - dd als Alternative verfügbar
- **Große Datenmengen** - Unterstützung bis 50GB
- **TMDB Integration** - Automatische Metadaten-Abfrage (optional)
- **Fortschritts-Tracking** - Echtzeit-Prozentanzeige

## 📋 Voraussetzungen

- **disk2iso** >= v1.2.0 ([Installation](https://github.com/DirkGoetze/disk2iso))
- **ddrescue** (empfohlen, für robustes Kopieren)
- **dd** (Fallback, immer verfügbar)
- Optional: **TMDB Modul** für Metadaten

## 📦 Installation

### Automatisch (empfohlen)

```bash
# Download neueste Version
curl -L https://github.com/DirkGoetze/disk2iso-bluray/releases/latest/download/bluray-module.zip -o /tmp/bluray.zip

# Entpacken nach disk2iso
cd /opt/disk2iso
sudo unzip /tmp/bluray.zip

# Service neu starten
sudo systemctl restart disk2iso
```

### Manuell

1. Download [neueste Release](https://github.com/DirkGoetze/disk2iso-bluray/releases/latest)
2. Entpacke nach `/opt/disk2iso/`
3. Setze Berechtigungen: `sudo chown -R root:root /opt/disk2iso/`
4. Restart Service: `sudo systemctl restart disk2iso`

### Via Web-UI (ab v1.3.0)

1. Öffne disk2iso Web-UI
2. Gehe zu **Einstellungen → Module**
3. Klicke auf **Blu-ray → Installieren**

## ⚙️ Konfiguration

### Manifest-Datei

Das Modul wird über `conf/libbluray.ini` konfiguriert:

```ini
[module]
name=bluray
version=1.2.0
enabled=true

[dependencies]
# Kritische externe Tools
external=

# Optionale Tools
optional=ddrescue

[folders]
# Ausgabe-Ordner (unterhalb von OUTPUT_DIR)
output=bd
```

### Modul aktivieren/deaktivieren

```bash
# Deaktivieren (im Manifest)
sudo nano /opt/disk2iso/conf/libbluray.ini
# Setze: enabled=false

# Service neu starten
sudo systemctl restart disk2iso
```

## 🔧 Verwendung

### Automatisch

Lege eine Blu-ray Disc ein - disk2iso erkennt automatisch den Typ und startet das Kopieren:

```bash
# Status prüfen
sudo systemctl status disk2iso

# Logs ansehen
sudo journalctl -u disk2iso -f
```

### Manuell (Skript)

```bash
# Direkter Aufruf (für Tests)
sudo /opt/disk2iso/lib/libbluray.sh
```

### Via Web-UI

1. Öffne <http://your-server:5000>
2. Lege Blu-ray ein
3. Klicke auf **Kopieren starten**
4. Verfolge Fortschritt in Echtzeit

## 📊 Ausgabe-Struktur

```text
/media/iso/bd/
├── Movie_Title_2024.iso              # ISO-Image (verschlüsselt)
├── Movie_Title_2024.iso.log          # Kopiervorgang-Log
└── .temp/
    └── Movie_Title_2024.iso.mapfile  # ddrescue Map-Datei
```

## 🛠️ Kopiermethoden

### Methode 1: ddrescue (empfohlen)

- **Robust** - Automatisches Retry bei Lesefehlern
- **Schnell** - Optimierte Block-Größen
- **Status** - Map-Datei für Fortsetzung
- **Verschlüsselt** - ISO bleibt kopiergeschützt

```bash
# Wird automatisch verwendet wenn ddrescue installiert ist
sudo apt-get install gddrescue
```

### Methode 2: dd (Fallback)

- **Einfach** - Keine Extra-Tools nötig
- **Langsam** - Keine Fehlerbehandlung
- **Verschlüsselt** - ISO bleibt kopiergeschützt

```bash
# Immer verfügbar (Teil von coreutils)
```

## 🔌 API-Endpunkte

Keine zusätzlichen API-Endpunkte - das Modul integriert sich in die Haupt-API:

```bash
# Status-Abfrage
curl http://localhost:5000/api/status

# Ausgabe bei Blu-ray Kopiervorgang:
{
  "status": "copying",
  "disc_type": "bd-video",
  "progress": 45,
  "method": "ddrescue"
}
```

## 🧪 Entwicklung

### Struktur

```text
disk2iso-bluray/
├── conf/
│   └── libbluray.ini           # Modul-Manifest
├── lang/
│   ├── libbluray.de            # Deutsche Übersetzung
│   ├── libbluray.en            # Englische Übersetzung
│   ├── libbluray.es            # Spanische Übersetzung
│   └── libbluray.fr            # Französische Übersetzung
└── lib/
    └── libbluray.sh            # Haupt-Bibliothek
```

### Lokale Tests

```bash
# In disk2iso-Umgebung testen
cd /opt/disk2iso
source lib/libcommon.sh
source lib/libbluray.sh

# Abhängigkeiten prüfen
bluray_check_dependencies

# Testlauf mit Blu-ray
copy_bluray_disk
```

## 📝 Changelog

Siehe [CHANGELOG.md](CHANGELOG.md) für alle Änderungen.

## 🤝 Beitragen

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit deine Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Öffne einen Pull Request

## 📜 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

## 🔗 Links

- [disk2iso Core](https://github.com/DirkGoetze/disk2iso)
- [TMDB Module](https://github.com/DirkGoetze/disk2iso-tmdb) (optional)
- [MQTT Module](https://github.com/DirkGoetze/disk2iso-mqtt) (optional)

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/DirkGoetze/disk2iso-bluray/issues)
- **Diskussionen**: [GitHub Discussions](https://github.com/DirkGoetze/disk2iso-bluray/discussions)
- **Core Projekt**: [disk2iso](https://github.com/DirkGoetze/disk2iso)
