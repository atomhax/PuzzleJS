function Display( canvas ) {
    //Data
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');

    //Functions
    this.render = function ( blocks ) {
        this.clearScreen();
      //  this._drawBlockArea();

        this._drawBlocks(250, 50, blocks);
     //   this._drawBlockHiddenEnter();
     //   this._drawBlockHiddenExit();   
    };
    this.clearScreen = function () {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    };
    this._drawBlockArea = function (blocks) {
        this._context.rect(245, 45, 310, 710);

        this._context.stroke();
    }
    this._drawBlockHiddenEnter = function (blocks) {
        this._context.fillStyle = "#707070";
        this._context.fillRect(245, 700, 310, 55);
        this._context.stroke();
    }
    this._drawBlockHiddenExit = function (blocks) {
        this._context.fillStyle = "#707070";
        this._context.fillRect(245, 45, 310, 55);

        this._context.stroke();
    }
    this._drawBlocks = function (xOffset, yOffSet, blocks) {
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].visible === true) {
                this._context.drawImage(blocks[i].svg, xOffset + blocks[i].x, yOffSet + blocks[i].y, blocks[i].width, blocks[i].height);
            }
        }
    }
    
};
