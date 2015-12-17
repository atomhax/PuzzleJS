function Game(canvas) {
    //Data
    var _canvas;
    var _stats;
    var _fps = 60;
    var _interval = 1000 / fps;
    var _images;
    var _puzzle;
    var _display;
    var _controller;
    var _keyboard;
    var _sounds;

    //Functions
    this.run = function () {
        this._load();
    }
    this._load = function () {
        _images = new Images();
        _images.Load(this._setup);
    }
    this._setup = function () {
        _sounds = new Sounds();
        _puzzle = new Puzzle(BLOCK_COLORS, sounds);
        _puzzle.Reset();
        _controller = new Controller(puzzle);
        _keyboard = new Keyboard(puzzle);
        _keyboard.Run();
        _display = new Display(_canvas, _images)
        _stats = new Stats();
        document.body.appendChild(_stats.domElement);
        _stats.domElement.style.position = 'absolute';
        _stats.domElement.style.left = '10px';
        _stats.domElement.style.top = '10px';

        //Start
        this._gameLoop();
    }


    //Game Loop
    this._gameLoop = function() {
        setTimeout(function () {
            requestAnimationFrame(this.gameLoop);
            _controller.Run();
            _puzzle.Tick();
            _display.render(_puzzle.getBlocks(), _puzzle.getSelector(), _puzzle.getBlockInc(), _puzzle.getScore(), _puzzle.getLevel());

            _stats.update();
        }, interval);
    }
}