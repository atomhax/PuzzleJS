﻿function Selector( puzzle, row, col )
{
    //Data
    this.active = false;
    this._TICKS_TO_SWAP = 20;
    this.OFF_SET_PER_TICK = 50 / this._TICKS_TO_SWAP ;
    this._puzzle = puzzle;
    this.row = row;
    this.col = col;
    this.ticks = 0;
    this.leftSelection = null;
    this.rightSelection = null;

    //Functions
    this.reset = function (row, col) {
        this.row = row;
        this.col = col;
        this.swapInProcess = false;
        this.swapTicks = 0;
        this.leftSelection = null;
        this.rightSelection = null;
    }
    this.tick = function()
    {
        if (this.swapInProcess) {
          
            this.ticks++;
            if (this.ticks == this._TICKS_TO_SWAP) {
                this.ticks = 0;
                if (this.leftSelection !== null) {
                    this.leftSelection.col++;
                    this.leftSelection.state = BlockState.None;

                }
                if (this.rightSelection !== null) {
                    this.rightSelection.col--;
                    this.rightSelection.state = BlockState.None;
                }

             

                this._swapped();
            }
        }
    }
    this.swap = function () {
        if (this._puzzle.active === false) {
            return;
        }
        var left = this._puzzle._support.getBlock(this.row, this.col);
        var right = this._puzzle._support.getBlock(this.row, this.col + 1);

        if ((left != null || right != null) && (
            (left === null || (left != null && left.state === BlockState.None)) &&
            (right === null || (right != null && right.state === BlockState.None))
            )) {

            this.leftSelection = left;
            this.rightSelection = right;
            this.leftSelection.state = BlockState.Swap;
            this.rightSelection.state = BlockState.Swap;
            this.swapInProcess = true;
            this.swapTicks = 0;
            this.leftSelection = this._puzzle._support.getBlock(this.row, this.col);
            this.rightSelection = this._puzzle._support.getBlock(this.row, this.col + 1);
            this._puzzle._support.addSoundRequest(SoundRequest.Swap);
            this._puzzle._moveBlocksUp.clearMoveBlocksUp();
            //this.ContinueSwap();
        }
    }
    this.moveUp = function () {
        if (this.row < 11 && this._puzzle.active === true) {
            this.row++;
        }
    }
    this.moveDown = function (){
        if (this.row > 1 && this._puzzle.active === true) {
            this.row--;
        }
      
    }
    this.moveLeft = function (){
        if (this.col > 1 && this._puzzle.active === true) {
            this.col--;
        }
    }
    this.moveRight = function () {
        if (this.col < 5 && this._puzzle.active === true) {
            this.col++;
        }
    }
    this._swapped = function ()
    {


        this._puzzle._gravity.apply();
        var sets = this._puzzle._getNewSets.run();
        if (sets.length > 0) {
            this._puzzle._removeSet.removeSets(sets);
        }
        this.swapInProcess = false;
        this.swapTicks = 0;


    }
};