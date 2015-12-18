﻿function MoveBlocksUp( puzzle ) {

    //Data
    this._TICKS_FOR_BLOCK_ROW_CHANGE = 50;
    this._puzzle = puzzle;
    this._tick = 0;
    this._blockInc;
    this._pushBlocksOn = false;
    this._pushBlocksEnd = false;

    //Functions
    this.reset = function () {
        this.PushBlocksStop = false;
        this._ticksperSet = 0;
        this.blockInc = 0;
    }
    this.tick = function ()
    {
        if (this.PushBlocks === false) {
            this._ticksperSet++;
            //10 standard
            if (this.puzzle.level <= 10 && this._ticksperSet % (96 - Math.round(7.3 * (this.puzzle.level - 1))) === 0) {
                this.blockInc += 5;
            }

            //Hard
            if (this.puzzle.level > 10 && this.puzzle.level < 15 && this._ticksperSet % (30 - Math.round(3 * (this.puzzle.level - 10))) === 0) {
                this.blockInc += 5;
            }

            //Hard(Over time)
            if (this.puzzle.level >= 15 && this._ticksperSet % (30 - Math.round(2 * (this.puzzle.level - 15))) === 0) {
                this.blockInc += 5;
            }

            if (this.puzzle.level < 20 && this.puzzle.totalTicks % (60 * 20) === 0) {
                this.puzzle.level += 1;
            }
        } else {
            this._ticksperSet++;
            if (this._ticksperSet % 1 === 0 && this.blockInc != 50) {
                this.blockInc += 2.5;
            }


            if (this.blockInc === 50 && this.PushBlocksStop === true) {
                this.PushBlocksStop = false;
                this.PushBlocks = false;
                this._ticksperSet = 0;
            }
        }


        if (this.blockInc == 50) {
            this._ticksperSet = 0;
            this._RowChange();
            var sets = this.puzzle._checkSet.CheckForNewSets();
            if (sets.length > 0) {
                this.puzzle._removeSet.RemoveSets(sets);
            }
        }

    };

    //Private  
    this._rowChange = function () {
        this.puzzle._support.CheckPuzzel();
        if (this.puzzle.inPlay) {
            this.blockInc = 0;
            this._MoveBlocksUpOneRow();
            this.puzzle.selector.MoveUp();
            this._AddBlockRow();
        }
    }
    this._moveBlocksUpOneRow = function () {
        for (var i = 0; i < this.puzzle._blocks.length; i++) {
            this.puzzle._blocks[i].row++;
        }
    }
    this._addBlockRow = function () {
        for (var i = 0; i < 6; i++) {
            var row = 0;
            var col = i + 1;

            //Get Vaild random Color
            var randomColor;
            do {
                randomColor = this.puzzle._support.RandomColor();
            } while (!this.puzzle._support.VaildRandomColor(row, col, randomColor))

            this.puzzle._blocks.push(new Block(row, col, randomColor, 0, 0));
        }
    }
}