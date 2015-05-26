var main = (function () {

    var canvas = document.getElementById('world'),
        ctx = canvas.getContext('2d'),

        g = 0.02,
        t = 0,
        x = 0,
        vx = 10,
        y,
        vy,
        vy0 = 9,
        angle;

    function draw () {
        window.requestAnimationFrame(draw);

        if (y < 0) {

        }

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Horizontal
        x = vx * t * Math.cos(angle);

        // Vertical
        vy = vy0 - g * t;
        y = vy * t * Math.sin(angle) - 0.5 * g * Math.pow(t, 2);

        ctx.fillRect(x, window.innerHeight - y, 5, 5);

        t++;
    }

    var init = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('click', function (e) {
            angle = Math.atan2(window.innerHeight - e.clientY, e.clientX);
            console.log(angle);
            draw();
        }, false);
    };

    return {
        'init': init
    }
})();

window.onload = main.init;