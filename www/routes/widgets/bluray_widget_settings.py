"""
disk2iso - Blu-ray Widget Settings Routes
Stellt die Blu-ray-Einstellungen bereit (Settings Widget)
"""

import os
import sys
import configparser
from flask import Blueprint, render_template, jsonify, request
from i18n import t

# Blueprint für Blu-ray Settings Widget
bluray_settings_bp = Blueprint('bluray_settings', __name__)

def get_bluray_ini_path():
    """Ermittelt den Pfad zur libbluray.ini"""
    return '/opt/disk2iso-bluray/conf/libbluray.ini'

def get_bluray_settings():
    """
    Liest die Blu-ray-Einstellungen aus libbluray.ini [settings]
    """
    try:
        ini_path = get_bluray_ini_path()
        
        settings = {
            "enabled": True,
            "active": True
        }
        
        if os.path.exists(ini_path):
            parser = configparser.ConfigParser()
            parser.read(ini_path)
            
            if parser.has_section('settings'):
                settings['enabled'] = parser.getboolean('settings', 'enabled', fallback=True)
                settings['active'] = parser.getboolean('settings', 'active', fallback=True)
        
        return settings
        
    except Exception as e:
        print(f"Fehler beim Lesen der Blu-ray-Einstellungen: {e}", file=sys.stderr)
        return {
            "enabled": True,
            "active": True
        }

def save_bluray_settings(data):
    """
    Speichert Blu-ray-Einstellungen in libbluray.ini [settings]
    """
    try:
        ini_path = get_bluray_ini_path()
        
        if not os.path.exists(ini_path):
            return False, "INI-Datei nicht gefunden"
        
        parser = configparser.ConfigParser()
        parser.read(ini_path)
        
        if not parser.has_section('settings'):
            parser.add_section('settings')
        
        # Aktualisiere Werte
        if 'active' in data:
            parser.set('settings', 'active', 'true' if data['active'] else 'false')
        
        # Schreibe zurück
        with open(ini_path, 'w') as f:
            parser.write(f)
        
        return True, "Einstellungen gespeichert"
        
    except Exception as e:
        return False, str(e)

@bluray_settings_bp.route('/api/widgets/bluray/settings', methods=['GET'])
def api_bluray_settings_widget():
    """
    Rendert das Blu-ray Settings Widget
    """
    config = get_bluray_settings()
    
    return render_template('widgets/bluray_widget_settings.html',
                         settings=settings,
                         t=t)

@bluray_settings_bp.route('/api/widgets/bluray/settings', methods=['POST'])
def api_save_bluray_settings():
    """
    Speichert Blu-ray-Einstellungen
    """
    try:
        data = request.get_json()
        success, message = save_bluray_settings(data)
        
        if success:
            return jsonify({"success": True, "message": message})
        else:
            return jsonify({"success": False, "error": message}), 400
            
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

