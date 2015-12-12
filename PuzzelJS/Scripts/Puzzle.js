function Puzzle(materials) {
   
    //Constants
    this.BLOCK_ROW_CHANGE = 50;
    this.BLOCK_COLORS = {
        Green: 1,
        Blue: 2,
        Red: 3,
        Purple: 4,
        Yellow: 5
    };
    this.materials = materials;

    //Variables
    this.blockInc = 0;
    this.blocks = [];
    this.inPlay = true;

    //Functions
    this.MoveBlocksUp = function (blocks) {

        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].y = this.blocks[i].y - 1;
        }

        this.blockInc++;

        if (this.blockInc == 50) {
            this.blockInc = 0;
            this.RowChange();
        }
     
    };

    this.RowChange = function ()
    {
        this.MoveBlocksUpOneRow();
        this.AddBlockRow();
        this.CheckPuzzel();
    }

    this.MoveBlocksUpOneRow = function () {
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].row++;
        }
    }

    this.AddBlockRow = function () {   
        for (var i = 0; i < 6; i++) {
            var row = 0;
            var col = i + 1;
            this.blocks.push(new Block(row, col, this.BLOCK_COLORS.Green, this.RandomColor(), i * 50, 0, true));
        }
    }
    this.CheckPuzzel = function () {
        for (var i = 0; i < this.blocks.length; i++) {
            if(this.blocks[i].row === 12)
            {
                this.inPlay = false;
                break;
            }   
        }
    }
    this.ClearSet = function () {

    }
    this.Gravity = function () {

    }
    this.SwapBlocks = function () {

    }
    this.CreateStartingBlocks = function () {
        for (var i = 0; i < 1; i++) {
            for (var j = 0; j < 6; j++) {
                var row = i;
                var col = j + 1;
                this.blocks.push(new Block(row, col, this.BLOCK_COLORS.Green, this.RandomColor(), j * 50, i * 50, true));
            }
        }
    }

    this.RandomColor = function () {
        var min = 1;
        var max = 5;
        var random = Math.floor(Math.random() * (max - min)) + min;
        if(random == 1)
        {
            return this.materials.blockGreen;
        }
        if (random == 2) {
            return this.materials.blockBlue;
        }
        if (random == 3) {
            return this.materials.blockRed;
        }
        if (random == 4) {
            return this.materials.blockPurple;
        }
        if (random == 5) {
            return this.materials.blockYellow;
        }
    }
};