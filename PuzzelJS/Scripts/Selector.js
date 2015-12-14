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
    this.StartSwap = function () {
        if (!this.swapInProcess) {
            var left = this.puzzel._FindBlock(this.row, this.col);
            var right = this.puzzel._FindBlock(this.row, this.col + 1);

            if (
                (left === null || (left != null && left.remove !== true)) &&
                (right === null || (right != null && right.remove !== true))
                )
            {
                this.left = left;
                this.right = right;
                this.swapInProcess = true;
                this.swapTicks = 0;
                this.left = this.puzzel._FindBlock(this.row, this.col);
                this.right = this.puzzel._FindBlock(this.row, this.col + 1);
                Sounds("swap");
                this.continueSwap();
            }
        } 
    }
    this.continueSwap = function ()
    {
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
            this.Swap();
        }
    }
    this.Swap = function ()
    {
        this.puzzel.SelectorSwap(this.left, this.right);
        this.swapInProcess = false;
    }
};