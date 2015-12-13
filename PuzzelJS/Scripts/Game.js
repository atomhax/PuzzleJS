var materials;
var puzzle;
var display;
var renderStats;
var updateStats;
var controller;
var keyboard;
var sounds;
var fps = 60;
var interval = 1000 / fps;

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
    sounds = new Sounds();
    puzzle = new Puzzle(BLOCK_COLORS, sounds);
    controller = new Controller(puzzle);
    keyboard = new Keyboard(puzzle);
    keyboard.Run();
    display = new Display(document.getElementById('myCanvas'), materials, BLOCK_COLORS, sounds)
  
    stats = new Stats();
    document.body.appendChild(stats.domElement);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '10px';
    stats.domElement.style.top = '10px';

    Start();
}

//Game Loop
function GameLoop() {
    setTimeout(function () {

        var a = performance.now();


        requestAnimationFrame(GameLoop);
        controller.Run();
        GameTick();
       
        Draw()
        var b = performance.now();
        if ((b - a) > 1)
            console.log((b - a) + ' ms.');
        stats.update();
    }, interval);
}


function Start()
{
    puzzle.Reset();
    GameLoop();
}
function Draw()
{
    display.render(puzzle.blocks, puzzle.selector, puzzle.blockInc);  
}
function GameTick()
{
    puzzle.Tick();
}