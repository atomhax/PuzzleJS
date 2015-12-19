function GameManager( canvas ) {
    //Data
    this.displayManager = new DisplayManager( canvas );
    this.inputManager = new InputManager();
    this.audioManager = new AudioManager();

    //Functions
    this.load = function () {
        this.displayManager.load();
        this.inputManager.load();
        this.audioManager.load();
    }
    this.loaded = function () {
        if( this.displayManager.loaded() === true && 
            this.inputManager.loaded() === true &&
            this.audioManager.loaded() === true) {
            return true;
        } else {
            return false;
        }
    }

}