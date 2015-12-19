function Selector( puzzel, row, col )
{
    //Data
    this.active = false;
    this._TICKS_TO_SWAP = 10;
    this.puzzel = puzzel;
    this.row = row;
    this.col = col;
    this.tick = 0;
    this.leftSelection = null;
    this.rightSelection = null;

    //Functions
    this.reset = function (row, col) {
        this.row = row;
        this.col = col;
        this.swapInProcess = false;
        this.swapTicks = 0;
        this.left = null;
        this.right = null;
    }
    this.tick = function()
    {
        if (this.swapInProcess) {
            var offset = 50 / this.TICKS_TO_SWAP;
            if (this.left != null) {
                this.left.x += offset;
            }
            if (this.right != null) {
                this.right.x -= offset;
            }

            this.swapTicks++;
            if (this.swapTicks == 10) {
                this.swapTicks = 0;
                if (this.left !== null) {
                    this.left.col++;
                    this.left.x = 0;
                }
                if (this.right !== null) {
                    this.right.col--;
                    this.right.x = 0;
                }
                this.Swapped();
            }
        }
    }
    this.swap = function () {
        if (this.puzzel.inPlay === false) {
            return;
        }
        var left = this.puzzel._support.FindBlock(this.row, this.col);
        var right = this.puzzel._support.FindBlock(this.row, this.col + 1);

        if (
            (left === null || (left != null && left.remove !== true && left.gravityInEffect !== true && !this.puzzel._gravity.BlockReserved(left.row, left.col + 1))) &&
            (right === null || (right != null && right.remove !== true && right.gravityInEffect !== true && !this.puzzel._gravity.BlockReserved(right.row, right.col - 1)))
            ) {

            this.left = left;
            this.right = right;
            this.swapInProcess = true;
            this.swapTicks = 0;
            this.left = this.puzzel._support.FindBlock(this.row, this.col);
            this.right = this.puzzel._support.FindBlock(this.row, this.col + 1);
            Sounds("swap");
            this.puzzel.ClearMoveBlocksUpArow();
            this.ContinueSwap();
        }
    }
    this.moveUp = function () {
        if (this.row < 11 && this.puzzel.inPlay === true) {
            this.row++;
        }
    }
    this.moveDown = function (){
        if (this.row > 1 && this.puzzel.inPlay === true) {
            this.row--;
        }
      
    }
    this.moveLeft = function (){
        if (this.col > 1 && this.puzzel.inPlay === true) {
            this.col--;
        }
    }
    this.moveRight = function () {
        if (this.col < 5 && this.puzzel.inPlay === true) {
            this.col++;
        }
    }
    this._swapped = function ()
    {
        this._gravity.Apply();
        var sets = this._checkSet.CheckForNewSets();
        if (sets.length > 0) {
            this._removeSet.RemoveSets(sets);
        }
        this.swapInProcess = false;
        this.swapTicks = 0;

    }
};