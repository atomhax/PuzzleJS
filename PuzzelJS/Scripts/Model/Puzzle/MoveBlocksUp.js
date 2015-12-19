function MoveBlocksUp( puzzle ) {

    //Data
    this._TICKS_FOR_BLOCK_ROW_CHANGE = 50;
    this.blockInc;
    this._puzzle = puzzle;
    this._tick = 0;

    this._pushBlocksOn = false;
    this._pushBlocksEnd = false;

    //Functions
    this.reset = function () {
        this._pushBlocksOn = false;
        this._pushBlocksEnd = false;
        this._ticksperSet = 0;
        this.blockInc = 0;
    }
    this.tick = function ()
    {
        if (this._pushBlocksOn === false) {
            this._ticksperSet++;
            //10 standard
            if (this._puzzle._level <= 10 && this._ticksperSet % (96 - Math.round(7.3 * (this._puzzle._level - 1))) === 0) {
                this.blockInc += 5;
            }

            //Hard
            if (this._puzzle._level > 10 && this._puzzle._level < 15 && this._ticksperSet % (30 - Math.round(3 * (this._puzzle._level - 10))) === 0) {
                this.blockInc += 5;
            }

            //Hard(Over time)
            if (this._puzzle._level >= 15 && this._ticksperSet % (30 - Math.round(2 * (this._puzzle._level - 15))) === 0) {
                this.blockInc += 5;
            }

            if (this._puzzle._level < 20 && this._puzzle.totalTicks % (60 * 20) === 0) {
                this._puzzle._level += 1;
            }
        } else {
            this._ticksperSet++;
            if (this._ticksperSet % 1 === 0 && this.blockInc != 50) {
                this.blockInc += 2.5;
            }


            if (this.blockInc === 50 && this._pushBlocksEnd === true) {
                this._pushBlocksEnd = false;
                this._pushBlocksOn = false;
                this._ticksperSet = 0;
            }
        }


        if (this.blockInc == 50) {
            this._ticksperSet = 0;
            this._rowChange();
            var sets = this._puzzle._getNewSets.run();
            if (sets.length > 0) {
                this._puzzle._removeSet.removeSets(sets);
            }
        }

    };
    this.clearMoveBlocksUp = function () {
        this._pushBlocksOn = false;
        this._pushBlocksEnd = false;
        this._tick = 0;
    }
    //Private  
    this._rowChange = function () {
        this._puzzle._support.isPlayeralive();
        if (this._puzzle.active) {
            this.blockInc = 0;
            this._moveBlocksUpOneRow();
            this._puzzle._selector.moveUp();
            this._addBlockRow();
        }
    }
    this._moveBlocksUpOneRow = function () {
        for (var i = 0; i < this._puzzle._blocks.length; i++) {
            this._puzzle._blocks[i].row++;
        }
    }
    this._addBlockRow = function () {
        for (var i = 0; i < 6; i++) {
            var row = 0;
            var col = i + 1;

            //Get Vaild random Color
            var randomColor;
            do {
                randomColor = this._puzzle._support.randomColor();
            } while (!this._puzzle._support.isNewBlockVaild(row, col, randomColor))

            this._puzzle._blocks.push(new Block(row, col, randomColor, 0, 0));
        }
    }
}