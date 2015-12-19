function Game() {
    //Data
    this.player = new Player();

    //Functions
    this.tick = function () {
        this.player.puzzle.tick();
    }
    this.load = function () {
        this.player.puzzle.Reset();
    }
    this.loaded = function () {
        return true;
    }
};