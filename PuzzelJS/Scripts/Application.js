function Application(canvas) {
    //Data
    this._model = new Game();
    this._controller = new GameController();
    this._view = new GameManager();
    this._stats = new Stats();

    this._waitForLoadInterval;
    this.run = function () {
        this._load();
    }
    this.end = function () {
        this._controller.end();
    }

    this._load = function () {
        this._model.Load();
        this._view.Load(this._setup);
               this._gameLoop();
        this._waitForLoadInterval = setInterval(function () {
            if (this._view.ImageManger.allFilesLoaded === true) {
                window.clearInterval(this._waitForLoadInterval);
                this._gameLoop();
            }
        }.bind(this), 10);
    }
    this._gameLoop = function () {
        setTimeout(function () {
            requestAnimationFrame(this._gameLoop);
            this._controller.run();
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