function Selector( row, col, puzzel, sounds )
{
    //Vars
    this.row = row;
    this.col = col;
    this.puzzel = puzzel;
    this.sounds = sounds;


    //Swap
    this.TICKS_TO_SWAP = 10;
    this.swapInProcess = false;
    this.swapTicks = 0;
    this.left;
    this.right;

    //Functions
    this.Reset = function (row, col) {
        this.row = row;
        this.col = col;
        this.swapInProcess = false;
        this.swapTicks = 0;
        this.left = null;
        this.right = null;
    }
    this.MoveUp = function () {
        if (this.row < 11 && this.puzzel.inPlay === true) {
            this.row++;
        }
    }
    this.MoveDown = function (){
        if (this.row > 1 && this.puzzel.inPlay === true) {
            this.row--;
        }
      
    }
    this.MoveLeft = function (){
        if (this.col > 1 && this.puzzel.inPlay === true) {
            this.col--;
        }
    }
    this.MoveRight = function () {
        if (this.col < 5 && this.puzzel.inPlay === true) {
            this.col++;
        }
    }
    //&& !this.puzzel._AnyBlocksIn_Gravity()
    this.StartSwap = function () {
        if (this.puzzel.inPlay === false) {
            return;
        }
        var left = this.puzzel._support.FindBlock(this.row, this.col);
        var right = this.puzzel._support.FindBlock(this.row, this.col + 1);

        if (
            (left === null || (left != null && left.remove !== true && left.gravityInEffect !== true && !this.puzzel._gravity.BlockReserved(left.row, left.col + 1))) &&
            (right === null || (right != null && right.remove !== true && right.gravityInEffect !== true && !this.puzzel._gravity.BlockReserved(right.row, right.col - 1)))
            )
        {
              
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
    this.ContinueSwap = function ()
    {
        if (this.swapInProcess) {
            var offset = 50 / this.TICKS_TO_SWAP;
            if (this.left != null)
            {
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
    this.Swapped = function ()
    {
        this.puzzel.SelectorSwapped();
        this.swapInProcess = false;
        this.swapTicks = 0;

    }
};