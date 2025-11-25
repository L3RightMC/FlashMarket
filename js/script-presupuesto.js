document.addEventListener('DOMContentLoaded', function() {
    const opcioneslista = document.querySelector('.opciones-lista');
    const selectpersonalizado = document.querySelector('.select-personalizado');
    const selecttitulo = document.querySelector('.select-titulo');
    const selectexto = document.querySelector('.select-texto');
    const inputoculto = document.getElementById('producto-seleccionado');

    // json preparate
    fetch('../json/productos1.json')
        .then(response => response.json())
        .then(data => {
            const todosproductos = Object.values(data).flat();
            todosproductos.forEach(producto => {
                const option = document.createElement('div');
                option.className = 'option';
                option.setAttribute('data-value', producto.precio);
                const img = document.createElement('img');
                img.src = producto.imagen;
                img.alt = producto.nombre;
                const span = document.createElement('span');
                span.textContent = `${producto.nombre} - ${producto.precio}€`;

                option.appendChild(img);
                option.appendChild(span);
                opcioneslista.appendChild(option);
            });
            inicializarselect();
        })
        .catch(error => console.error('Oh no, no carga este producto:', error));

        function inicializarselect() {
            const opciones = document.querySelectorAll('.option');
            selecttitulo.addEventListener('click', function() {
                selectpersonalizado.classList.toggle('active');
            });
            opciones.forEach(opcion => {
                opcion.addEventListener('click', function(e) {
                    e.stopPropagation();

                    opciones.forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                    const texto = this.querySelector('span').textContent;
                    selectexto.textContent = texto;
                    const valor = this.getAttribute('data-value');
                    inputoculto.value = valor;
                    // muestra en la consola que ha seleccionado y su precio
                    console.log('Producto seleccionado - Precio:', valor);
                    selectpersonalizado.classList.remove('active');
                    calculartodo();
            });
        });

        document.addEventListener('click', function(e) {
            if (!selectpersonalizado.contains(e.target)) {
                selectpersonalizado.classList.remove('active');
            }
        });
    }
    const plazo = document.querySelector('.plazo');
    const losextras = document.querySelectorAll('.extra');
    const total1 = document.querySelector('.valor-presupuesto');

    // a calcular todo
    function calculartodo() {

        let total = 0;
        const precioproducto = parseFloat(inputoculto.value) || 0;
        total = precioproducto;
        const diasplazo = parseInt(plazo.value) || 0;

        let ajusteplazo = 0;
        if (diasplazo < 15) {
            ajusteplazo = precioproducto * 0.10;
        } else if (diasplazo > 25) {
            ajusteplazo = precioproducto * -0.10;
        }
        total += ajusteplazo;
        losextras.forEach(extra => {
            if (extra.checked) {
                total += parseFloat(extra.value);
            }
        });
        total1.textContent = total.toFixed(2) + '€';
    }
    // JS preparate te viene algo grande
    plazo.addEventListener('input', calculartodo);
    losextras.forEach(extra => {
        extra.addEventListener('change', calculartodo);
    });
    calculartodo();

    // validar?
    // elementos
    const inputnombre = document.getElementById('nombre');
    const inputapellidos = document.getElementById('apellidos');
    const inputemail = document.getElementById('email');
    const inputelefono = document.getElementById('telefono');

    // funciones para validar cada campo solo los rojos. los que no estan, que pena

    // validación para validar solo letras
    function validarsololetras(texto) {
        const bloq = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return bloq.test(texto);
    }
    // función para validar solo números
    function validarsolonumeros(texto) {
        const bloq = /^[0-9]+$/;
        return bloq.test(texto);
    }
    // validar correo con letras y numeros, nada mas
    function validaremail(email) {
        const bloq = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
        return bloq.test(email);
    }

    //validar nombre
    inputnombre.addEventListener('input', function() {
        const errornombre = this.nextElementSibling;
        const valor = this.value;

        if (valor === '') {
            this.classList.remove('valid', 'error');
            errornombre.style.display = 'none';
        } else if (validarsololetras(valor) && valor.length >= 3) {
            this.classList.add('valid');
            this.classList.remove('error');
            errornombre.style.display = 'none';
        } else {
            this.classList.add('error');
            this.classList.remove('valid');
            errornombre.style.display = 'block';
        }
    });

    // solo esto está permitido
    inputnombre.addEventListener('keypress', function(e) {
        const char = String.fromCharCode(e.which);
        const bloq = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        if (!bloq.test(char)) {
            e.preventDefault();
        }
    });
    // validar apelli2
    inputapellidos.addEventListener('input', function() {
        const errorapellidos = this.nextElementSibling;
        const valor = this.value;

        if (valor === '') {
            this.classList.remove('valid', 'error');
            errorapellidos.style.display = 'none';
        } else if (validarsololetras(valor) && valor.length >= 3) {
            this.classList.add('valid');
            this.classList.remove('error');
            errorapellidos.style.display = 'none';
        } else {
            this.classList.add('error');
            this.classList.remove('valid');
            errorapellidos.style.display = 'block';
        }
    });

    // jaja los que no estan en bloq, bloqueados. joder agregué hasta caracteres raros por si alguien se pueda llamar como: o'donell
    inputapellidos.addEventListener('keypress', function(e) {
        const char = String.fromCharCode(e.which);
        const bloq = /^[a-zA-ZéíóúÁÉÍÓÚñÑ\s'-]+$/;
        if (!bloq.test(char)) {
            e.preventDefault();
        }
    });

    //validar email
    inputemail.addEventListener('input', function() {
        const errorEmail = this.nextElementSibling;
        const valor = this.value;

        if (valor === '') {
            this.classList.remove('valid', 'error');
            errorEmail.style.display = 'none';
        } else if (validaremail(valor)) {
            this.classList.add('valid');
            this.classList.remove('error');
            errorEmail.style.display = 'none';
        } else {
            this.classList.add('error');
            this.classList.remove('valid');
            errorEmail.style.display = 'block';
        }
    });

    // validar telefono
    inputelefono.addEventListener('input', function() {
        const errorTelefono = this.nextElementSibling;
        const valor = this.value;

        if (valor === '') {
            this.classList.remove('valid', 'error');
            errorTelefono.style.display = 'none';
        } else if (validarsolonumeros(valor) && valor.length === 9) {
            this.classList.add('valid');
            this.classList.remove('error');
            errorTelefono.style.display = 'none';
        } else {
            this.classList.add('error');
            this.classList.remove('valid');
            errorTelefono.style.display = 'block';
        }
    });

    // solo numeros. desde cuando viste numeros de telefono con letras y simbolos?
    inputelefono.addEventListener('keypress', function(e) {
        const char = String.fromCharCode(e.which);
        const bloq = /^[0-9]$/;

        if (!bloq.test(char)) {
            e.preventDefault();
        }
    });
    const formulario = document.getElementById('formulario-presupuesto');
    formulario.addEventListener('submit', function(e) {
        // al mandar, valida antes. si todo ok, pasa
        e.preventDefault();
        let formulariovalido = true;
        // validar nombre
        if (!inputnombre.value || !validarsololetras(inputnombre.value)) {
            inputnombre.classList.add('error');
            inputnombre.nextElementSibling.style.display = 'block';
            formulariovalido = false;
        }
        // validar apelli2
        if (!inputapellidos.value || !validarsololetras(inputapellidos.value)) {
            inputapellidos.classList.add('error');
            inputapellidos.nextElementSibling.style.display = 'block';
            formulariovalido = false;
        }
        // validar email
        if (!inputemail.value || !validaremail(inputemail.value)) {
            inputemail.classList.add('error');
            inputemail.nextElementSibling.style.display = 'block';
            formulariovalido = false;
        }
        // validar telefono
        if (!inputelefono.value || !validarsolonumeros(inputelefono.value)) {
            inputelefono.classList.add('error');
            inputelefono.nextElementSibling.style.display = 'block';
            formulariovalido = false;
        }
        // bro y el producto que
        const productoseleccionado = document.getElementById('producto-seleccionado');
        if (!productoseleccionado.value) {
            alert('Por favor, selecciona un producto');
            formulariovalido = false;
        }
        // validar condiciones. pasa porque pasa
        const condiciones = document.getElementById('condiciones');
        if (!condiciones.checked) {
            alert('Debes aceptar las condiciones de privacidad');
            formulariovalido = false;
        }

        //se resetea
        const botonreset = document.querySelector('.reset');
        botonreset.addEventListener('click', function() {
            inputoculto.value = '';
            selectexto.textContent = 'Selecciona un producto';
            const opciones = document.querySelectorAll('.option');
            opciones.forEach(opt => opt.classList.remove('selected'));
            selectpersonalizado.classList.remove('active');

            plazo.value = '';
            losextras.forEach(extra => extra.checked = false);
            total1.textContent = '0.00€';
            [inputnombre, inputapellidos, inputemail, inputelefono].forEach(input => {
                input.value = '';
                input.classList.remove('valid', 'error');
                if (input.nextElementSibling) input.nextElementSibling.style.display = 'none';
            });
            // hago focus en el campo del nombre con todo reseteado
            inputnombre.focus();
            console.log('amai, se reseteo todo');
        });

        //ufff que rico, lo ha puesto bien. consola para, no se, para ver si js esta haciendo su trabajo
        if (formulariovalido) {
            console.log('uff formulario valido - datos:', {
                nombre: inputnombre.value,
                apellidos: inputapellidos.value,
                email: inputemail.value,
                telefono: inputelefono.value,
                producto: productoseleccionado.value,
                plazo: document.querySelector('.plazo').value,
                presupuesto: document.querySelector('.valor-presupuesto').textContent
            });
            //vamos a avisarle que si hizo bien
            alert('Presupuesto enviado correctamente!');
        } else {
            //buuu, lo hiciste mal
            alert('Por favor, corrige los errores en el formulario');
        }
    });
});
