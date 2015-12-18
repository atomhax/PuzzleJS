function Display(canvas, images) {
    //Data
    this._images = images;
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');

    //Functions
    this.render = function (blocks, selector, blockInc, score, level) {
        this._clearScreen();
        this._drawBlockArea();
        this._drawScore(score);
        this._drawLevel(level);
        this._drawBlocks(250, 650, blocks, blockInc);
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
            this._images.layout,
            247,
            43,
            306,
            660
        );
    }
    this._drawSelector = function (startX, startY, selector, blockInc) {
        this._context.drawImage(
              this._images.selecter,
              startX + (selector.col - 1) * 50,
              startY - (selector.row - 1) * 50 - blockInc,
              100,
              50
          );
    }
    this._drawBlocks = function (startX, startY, blocks, blockInc) {
        for (var i = 0; i < blocks.length; i++) {

            this.remove = true;
            this.removeTick = 0;
            this.startRemoveAtTick = 0;
            this.fullRemoveAtTick = 0;
            if (blocks[i].row === 0)
            {
                var yCutOff = 50 - blockInc;
                this._context.drawImage(
                   this._GetBlockImage(blocks[i]),
                    0,
                    0,
                    50,
                    50 - yCutOff,
                    startX + (blocks[i].col - 1) * 50 + blocks[i].x,
                    startY - (blocks[i].row - 1) * 50 + blocks[i].y - blockInc,
                    50,
                    50 - yCutOff
                );
            }
            else
            {
                this._context.drawImage(
                              this._GetBlockImage(blocks[i]),
                              startX + (blocks[i].col - 1) * 50 + blocks[i].x,
                              startY - (blocks[i].row - 1) * 50 + blocks[i].y - blockInc,
                              50,
                              50
                          );
            }
          
        }
        
    }
    this._GetBlockImage = function (block) {

        if (block.state === BlockState.Remove) {
            return this._images.block;
        }

        if (Color.Green == block.color) {
            return this._images.blockGreen;
        }
        if (Color.Blue == block.color) {
            return this._images.blockBlue;
        }
        if (Color.Red == block.color) {
            return this._images.blockRed;
        }
        if (Color.Purple == block.color) {
            return this._images.blockPurple;
        }
        if (Color.Yellow == block.color) {
            return this._images.blockYellow;
        }
    }
};
