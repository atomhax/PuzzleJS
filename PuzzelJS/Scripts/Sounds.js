// JavaScript source code
function Sounds(option) {


    
  
    if (option == "music") {
        music = new Audio('/Content/Files/Music.mp3');
        music.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
        music.play();
    }
    if (option == "swap") {
        swap = new Audio("/Content/Files/Swap.mp3");
        swap.play();
    }
    if (option == "clear") {
        clear = new Audio("/Content/Files/clear.ogg");
        clear.play();
    }
    if (option == "drop") {
        drop = new Audio("/Content/Files/drop.ogg");
        drop.play();
    }


};