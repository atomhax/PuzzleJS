function Puzzle( BLOCK_COLORS ) {
   
    //Constants
    this.BLOCK_ROW_CHANGE = 50;
    this.BLOCK_COLORS = BLOCK_COLORS;
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

            //Get Vaild random Color
            var randomColor;
            do {
                randomColor = this.RandomColor();
            } while (!this.VaildRandomColor(row, col, randomColor))

            this.blocks.push(new Block(row, col, randomColor, i * 50, 0));
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
    this.Reset = function () {
        this.blockInc = 0;
        this.blocks = [];
        this.inPlay = true;
        this.CreateStartingBlocks();
    }
    this.CreateStartingBlocks = function () {
        for (var i = 0; i < 1; i++) {
            for (var j = 0; j < 6; j++) {
                var row = i;
                var col = j + 1;

                //Get Vaild random Color
                var randomColor;
                do
                {
                    randomColor = this.RandomColor();
                } while (!this.VaildRandomColor(row, col, randomColor))



                //
                this.blocks.push(new Block(row, col, randomColor, j * 50, i * 50));
            }
        }
    }
    this.VaildRandomColor = function(row, col, randomColor) {

        var foundValue = false;
        var i;
        //Check Row
        var rowSameColor = 1;
        //Left
        
        i = 1;
        do{
            foundValue = false;

            var block = this.FindBlock( row - i , col );
            if(block !== null && block.color == randomColor)
            {
                row++;
                foundValue = true;
            }
            i++
        }while(foundValue)

        //Right
        i = 1;
        do{
            foundValue = false;

            var block = this.FindBlock( row + i , col  );
            if(block !== null && block.color == randomColor)
            {
                rowSameColor++;
                foundValue = true;
            }
            i++
        }while(foundValue)


        if(rowSameColor >= 3)
        {
            return false;
        }

        //Check Col
        var colSameColor = 1;
        //Left
        
        i = 1;
        do{
            foundValue = false;

            var block = this.FindBlock( row , col - i);
            if(block !== null && block.color == randomColor)
            {
                colSameColor++;
                foundValue = true;
            }
            i++
        }while(foundValue)

        //Right
        i = 1;
        do{
            foundValue = false;

            var block = this.FindBlock( row , col + i );
            if(block !== null && block.color == randomColor)
            {
                colSameColor++;
                foundValue = true;
            }
            i++
        }while(foundValue)


        if (colSameColor >= 3)
        {
            return false;
        }

        return true;
    }    
    this.FindBlock = function(row, col) {
        var block = null;
        for (var i = 0; i < this.blocks.length; i++) {
            if(this.blocks[i].row === row && this.blocks[i].col === col)  {
                block = this.blocks[i];
                break;
            }
        }
        return block;
    }
    this.RandomColor = function () {
        var min = 1;
        var max = 5;
        var random = Math.floor(Math.random() * (max - min)) + min;
        if(random == 1){
            return this.BLOCK_COLORS.Green;
        }
        if (random == 2) {
            return this.BLOCK_COLORS.Blue;
        }
        if (random == 3) {
            return this.BLOCK_COLORS.Red;
        }
        if (random == 4) {
            return this.BLOCK_COLORS.Purple;
        }
        if (random == 5) {
            return this.BLOCK_COLORS.Yellow;
        }
    }
};