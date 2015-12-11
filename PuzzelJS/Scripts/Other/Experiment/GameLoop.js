
//Game Loop
var canvas = document.getElementById("cnvBase");
var context = canvas.getContext("2d");
var fpsMeter = new FPSMeter();
var now, dt, last, step;

function Setup() {
    dt = 0;
    last = timestamp();
    step = 1 / 60;

    shipImage.src = '/SpaceShooter/img/red_small.png';
    playerImage.src = '/SpaceShooter/img/blue_small.png';
}

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}



function frame() {
    fpsMeter.tickStart();
    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    while (dt > step) {
        dt = dt - step;
        game.Update(step);
    }
    Render(dt);
    last = now;
    fpsMeter.tick();
    requestAnimationFrame(frame);
}
function Start() {
    Setup();
    game.Setup();
    requestAnimationFrame(frame);
}