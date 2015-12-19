function Application(canvas) {
    //Data
    //Model
    this._game = new Game();

    //Controller
    this._gameController = new GameController();

    //View
    this._gameManager = new GameManager(canvas);

    //Stats
    this._stats = new Stats();

    this._waitForLoadInterval;
    this.run = function () {
        this._load();
    }
    this.end = function () {
        this._controller.end();
    }

    this._load = function () {
        this._game.load();
        this._gameManager.load(this._setup);
               this._gameLoop();
        this._waitForLoadInterval = setInterval(function () {
            if (this._gameManager.loaded() === true) {
                window.clearInterval(this._waitForLoadInterval);
                this._gameLoop();
            }
        }.bind(this), 10);
    }
    this._gameLoop = function () {
        setTimeout(function () {
            requestAnimationFrame(this._gameLoop);
            this._gameController.tick(this._game, this._gameManager);
            this._stats.update();
        }.bind(this), this._interval);
    }.bind(this);
    this._setup = function () {
        this._stats = new Stats();
        document.body.appendChild(this._stats.domElement);
        this._stats.domElement.style.position = 'absolute';
        this._stats.domElement.style.left = '10px';
        this._stats.domElement.style.top = '10px';

        //Start
        this._gameLoop();
    }.bind(this);

}