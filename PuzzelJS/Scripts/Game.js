var materials;
var blocks;
var display;

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
   
    Start();
}
function Start()
{
    for (var i = 0; i < 14; i++)
    {
        for (var j = 0; j < 6; j++) {
            blocks.push(new Block(materials.blockSVG, j * 50, i * 50, true));
        }
    }

    display.render(blocks);
}
