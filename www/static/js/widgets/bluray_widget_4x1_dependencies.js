/**
 * Bluray Module - Dependencies Widget (4x1)
 * Zeigt Blu-ray spezifische Tools
 * Version: 1.0.0
 */

function loadBlurayDependencies() {
    fetch('/api/system')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.software) {
                updateBlurayDependencies(data.software);
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden der Bluray-Dependencies:', error);
            showBlurayDependenciesError();
        });
}

function updateBlurayDependencies(softwareList) {
    const tbody = document.getElementById('bluray-dependencies-tbody');
    if (!tbody) return;
    
    // Bluray-spezifische Tools (aus libbluray.ini [dependencies])
    const blurayTools = [
        { name: 'ddrescue', display_name: 'GNU ddrescue' }
    ];
    
    let html = '';
    
    blurayTools.forEach(tool => {
        const software = softwareList.find(s => s.name === tool.name);
        if (software) {
            html += renderSoftwareRow(tool.display_name, software);
        }
    });
    
    if (html === '') {
        html = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #999;">Keine Informationen verfügbar</td></tr>';
    }
    
    tbody.innerHTML = html;
}

function showBlurayDependenciesError() {
    const tbody = document.getElementById('bluray-dependencies-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #e53e3e;">Fehler beim Laden</td></tr>';
}

// Auto-Load
if (document.getElementById('bluray-dependencies-widget')) {
    loadBlurayDependencies();
}
