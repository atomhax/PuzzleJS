var materials;
var blocks;
var display;
var fps = 60;
var renderStats;
var updateStats;

function Load()
{
    materials = new Materials();
    materials.Load(this.FinshLoad);
} 
function FinshLoad() {
    Setup();
}
function Setup()
{
    blocks = [];
    display = new Display(document.getElementById('myCanvas'))
   
    renderStats = new Stats();
    document.body.appendChild(renderStats.domElement);

    updateStats = new Stats();
    document.body.appendChild(updateStats.domElement);

    Start();
}

//Game Loop
this.GameLoop = (function () {
    var loops = 0, skipTicks = 1000 / fps,
        maxFrameSkip = 10,
        nextGameTick = (new Date).getTime();

    return function () {
        loops = 0;

        while ((new Date).getTime() > nextGameTick) {
            updateStats.update();
            GameTick();
            nextGameTick += skipTicks;
            loops++;
        }
        renderStats.update();
        Draw();
    };
})();

function Start()
{
    for (var i = 0; i < 500; i++)
    {
        for (var j = 0; j < 6; j++) {
            blocks.push(new Block(materials.block, j * 50, i * 50, true));
        }
    }

    window.setInterval(this.GameLoop, 0);
}
function Draw()
{
    display.render(blocks);
}
function GameTick()
{
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].y = blocks[i].y - 1;
    }
}