/**
 * disk2iso - Blu-ray Settings Widget
 * Lädt Blu-ray Einstellungen dynamisch
 */

let bluraySaveTimeout = null;

document.addEventListener('DOMContentLoaded', function() {
    // Lade Widget-Content via AJAX
    fetch('/api/widgets/bluray/settings')
        .then(response => response.text())
        .then(html => {
            const container = document.getElementById('bluray-settings-container');
            if (container) {
                container.innerHTML = html;
                initBluraySettingsWidget();
            }
        })
        .catch(error => console.error('Fehler beim Laden der Blu-ray Settings:', error));
});

function initBluraySettingsWidget() {
    const activeCheckbox = document.getElementById('bluray_active');
    
    if (activeCheckbox) {
        activeCheckbox.addEventListener('change', function() {
            // Speichere Änderungen automatisch
            saveBluraySettings();
        });
    }
}

function saveBluraySettings() {
    // Debounce: Warte 300ms nach letzter Änderung
    if (bluraySaveTimeout) {
        clearTimeout(bluraySaveTimeout);
    }
    
    bluraySaveTimeout = setTimeout(() => {
        saveBluraySettingsNow();
    }, 300);
}

function saveBluraySettingsNow() {
    const active = document.getElementById('bluray_active')?.checked || false;
    
    const data = {
        active: active
    };
    
    fetch('/api/widgets/bluray/settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showNotification('Blu-ray Einstellungen gespeichert', 'success');
        } else {
            showNotification('Fehler beim Speichern: ' + result.error, 'error');
        }
    })
    .catch(error => {
        console.error('Fehler:', error);
        showNotification('Fehler beim Speichern der Einstellungen', 'error');
    });
}
