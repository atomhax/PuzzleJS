function Puzzle(BLOCK_COLORS, audio) {
   
    //Constants
    this.BLOCK_ROW_CHANGE = 50;
    this.BLOCK_COLORS = BLOCK_COLORS;

    //Selector
    this.selector = new Selector(2, 3, this, audio);
    this.blockInc = 0;
    this.blocks = [];
    this.inPlay = true;

    //Public
    this.Tick = function()
    {
        if (puzzle.inPlay === true){
           // puzzle._MoveBlocksUp();
        }
          

        if (this.selector.swapInProcess === true) {
            this.selector.continueSwap();
        }
    }
    this.SelectorSwap = function (leftBlock, rightBlock) {
      
        if (leftBlock !== null) {
            leftBlock.col++;
            leftBlock.x = 0;
        }
        if (rightBlock !== null) {
            rightBlock.col--;
            rightBlock.x = 0;
        }
        this._CheckForSets();
    }
    this.Reset = function () {
        this.blockInc = 0;
        this.blocks = [];
        this.inPlay = true;
        this._CreateStartingBlocks();
    }

    //Private

    //SECTION
    this._MoveBlocksUp = function (blocks)
    {
        this.blockInc++;

        if (this.blockInc == 50) {
         
            this._RowChange();
        }
     
    };
    this._RowChange = function ()
    {
        this._CheckPuzzel();
        if (this.inPlay) {
            this.blockInc = 0;
            this._MoveBlocksUpOneRow();
            this.selector.MoveUp();
            this._AddBlockRow();
        }
           

    }
    this._MoveBlocksUpOneRow = function () {
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].row++;
        }
    }
    this._AddBlockRow = function () {   
        for (var i = 0; i < 6; i++) {
            var row = 0;
            var col = i + 1;

            //Get Vaild random Color
            var randomColor;
            do {
                randomColor = this._RandomColor();
            } while (!this._VaildRandomColor(row, col, randomColor))

            this.blocks.push(new Block(row, col, randomColor, 0, 0));
        }
    }

    //SECTION
    this._CreateStartingBlocks = function () {
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 6; j++) {
                var row = i;
                var col = j + 1;

                //Get Vaild random Color
                var randomColor;
                do
                {
                    randomColor = this._RandomColor();
                } while (!this._VaildRandomColor(row, col, randomColor))

                this.blocks.push(new Block(row, col, randomColor, 0, 0));
            }
        }
    }
    this._VaildRandomColor = function (row, col, randomColor) {

        var foundValue = false;
        var i;
        //Check Row
        var rowSameColor = 1;
        //Down

        i = 1;
        do {
            foundValue = false;

            var block = this._FindBlock(row - i, col);
            if (block !== null && block.color == randomColor) {
                rowSameColor++;
                foundValue = true;
            }
            i++
        } while (foundValue)

        //Up
        i = 1;
        do {
            foundValue = false;

            var block = this._FindBlock(row + i, col);
            if (block !== null && block.color == randomColor) {
                rowSameColor++;
                foundValue = true;
            }
            i++
        } while (foundValue)


        if (rowSameColor >= 3) {
            return false;
        }

        //Check Col
        var colSameColor = 1;
        //Left

        i = 1;
        do {
            foundValue = false;

            var block = this._FindBlock(row, col - i);
            if (block !== null && block.color == randomColor) {
                colSameColor++;
                foundValue = true;
            }
            i++
        } while (foundValue)

        //Right
        i = 1;
        do {
            foundValue = false;

            var block = this._FindBlock(row, col + i);
            if (block !== null && block.color == randomColor) {
                colSameColor++;
                foundValue = true;
            }
            i++
        } while (foundValue)


        if (colSameColor >= 3) {
            return false;
        }

        return true;
    }

    //SECTION
    this._FindBlock = function(row, col) {
        var block = null;
        for (var i = 0; i < this.blocks.length; i++) {
            if(this.blocks[i].row === row && this.blocks[i].col === col)  {
                block = this.blocks[i];
                break;
            }
        }
        return block;
    }
    this._RandomColor = function () {
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


    //SECTION
    this._CheckPuzzel = function () {
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].row === 11) {
                this.inPlay = false;
                break;
            }
        }
    }
    this._CheckForSets = function () {
        var sets = [];
        sets = this._GetSetsCols(sets);
        sets = this._GetSetsRows(sets);
        sets = this._CombineSets(sets);
    }
    this._GetSetsCols = function (sets) {
        var set;
        for (var row = 1; row < 12; row++) {
            set = [];

            for (var col = 1; col < 7; col++) {
                var block = this._FindBlock(row, col);

                if (block != null) {
                    if (set.length === 0 ||
                        block.color === set[0].color) {
                        set.push(block)
                    }

                    else {
                        if (set.length >= 3) {
                            sets.push(set);
                        }
                        set = []
                        set.push(block)
                    }
                }
                else {
                    if (set.length >= 3) {
                        sets.push(set);
                    }
                    set = []
                }
            }
            if (set.length >= 3) {
                sets.push(set);
            }
        }
        return sets;
    }
    this._GetSetsRows = function (sets) {
        var set;
        for (var col = 1; col < 7; col++) {
            set = [];
            for (var row = 1; row < 12; row++) {
                var block = this._FindBlock(row, col);

                if (block != null) {
                    if (set.length === 0 ||
                        block.color === set[0].color) {
                        set.push(block)
                    }

                    else {
                        if (set.length >= 3) {
                            sets.push(set);
                        }
                        set = [];
                        set.push(block)
                    }
                }
                else {
                    if (set.length >= 3) {
                        sets.push(set);
                    }
                    set = [];
                }
            }
            if (set.length >= 3) {
                sets.push(set);
            }
        }
        return sets;
    }
    this._CombineSets = function (sets)   {
        var combinedSets = [];

        for(var i = 0; i < sets.length; i++)  {
            if(combinedSets == []) {
                combinedSets.push(set[i]);
            }
            else {
                var setFound = false;
                for(var j = 0; j < combinedSets.length; j++) {
                    if (this._CompareSet(combinedSets[j], sets[i])) {
                        setFound = true;
                        break;
                    }
                }
                if (setFound) {
                    this._CombineSet(combinedSets[j], sets[i]);
                }
            }

        }

        return combinedSets;
    }
    this._CompareSet = function (setA, setB) {
        for (var i = 0; i < setA[i].length; i++) {
            for (var j = 0; j < setB.length; j++) {
                if (setA[i].row == setB[i].row &&
                    setA[i].col == setB[i].col) {
                    return true;
                }
            }
        }
        return false;
    } 
    this._CombineSet = function (setA, setB) {

        var newSet = setA;
        for (var i = 0; i < setA[i].length; i++) {
            for (var j = 0; j < setB[j].length; j++) {
                if (!(setA[i].row == setB[i].row &&
                    setA[i].col == setB[i].col)) {
                    newSet.push(setB[i]);
                }
            }
        }
        return newSet;
    }


    //Not Started
    this._ClearSet = function () {

    }
    this._Gravity = function () {

    }
};