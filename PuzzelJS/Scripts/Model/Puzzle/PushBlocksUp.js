function MoveBlocksUp( puzzle ) {

    //Data
    this._TICKS_FOR_BLOCK_ROW_CHANGE = 50;
    this.blockInc;
    this._puzzle = puzzle;
    this._tick = 0;

    this.pushBlocksOn = false;
    this.pushBlocksEnd = false;

    //Functions
    this.reset = function () {
        this.pushBlocksOn = false;
        this.pushBlocksEnd = false;
        this._ticksperSet = 0;
        this.blockInc = 0;
    }
    this.tick = function ()
    {
        this._tick++;
        if (this.pushBlocksOn === false) {
            //10 standard
            if (this._puzzle._level <= 10 && this._tick % (96 - Math.round(7.3 * (this._puzzle._level - 1))) === 0) {
                this.blockInc += 5;
            }

            //Hard
            if (this._puzzle._level > 10 && this._puzzle._level < 15 && this._tick % (30 - Math.round(3 * (this._puzzle._level - 10))) === 0) {
                this.blockInc += 5;
            }

            //Hard(Over time)
            if (this._puzzle._level >= 15 && this._tick % (30 - Math.round(2 * (this._puzzle._level - 15))) === 0) {
                this.blockInc += 5;
            }

            if (this._puzzle._level < 20 && this._puzzle.totalTicks % (60 * 20) === 0) {
                this._puzzle._level += 1;
            }
        } else {

            if (this._tick % 1 === 0 && this.blockInc != 50) {
                this.blockInc += 2.5;
            }


            if (this.blockInc === 50 && this.pushBlocksEnd === true) {
                this.pushBlocksEnd = false;
                this.pushBlocksOn = false;
                this._tick = 0;
            }
        }


        if (this.blockInc == 50) {
            this._tick = 0;
            this._rowChange();
            var sets = this._puzzle._findBlockSets.run();
            if (sets.length > 0) {
                this._puzzle._removeBlocks.removeSetsOfBlocks(sets);
            }
        }

    };
    this.clearMoveBlocksUp = function () {
        this.pushBlocksOn = false;
        this.pushBlocksEnd = false;
        this._tick = 0;
    }
    //Private  
    this._rowChange = function () {
        this._puzzle._isPlayeralive();
        if (this._puzzle.active) {
            this.blockInc = 0;
            this._moveBlocksUpOneRow();
            this._puzzle._selector.moveUp();
            this._puzzle._addBlockRow(0);
        }
    }
    this._moveBlocksUpOneRow = function () {
        for (var i = 0; i < this._puzzle._blocks.length; i++) {
            this._puzzle._blocks[i].row++;
        }
    }
  
}