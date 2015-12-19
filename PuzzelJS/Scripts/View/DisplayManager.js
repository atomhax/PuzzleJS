function DisplayManager( canvas ) {
    //Data
    this._imageManager = new ImageManager();
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');

    //render
    this.load = function () {
        this._imageManager.load();
    }
    this.loaded = function () {
        return this._imageManager.loaded();
    }
    this.render = function (blocks, selector, blockInc, score, level) {
        this._clearScreen();
        this._drawBlockArea();
        this._drawScore(score);
        this._drawLevel(level);
        this._drawBlocks(250, 650, blocks, blockInc, selector);
        this._drawSelector(250, 650, selector, blockInc);
    };
    this._clearScreen = function () {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    };
    this._drawLevel = function (level) {
        this._context.font = '30px Arial';
        this._context.fillStyle = 'white';
        this._context.fillText(level, 279, 83);
    }
    this._drawScore = function (score) {
        this._context.font = '30px Arial';
        this._context.fillStyle = 'white';
        this._context.fillText(score, 440, 83);
    }
    this._drawBlockArea = function () {

        this._context.drawImage(
            this._imageManager.layout,
            247,
            43,
            306,
            660
        );
    }
    this._drawSelector = function (startX, startY, selector, blockInc) {
        this._context.drawImage(
              this._imageManager.selecter,
              startX + (selector.col - 1) * 50,
              startY - (selector.row - 1) * 50 - blockInc,
              100,
              50
          );
    }
    this._drawBlocks = function (startX, startY, blocks, blockInc, selector) {


        for (var i = 0; i < blocks.length; i++) {
            var selectorOffsetX = 0;
            if (selector.leftSelection === blocks[i] && blocks[i].state === BlockState.Swap){
                selectorOffsetX += selector.OFF_SET_PER_TICK * selector.ticks;
            }
            else if (selector.rightSelection === blocks[i] && blocks[i].state === BlockState.Swap) {
                selectorOffsetX += -selector.OFF_SET_PER_TICK * selector.ticks;
            }
            this.remove = true;
            this.removeTick = 0;
            this.startRemoveAtTick = 0;
            this.fullRemoveAtTick = 0;
            if (blocks[i].row === 0)
            {
                var yCutOff = 50 - blockInc;
                this._context.drawImage(
                   this.getBlockImage(blocks[i]),
                    0,
                    0,
                    50,
                    50 - yCutOff,
                    startX + (blocks[i].col - 1) * 50 + selectorOffsetX,
                    startY - (blocks[i].row - 1) * 50 - blockInc,
                    50,
                    50 - yCutOff
                );
            }
            else
            {
                this._context.drawImage(
                              this.getBlockImage(blocks[i]),
                              startX + (blocks[i].col - 1) * 50 + selectorOffsetX,
                              startY - (blocks[i].row - 1) * 50 - blockInc,
                              50,
                              50
                          );
            }
          
        }
        
    }
    this.getBlockImage = function (block) {

        if (block.state === BlockState.Remove) {
            return this._imageManager.block;
        }

        if (Color.Green == block.color) {
            return this._imageManager.blockGreen;
        }
        if (Color.Blue == block.color) {
            return this._imageManager.blockBlue;
        }
        if (Color.Red == block.color) {
            return this._imageManager.blockRed;
        }
        if (Color.Purple == block.color) {
            return this._imageManager.blockPurple;
        }
        if (Color.Yellow == block.color) {
            return this._imageManager.blockYellow;
        }
    }
};
