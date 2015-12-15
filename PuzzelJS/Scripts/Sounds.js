// JavaScript source code
function Sounds(option) {


    
  
    if (option == "music") {
        var music = new Audio("/Content/Files/Music.mp3");
        music.play();
    }
    if (option == "swap") {
        var swap = new Audio("/Content/Files/Swap.mp3");
        swap.play();
    }
    if (option == "clear") {
        var clear = new Audio("/Content/Files/clear.ogg");
        clear.play();
    }
    if (option == "drop") {
        var drop = new Audio("/Content/Files/drop.ogg");
        drop.play();
    }


};