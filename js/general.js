document.addEventListener('DOMContentLoaded', function() {

    //aqui no hay json
    const botontema = document.querySelector('.tema');
    const imgtema = document.querySelector('.tema img');
    if (!botontema) {
        console.error('bro y el .tema?');
        return;
    }
    botontema.addEventListener('click', function() {
        console.log(botontema, ': cabrones no me miren');
        document.body.classList.toggle('oscuro');

        const modoscuro = document.body.classList.contains('oscuro');

        if (modoscuro) {
            if (imgtema) imgtema.src = '../img/tema/oscuro.png';

            console.log("*se vuelve al lado oscuro*");

            document.querySelectorAll('.plus span').forEach(s => s.style.color = 'white');
            document.querySelectorAll('.plus1 span').forEach(s => s.style.color = 'white');
        } else {
            if (imgtema) imgtema.src = '../img/tema/claro.png';

            console.log("a quemar ojos");

            document.querySelectorAll('.plus span').forEach(s => s.style.color = '');
            document.querySelectorAll('.plus1 span').forEach(s => s.style.color = '');
        }
    });

    const canvas = document.querySelector(".estrellitas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const numestrellas = 200;
    let stars = [];

    for (let i = 0; i < numestrellas; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random(),
            speed: Math.random() * 0.02
        });
    }
    // funcion para todo en 1
    function drawestrellas() {
        const colorestrellas = document.body.classList.contains("oscuro") ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)";
        const colorfondo = document.body.classList.contains("oscuro") ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)";

        ctx.fillStyle = colorfondo;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // dibuja estrellas
        stars.forEach(star => {
            ctx.globalAlpha = star.alpha;
            ctx.fillStyle = colorestrellas;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            star.alpha += star.speed;
            if (star.alpha <= 0 || star.alpha >= 1) {
                star.speed = -star.speed;
            }
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(drawestrellas);
    }
    drawestrellas();
});
