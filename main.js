var main = (function () {

    var canvas = document.getElementById('world'),
        ctx = canvas.getContext('2d'),

        projectiles = [],
        cannonAngle,
        cannonRange,
        g = 0.02,
        vy0 = 10,
        vx0 = 10;


    function Projectile(o) {
        this.x = o.x;
        this.vx = o.vx;
        this.vy = o.vy;
        this.t = o.t;
        this.angle = o.angle;

        this.updateX = function () {
            this.x = this.vx * this.t * Math.cos(this.angle);
        };

        this.updateY = function () {
            this.vy = vy0 - g * this.t;
            this.y = this.vy * this.t * Math.sin(this.angle) - 0.5 * g * Math.pow(this.t, 2);
        };

        this.update = function () {
            this.updateX();
            this.updateY();
            this.t++;
        };
    }

    function drawCannon() {
        for (var t = 0; t <= cannonRange; t += 5) {
            var x = 10 * t * Math.cos(cannonAngle);
            var vy = 10 - g * t;
            var y = vy * t * Math.sin(cannonAngle) - 0.5 * g * Math.pow(t, 2);

            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.arc(x, window.innerHeight - y, 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    function draw () {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        drawCannon();

        for (var i = 0; i < projectiles.length; i++) {
            var p = projectiles[i];

            if (p.y < 0) {
                console.log('lool');
            }

            p.update();

            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.arc(p.x, window.innerHeight - p.y, 8, 0, 2 * Math.PI);
            ctx.fill();
        }

        i = projectiles.length;
        while (i--) {
            if (projectiles[i].y < 0) {
                projectiles.splice(i, 1);
            }
        }
    }

    var init = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('click', function (e) {
            projectiles.push(new Projectile({
                angle: Math.atan2(window.innerHeight - e.clientY, e.clientX),
                t: 0,
                x: 0,
                vx: vx0
            }));
        }, false);

        window.addEventListener('mousemove', function (e) {
            var v0 = Math.sqrt(vx0 * vx0 + vy0 * vy0);

            cannonAngle = Math.atan2(window.innerHeight - e.clientY, e.clientX);
            cannonRange = (2 * v0 * Math.sin(cannonAngle)) / g;
        });

        draw();
    };

    return {
        'init': init
    }
})();

window.onload = main.init;