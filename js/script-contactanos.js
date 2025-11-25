document.addEventListener('DOMContentLoaded', function() {
    // Coordenadas de mi empresa (en realidad, no hay y pues pongo esta ubicación como ejemplo)
    const empresaLat = 40.440886;
    const empresaLng = -3.702153;
    const map = L.map('mapa-interactivo').setView([empresaLat, empresaLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const marcadorempresa = L.marker([empresaLat, empresaLng]).addTo(map)
        .bindPopup('<b>FlashMarket</b><br>Pl. del Descubridor Diego de Ordás, 3')
        .openPopup();
    let marcadorusuario = null;
    let rutaLayer = null;
    // Botón para calcular ruta
    const botonruta = document.getElementById('calcular-ruta');
    botonruta.addEventListener('click', function() {
        if (navigator.geolocation) {
            botonruta.textContent = '⟳ Obteniendo tu ubicación...';
            botonruta.disabled= true;
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    // Eliminar marcador anterior si existe
                    if (marcadorusuario) {
                        map.removeLayer(marcadorusuario);
                    }
                    // Añadir marcador del usuario
                    marcadorusuario = L.marker([userLat, userLng]).addTo(map)
                        .bindPopup('<b>Mira, tu ubicación</b>')
                        .openPopup();
                    const bounds = L.latLngBounds(
                        [empresaLat, empresaLng],
                        [userLat, userLng]
                    );
                    map.fitBounds(bounds, { padding: [50, 50] });
                    if (rutaLayer) {
                        map.removeLayer(rutaLayer);
                    }
                    rutaLayer = L.polyline([
                        [userLat, userLng],
                        [empresaLat, empresaLng]
                    ], {
                        color: 'blue',
                        weight: 4,
                        opacity: 0.7
                    }).addTo(map);

                    const distancia = map.distance([userLat, userLng], [empresaLat, empresaLng]);
                    const distanciakm = (distancia / 1000).toFixed(2);
                    alert(`Ruta calculada! Distancia aproximada: ${distanciakm} km`);
                    botonruta.textContent = '✓ Ruta calculada';
                    botonruta.disabled = false;
                },
                function(error) {
                    alert('× No se pudo obtener tu ubicación. Asegúrate de dar permiso en tu navegador');
                    botonruta.textContent = 'Calcular ruta desde mi ubicación';
                    botonruta.disabled = false;
                }
            );
        } else {
            alert('Nah, tu navegador no soporta esto.');
        }
    });
});