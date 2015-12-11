
var x = 0;
var blockOne;
var blockTwo;
function Start()
{
    var canvas = document.getElementById('myCanvas');
    blockOne = canvas.getContext('2d');

    //Block1 
    blockOne.beginPath();
    blockOne.rect(0, 50, 200, 100);
    blockOne.fillStyle = 'yellow';
    blockOne.fill();
    blockOne.lineWidth = 7;
    blockOne.strokeStyle = 'black';
    blockOne.stroke();


    //Block2
    blockTwo = canvas.getContext('2d');

    blockTwo.beginPath();
    blockTwo.rect(250, 50, 200, 100);
    blockTwo.fillStyle = 'yellow';
    blockTwo.fill();
    blockTwo.lineWidth = 7;
    blockTwo.strokeStyle = 'black';
    blockTwo.stroke();

    //Every 3 SEc Run this
    setInterval(function ()
    {
        x = x + 50;
        blockTwo.translate(300, 300);

    }, 3000);
}