function Display(canvas, materials, BLOCK_COLORS) {

    //Constants
    this.BLOCK_COLORS = BLOCK_COLORS;

    //Data
    this._materials = materials;
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');
    
    //Functions
    this.render = function (blocks, selector, blockInc) {
        this._clearScreen();
        this._drawBlockArea();
        this._drawBlocks(250, 650, blocks, blockInc);
        this._drawSelector(250, 650, selector, blockInc);
        this._drawBlockHiddenEnter();
        this._drawBlockHiddenExit();   
    };
    this._clearScreen = function () {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    };
    this._drawBlockArea = function (blocks) {
        this._context.rect(248, 45, 304, 710);

        this._context.stroke();
    }
    this._drawSelector = function (startX, startY, selector, blockInc) {
        this._context.drawImage(
              this._materials.selecter,
              startX + (selector.col - 1) * 50,
              startY - (selector.row - 1) * 50 - blockInc,
              100,
              50
          );
    }
    this._drawBlockHiddenEnter = function (blocks) {
        this._context.fillStyle = "#707070";
        this._context.fillRect(248, 700, 304, 55);
        this._context.stroke();
    }
    this._drawBlockHiddenExit = function (blocks) {
        this._context.fillStyle = "#707070";
        this._context.fillRect(248, 45, 304, 55);

        this._context.stroke();
    }
    this._drawBlocks = function (startX, startY, blocks, blockInc) {
        for (var i = 0; i < blocks.length; i++) {
            this._context.drawImage(
                this._GetBlockSrc(blocks[i].color),
                startX + (blocks[i].col - 1) * 50 + blocks[i].x,
                startY - (blocks[i].row - 1) * 50 + blocks[i].y - blockInc,
                50,
                50
            );
        }
    }
    this._GetBlockSrc = function (color) {
        if (BLOCK_COLORS.Green == color) {
            return this._materials.blockGreen;
        }
        if (BLOCK_COLORS.Blue == color) {
            return this._materials.blockBlue;
        }
        if (BLOCK_COLORS.Red == color) {
            return this._materials.blockRed;
        }
        if (BLOCK_COLORS.Purple == color) {
            return this._materials.blockPurple;
        }
        if (BLOCK_COLORS.Yellow == color) {
            return this._materials.blockYellow;
        }
    }

  
};
