function Game() {
    //Data
    this.player = new Player();
    this.networkPlayers = new Array();
    
    //Functions
    this.tick = function () {
        this.player.puzzle.tick();
    }
    this.load = function () {
        this.player.puzzle.Reset();

       // this.otherPlayers(
    }
    this.loaded = function () {
        return true;
    }
};