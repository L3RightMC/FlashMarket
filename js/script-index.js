document.addEventListener('DOMContentLoaded', function() {
    // fondo de menor que. por qué? diseño.
    const simbolos = document.querySelector('.plus');
    setTimeout(() => {
        const spacingX = 25;
        const spacingY = 25;
        const cols = Math.ceil(simbolos.offsetWidth / spacingX);
        const rows = Math.ceil(simbolos.offsetHeight / spacingY);

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const plus = document.createElement('span');
                plus.textContent = '<';
                plus.style.position = 'absolute';
                plus.style.left = `${x * spacingX}px`;
                plus.style.top = `${y * spacingY}px`;
                plus.style.fontSize = '16px';
                simbolos.appendChild(plus);
            }
        }
    }, 100);
    // ese fondo de barras. está chulo a que sí
    const simbolos1 = document.querySelector('.plus1');
    setTimeout(() => {
        const spacingX = 25;
        const spacingY = 25;
        const cols = Math.ceil(simbolos1.offsetWidth / spacingX);
        const rows = Math.ceil(simbolos1.offsetHeight / spacingY);
        //antes de nada, con que se come los espagetis? div (contenedor). vaya pérdida de aura hice
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const plus1 = document.createElement('span');
                plus1.textContent = '╱';
                plus1.style.position = 'absolute';
                plus1.style.left = `${x * spacingX}px`;
                plus1.style.top = `${y * spacingY}px`;
                plus1.style.fontSize = '16px';
                simbolos1.appendChild(plus1);
            }
        }
    }, 100);

    // extrae el h2 y lo desplaza a la izquierda infinitamente, creo
    const velocidadtextoizquierda = 0.5;
    document.querySelectorAll('.texto-izquierda').forEach(h2 => {
        const contenidoriginal = h2.textContent.trim() + " ";

        function iniciartextoizquierda() {
            h2.textContent = "";
            const repeticiones = Math.ceil((window.innerWidth * 2) / 50);
            h2.textContent = contenidoriginal.repeat(repeticiones);
        }
        iniciartextoizquierda();
        let posicion = 0;
        function movertextoizquierda() {
            posicion -= velocidadtextoizquierda;
            if (Math.abs(posicion) >= h2.offsetWidth / 2) posicion = 0;
            h2.style.transform = `translateX(${posicion}px)`;
            requestAnimationFrame(movertextoizquierda);
        }
        movertextoizquierda();
        window.addEventListener('resize', iniciartextoizquierda);
    });

    // lo mismo pero a la derecha
    const velocidadtextoderecha = 0.5;
    document.querySelectorAll('.texto-derecha').forEach(h2 => {
        const contenidooriginal = h2.textContent.trim() + " ";

        function iniciartextoderecha() {
            h2.textContent = "";
            const repeticiones = Math.ceil((window.innerWidth * 2) / 50);
            h2.textContent = contenidooriginal.repeat(repeticiones);
        }
        iniciartextoderecha();
        let posicion = 0;
        function movertextoderecha() {
            posicion += velocidadtextoderecha;
            if (posicion >= h2.offsetWidth / 2) posicion = 0;
            h2.style.transform = `translateX(${posicion}px)`;
            requestAnimationFrame(movertextoderecha);
        }
        movertextoderecha();
        window.addEventListener('resize', iniciartextoderecha);
    });

    // uff las reseñas...
    Promise.all([
        fetch('/json/reseñas.json').then(r => r.json()),
        fetch('/json/productos.json').then(r => r.json())
    ])
    .then(([reseñas, productos]) => {
        const productosMap = {};
        Object.values(productos).flat().forEach(p => {
            productosMap[p.id] = p;
        });

        const contenedor = document.querySelector('.valoraciones');

        reseñas.forEach(reseña => {
            const producto = productosMap[reseña.producto_id];

            if (!producto) {
                console.warn(`No encontré esta cosa: ${reseña.producto_id}`);
                return;
            }

            // nueva etiqueta para ordenar los divs
            const prevaloracion = document.createElement('div');
            prevaloracion.className = 'pre-valoracion';

            const divvaloracion = document.createElement('div');
            divvaloracion.className = 'valoracion';
            divvaloracion.setAttribute('data-valoracion', reseña.valoracion);
            divvaloracion.style.backgroundImage = `url(${reseña.imagen})`;

            // como se llama este?
            const span = document.createElement('span');
            span.textContent = reseña.nombre;
            divvaloracion.appendChild(span);

            // nuevo div con opinion
            const divdescripcion = document.createElement('div');
            divdescripcion.className = 'descripcion-valoracion';
            const p = document.createElement('p');
            p.textContent = reseña.opinion;
            divdescripcion.appendChild(p);

            // valoracion
            const estrellas = document.createElement('div');
            estrellas.className = 'estrellas';
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('span');
                star.textContent = i < reseña.valoracion ? '★' : '☆';
                estrellas.appendChild(star);
            }
            divdescripcion.appendChild(estrellas);
            divvaloracion.appendChild(divdescripcion);
            const divproducto = document.createElement('div');
            divproducto.className = 'producto-descripcion';

            const img = document.createElement('img');
            img.src = producto.imagen;
            img.alt = producto.nombre;
            const pproducto = document.createElement('p');
            pproducto.textContent = producto.nombre;

            divproducto.appendChild(img);
            divproducto.appendChild(pproducto);
            // a montarlo
            prevaloracion.appendChild(divvaloracion);
            prevaloracion.appendChild(divproducto);
            contenedor.appendChild(prevaloracion);
        });
    })
    .catch(error => console.error('oye, no se me cargó este dato', error));
});
