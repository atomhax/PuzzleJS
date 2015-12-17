function Game(canvas) {
    //Data
    this._canvas = canvas;
    this._stats;
    this._fps = 60;
    this._interval = 1000 / _fps;
    this._images;
    this._puzzle;
    this._display;
    this._controller;
    this._keyboard;
    this._sounds;
    
    //Functions
    //Game Loop
    this._gameLoop = function () {
        setTimeout(function () {
            requestAnimationFrame(this.gameLoop);
            _controller.Run();
            _puzzle.Tick();
            _display.render(_puzzle.getBlocks(), _puzzle.getSelector(), _puzzle.getBlockInc(), _puzzle.getScore(), _puzzle.getLevel());

            _stats.update();
        }, interval);
    }

    this.run = function () {
        this._load();
    }
    this._load = function () {
        _images = new Images(this._setup);
        _images.load();
    }
    this._setup = function () {
        this._sounds = new Sounds();
        this._puzzle = new Puzzle();
        this._puzzle.Reset();
        this._controller = new Controller(this._puzzle);
        this._keyboard = new Keyboard(this._puzzle);
        this._keyboard.Run();
        this._display = new Display(_canvas, this._images)
        this._stats = new Stats();
        document.body.appendChild(this._stats.domElement);
        this._stats.domElement.style.position = 'absolute';
        this._stats.domElement.style.left = '10px';
        this._stats.domElement.style.top = '10px';

        //Start
        this._gameLoop();
    }


  
}