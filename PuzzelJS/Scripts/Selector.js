function Selector( row, col, puzzel )
{
    //Game Data
    this.row = row;
    this.col = col;
    this.swapInProcess = false;
    this.puzzel = puzzel;

    this.x = 0;
    this.y = 0;

    //Selector
    this.MoveUp = function ()
    {
        if (this.row < 12) {
            this.row++;
            this.y = this.y - 50;
        }
    }
    this.MoveDown = function ()
    {
        if (this.row > 1)
        {
            this.row--;
            this.y = this.y + 50;
        }
      
    }
    this.MoveLeft = function ()
    {
        this.col--;
        this.y = this.x - 50;
    }
    this.MoveRight = function ()
    {
        this.col--;
        this.y = this.x - 50;
    }
    this.Swap = function ()
    {
        this.puzzel.SelectorSwap(this.row, this.col);
    }
};