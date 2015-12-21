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
    this.render = function (playersRenderData) {
        this._clearScreen();
        var percent = 0.25;
        for (var i = 0; i < playersRenderData.length; i++) {

            this.renderPlayer((i % 20) * (320 - 0) * percent, (Math.floor(i / 20) * 680) * percent, percent, playersRenderData[i]);
        }

       // this.renderPlayer(0, 0, playersRenderData[0]);
    };

    this.renderPlayer = function (xOffset, yOffset, percent, playersRenderData) {
        this._drawBlockArea(xOffset, yOffset, percent);
        this._drawScore(xOffset, yOffset, percent, playersRenderData.score);
        this._drawLevel(xOffset, yOffset, percent, playersRenderData.level);
        this._drawBlocks(xOffset, yOffset, percent, playersRenderData.blocks, playersRenderData.blockInc, playersRenderData.selector);



        if(playersRenderData.selector != null) {
            this._drawSelector(xOffset, yOffset, percent, playersRenderData.selector, playersRenderData.blockInc);
        }
    
    };


    this._clearScreen = function () {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    };
    this._drawLevel = function (xOffset, yOffset, percent, level) {
        var fontsize = 30 * percent;

        this._context.font = '' + fontsize + 'px Arial';
        this._context.fillStyle = 'white';
        this._context.fillText(level, (279) * percent + xOffset, (83) * percent + yOffset);
    }
    this._drawScore = function (xOffset, yOffset,percent, score) {
        var fontsize = 30 * percent;

        this._context.font = ''+ fontsize + 'px Arial';
        this._context.fillStyle = 'white';
        this._context.fillText(score, (440) * percent + xOffset, (83) * percent + yOffset);
    }
    this._drawBlockArea = function (xOffset, yOffset, percent) {

        this._context.drawImage(
            this._imageManager.layout,
            xOffset + (247) * percent,
            yOffset + (43) * percent,
            (306) * percent,
            (660) * percent
        );
    }
    this._drawSelector = function (xOffset, yOffset, percent, selector, blockInc) {
        var startX = 250;
        var startY = 650;
        this._context.drawImage(
              this._imageManager.selector,
              xOffset + (startX + (selector.col - 1) * 50) * percent,
              yOffset + (startY - (selector.row - 1) * 50 - blockInc) * percent,
              (100) * percent,
              (50) * percent
          );
    }
        this._drawBlocks = function (xOffset, yOffset, percent, blocks, blockInc, selector) {
        var startX =250;
        var startY = 650;

        for (var i = 0; i < blocks.length; i++) {
            var selectorOffsetX = 0;
            if(selector != null){
                if (selector.leftSelection === blocks[i] && blocks[i].state === BlockState.Swap){
                    selectorOffsetX += selector.OFF_SET_PER_TICK * selector.ticks;
                }
                else if (selector.rightSelection === blocks[i] && blocks[i].state === BlockState.Swap) {
                    selectorOffsetX += -selector.OFF_SET_PER_TICK * selector.ticks;
                }
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
                    (50 - yCutOff),
                    xOffset + (startX + (blocks[i].col - 1) * 50 + selectorOffsetX) * percent,
                    yOffset + (startY - (blocks[i].row - 1) * 50 - blockInc) * percent,
                    (50) * percent,
                    (50 - yCutOff) * percent
                 );

           
            }
            else
            {
                this._context.drawImage(
                              this.getBlockImage(blocks[i]),
                              xOffset + (startX + (blocks[i].col - 1) * 50 + selectorOffsetX) * percent,
                              yOffset + (startY - (blocks[i].row - 1) * 50 - blockInc) * percent,
                              (50) * percent,
                              (50) * percent
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
