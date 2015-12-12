function Display( canvas, materials, BLOCK_COLORS) {
    //Data
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');
    this.materials = materials;
    this.BLOCK_COLORS = BLOCK_COLORS;
    
    //Functions
    this.render = function ( blocks ) {
        this.clearScreen();
       this._drawBlockArea();

        this._drawBlocks(250, 700, blocks);
        this._drawBlockHiddenEnter();
        this._drawBlockHiddenExit();   
    };
    this.clearScreen = function () {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    };
    this._drawBlockArea = function (blocks) {
        this._context.rect(248, 45, 304, 710);

        this._context.stroke();
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
    this._drawBlocks = function (xOffset, yOffSet, blocks) {
        for (var i = 0; i < blocks.length; i++) {
            this._context.drawImage(this._GetBlockSrc(blocks[i].color), xOffset + blocks[i].x, yOffSet + blocks[i].y, 50, 50);
        }
    }
    this._GetBlockSrc = function (color) {
        if (BLOCK_COLORS.Green == color) {
            return this.materials.blockGreen;
        }
        if (BLOCK_COLORS.Blue == color) {
            return this.materials.blockBlue;
        }
        if (BLOCK_COLORS.Red == color) {
            return this.materials.blockRed;
        }
        if (BLOCK_COLORS.Purple == color) {
            return this.materials.blockPurple;
        }
        if (BLOCK_COLORS.Yellow == color) {
            return this.materials.blockYellow;
        }
    }

  
};
