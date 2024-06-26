window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

var canvas = $("#particles");

var ctx = null;

if ($("#particles").length){
    ctx = canvas[0].getContext("2d");
}
    
var W = $("#carousel-main").width() + 200, H = $("#carousel-main").height() + 300;

var particleCount = 50,
    particles = [],
    minDist = 100,
    dist;

function paintCanvas() {
    ctx.fillRect(0, 0, W, H);
}

function clearCanvas() {
    ctx.clearRect(0, 0, W, H);
}

function Particle() {
    this.radius = 2 + Math.random() * 3;

    this.x = Math.random() * W;
    this.y = Math.random() * H;

    //if (this.x > W - this.radius * 2) this.x = this.x - this.radius;
    //else if (this.x < this.radius * 2) this.x = this.x + this.radius;
    //if (this.y > H - this.radius * 2) this.y = this.y - this.radius;
    //else if (this.y < this.radius * 2) this.y = this.y + this.radius;     

    this.opacity = 0.5;

    this.vx = -1 + Math.random() * 2;
    this.vy = -1 + Math.random() * 2;

    this.vx_i = this.vx;
    this.vy_i = this.vy;

    this.draw = function () {
        var p = this;
        var radius = p.radius;
        var opacity = p.opacity;

        var color_value = 'rgba(250,210,0,' + opacity + ')';
        ctx.fillStyle = color_value;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();

        ctx.fill();
    }
}

for (var i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function draw() {
    clearCanvas();

    update();

    for (var i = 0; i < particles.length; i++) {
        p = particles[i];
        p.draw();
    }
}

function update() {
    for (var i = 0; i < particles.length; i++) {
        p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x + p.radius > W) {
            p.x = p.radius;
            resetV(p);
        }
        else if (p.x - p.radius < 0) {
            p.x = W - p.radius;
            resetV(p);
        }

        if (p.y + p.radius > H) {
            p.y = p.radius;
            resetV(p);
        }
        else if (p.y - p.radius < 0) {
            resetV(p);
            p.y = H - p.radius;
        }

        for (var j = i + 1; j < particles.length; j++) {
            p2 = particles[j];
            distance(p, p2);
        }
    }
}

function resetV(p) {
    p.vx = p.vx_i;
    p.vy = p.vy_i;
}

function distance(p1, p2) {
    var dist,
        dx = p1.x - p2.x,
        dy = p1.y - p2.y;

    dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= minDist) {
        var ax = dx / (45000),
            ay = dy / (45000);

        p1.vx -= ax;
        p1.vy -= ay;

        p2.vx += ax;
        p2.vy += ay;

        var line = 1 - (dist / 100)

        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255," + line + ")";
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.closePath();
    }
}

function setCanvas() {
    W = $("#carousel-main").width() + 200;
    H = $("#carousel-main").height() + 300;
    canvas.attr('width', W);
    canvas.attr('height', H);
}


function animloop() {
    var run = checkBrowser();
    
    if (run) {
        setCanvas();
        draw();
        requestAnimFrame(animloop);
        window.addEventListener('resize', function () {
            setCanvas();
        });
    }    
}

function checkBrowser() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE");
    
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        return false
    }
    else {
        return true;
    }
}

if(ctx != null)
    animloop();