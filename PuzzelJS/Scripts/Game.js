function Game(canvas) {
    //Data
    this._canvas = canvas;
    this._stats;
    this._fps = 60;
    this._interval = 1000 / this._fps;
    this._images;
    this._puzzle;
    this._display;
    this._controller;
    this._keyboard;
    this._sounds;
    this._waitForLoadInterval;
    //Functions
    //Game Loop
    this._gameLoop = function () {
        setTimeout(function () {
            requestAnimationFrame(this._gameLoop);
            this._controller.Run();
            this._puzzle.Tick();
            this._display.render(this._puzzle.getBlocks(), this._puzzle.getSelector(), this._puzzle.getBlockInc(), this._puzzle.getScore(), this._puzzle.getLevel());

            this._stats.update();
        }.bind(this), this._interval);
    }

    this.run = function () {
        this._load();
    }
    this._load = function () {
        this._images = new Images(this._setup);
        this._images.load();
        this._waitForLoadInterval = setInterval(function () {
            if (this._images.allFilesLoaded === true) {
                window.clearInterval(this._waitForLoadInterval);
                this._setup();
            }    
        }.bind(this), 10);
    }

    this._setup = function () {
        //

        this._sounds = new Sounds();
        this._puzzle = new Puzzle();
        this._puzzle.Reset();
        this._controller = new Controller(this._puzzle);
        this._keyboard = new Keyboard(this._puzzle);
        this._keyboard.Run();
        this._display = new Display(this._canvas, this._images)
        this._stats = new Stats();
        document.body.appendChild(this._stats.domElement);
        this._stats.domElement.style.position = 'absolute';
        this._stats.domElement.style.left = '10px';
        this._stats.domElement.style.top = '10px';

        //Start
        this._gameLoop();
    };

    //Context Issue
    //Rights Issue
  
}