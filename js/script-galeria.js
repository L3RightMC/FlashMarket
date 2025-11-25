document.addEventListener('DOMContentLoaded', function() {
    // extrae el h2 y lo desplaza a la izquierda
    const velocidadtextoizquierda = 0.5;
    document.querySelectorAll('.texto-izquierda').forEach(h1 => {
        const contenidoriginal = h1.textContent.trim() + " ";

        function iniciartextoizquierda() {
            h1.textContent = "";
            const repeticiones = Math.ceil((window.innerWidth * 2) / 50);
            h1.textContent = contenidoriginal.repeat(repeticiones);
        }

        iniciartextoizquierda();

        let posicion = 0;
        function movertextoizquierda() {
            posicion -= velocidadtextoizquierda;
            if (Math.abs(posicion) >= h1.offsetWidth / 2) posicion = 0;

            h1.style.transform = `translateX(${posicion}px)`;
            requestAnimationFrame(movertextoizquierda);
        }

        movertextoizquierda();
        window.addEventListener('resize', iniciartextoizquierda);
    });

    // lo mismo pero a la derecha
    const velocidadtextoderecha = 0.5;
    document.querySelectorAll('.texto-derecha').forEach(h1 => {
        const contenidooriginal = h1.textContent.trim() + " ";

        function iniciartextoderecha() {
            h1.textContent = "";
            const repeticiones = Math.ceil((window.innerWidth * 2) / 50);
            h1.textContent = contenidooriginal.repeat(repeticiones);
        }

        iniciartextoderecha();

        let posicion = 0;
        function movertextoderecha() {
            posicion += velocidadtextoderecha;
            if (posicion >= h1.offsetWidth / 2) posicion = 0;

            h1.style.transform = `translateX(${posicion}px)`;
            requestAnimationFrame(movertextoderecha);
        }

        movertextoderecha();
        window.addEventListener('resize', iniciartextoderecha);
    });
     const galeriaContenedor = document.querySelector('.galeria');

    fetch('../json/galeria.json')
        .then(response => response.json())
        .then(imagenes => {
            imagenes.forEach(item => {
                const img = document.createElement('img');
                img.src = item.imagen;
                img.alt = item.descripcion;
                galeriaContenedor.appendChild(img);
            });
        })
        .catch(error => console.error('Error cargando galería:', error));
});