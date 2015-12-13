var materials;
var puzzle;
var display;
var fps = 60;
var renderStats;
var updateStats;
var controller;
var keyboard;

var BLOCK_COLORS = {
    Green: 1,
    Blue: 2,
    Red: 3,
    Purple: 4,
    Yellow: 5
};

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

    puzzle = new Puzzle(BLOCK_COLORS);
    controller = new Controller(puzzle);
    keyboard = new Controller(puzzle);
    display = new Display(document.getElementById('myCanvas'), materials, BLOCK_COLORS)
   
    renderStats = new Stats();
    //document.body.appendChild(renderStats.domElement);

    updateStats = new Stats();
    //document.body.appendChild(updateStats.domElement);

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
        //keyboard.Run();
        controller.Run();       
        renderStats.update();
        Draw();
    };
})();

function Start()
{
    puzzle.Reset();
    window.setInterval(this.GameLoop, 0);
}
function Draw()
{
    display.render(puzzle.blocks, puzzle.selector, puzzle.blockInc);
}
function GameTick()
{
    puzzle.Tick();
}