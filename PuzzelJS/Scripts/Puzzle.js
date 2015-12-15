function Puzzle(BLOCK_COLORS, audio) {
   
    //Constants
    this.BLOCK_ROW_CHANGE = 50;
    this.BLOCK_COLORS = BLOCK_COLORS;

    //only add 5 per row
    //use gravity before user sees


    //Selector
    this.blocksInGravity = false;
    this.comboCount = 0;
    this.selector = new Selector(2, 3, this, audio);
    this.blockInc = 0;
    this.blocks = [];
    this.score = 0;
    this.level = 1;
    this.inPlay = true;
    this.totalTicks = 0;
    this.ticksperSet = 0;
    this.MoveToNextBlockRowBool = false;
    this.MoveToNextBlockRowBoolStop = false;
    //Public
    this.Tick = function()
    {
        this.totalTicks++;

        var blocksBeingRemoved = this._AnyBlocksBeingRemoved();
        var blocksInGravity = this._AnyBlocksIn_Gravity();

        if (blocksInGravity === false && this.blocksInGravity === true)
        {
            //Check For Sets
            if (this._CheckForSets().length > 0) {
                this.comboCount++;
            }
            //Check Gravity
            this._Gravity();
            blocksInGravity = this._AnyBlocksIn_Gravity();

            if (blocksInGravity === false) {
                this.blocksInGravity == false;
            }
        }

        if (this.inPlay === true && blocksBeingRemoved === false && blocksInGravity === false) {
            this._MoveBlocksUp();
        }

        if (blocksInGravity === true) {
            this._ContinueGravity();
        }

        if (blocksBeingRemoved === true) {
            this._IncRemoveSets();
        }


        if (this.selector.swapInProcess === true) {
            this.selector.continueSwap();
        }
    }
    this.SelectorSwap = function (leftBlock, rightBlock) {
      //16
      //6 Per sec
        if (leftBlock !== null) {
            leftBlock.col++;
            leftBlock.x = 0;
        }
        if (rightBlock !== null) {
            rightBlock.col--;
            rightBlock.x = 0;
        }
        this._CheckForSets();
        this._Gravity();
    }
    this.ForceBlocksUp = function () {
        this.MoveToNextBlockRowBool = true;
    }
    this.ForceBlocksUpStop = function () {
        this.MoveToNextBlockRowBoolStop = true;
    }

    this.Reset = function () {
      
        this.comboCount = 0;
        this.blockInc = 0;
        this.ticksperSet = 0;
        this.totalTicks = 0;
        this.blocks = [];
        this.inPlay = true;
        this.level = 5;
        this.score = 0;
        this._CreateStartingBlocks(6);
        this.selector.row = 2;
        this.selector.col = 3;
        this.MoveToNextBlockRowBool = false;
        this.MoveToNextBlockRowBoolStop = false;
    }

    //Private

    //SECTION
    this._MoveBlocksUp = function ()
    {

        if (this.MoveToNextBlockRowBool === false) {
            this.ticksperSet++;
            //10 standard
            if (this.level <= 10 && this.ticksperSet % (96 - Math.round(7.3 * (this.level - 1))) === 0) {
                this.blockInc += 5;
            }

            //Hard
            if (this.level > 10 && this.level < 15 && this.ticksperSet % (30 - Math.round(3 * (this.level - 10))) === 0) {
                this.blockInc += 5;
            }

            //Hard(Over time)
            if (this.level >= 15 && this.ticksperSet % (30 - Math.round(2 * (this.level - 15))) === 0) {
                this.blockInc += 5;
            }

            if (this.totalTicks % (60 * 20) === 0) {
                this.level += 1;
            }
        } else {
            this._MoveToNextBlockRow();

        }
       

        if (this.blockInc == 50) {
            this.ticksperSet = 0;
            this._RowChange();
            this._CheckForSets();
        }
     
    };
    this._MoveToNextBlockRow = function () {
        this.ticksperSet++;
        if (this.ticksperSet % 1 === 0 && this.blockInc != 50) {
            this.blockInc += 2.5;
        }


        if (this.blockInc === 50 && this.MoveToNextBlockRowBoolStop === true) {
            this.MoveToNextBlockRowBoolStop = false;
            this.MoveToNextBlockRowBool = false;
            this.ticksperSet = 0;
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
    this._CreateStartingBlocks = function (startingRows) {
        for (var i = 0; i < startingRows; i++) {
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


        this._RemoveSets(sets);

        return sets;
    }
    this._GetSetsCols = function (sets) {
        var set;
        for (var row = 1; row < 12; row++) {
            set = [];

            for (var col = 1; col < 7; col++) {
                var block = this._FindBlockNotInRemove(row, col);

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
                var block = this._FindBlockNotInRemove(row, col);

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
            if(combinedSets.length === 0) {
                combinedSets.push(sets[i]);
            }
            else {
                var setFound = false;
                for(var j = 0; j < combinedSets.length; j++) {
                    if (this._CompareSet(combinedSets[j], sets[i])) {
                        setFound = true;
                        combinedSets[j] = this._CombineSet(combinedSets[j], sets[i]);
                        break;
                    }
                }
                if (!setFound) {
                    combinedSets.push(sets[i]);
                }
            }

        }

        return combinedSets;
    }
    this._CompareSet = function (setA, setB) {
        for (var i = 0; i < setA.length; i++) {
            for (var j = 0; j < setB.length; j++) {
                if (setA[i].row == setB[j].row &&
                    setA[i].col == setB[j].col) {
                    return true;
                }
            }
        }
        return false;
    }
    this._CombineSet = function (setA, setB) {
        var foundMatch = false;
        var newSet = [];
        for (var j = 0; j < setB.length; j++) {
            newSet.push(setB[j]);
        }
        for (var i = 0; i < setA.length; i++) {
            var foundMatch = false;
            for (var j = 0; j < setB.length; j++) {
                if ((setA[i].row == setB[j].row &&
                    setA[i].col == setB[j].col)) {
                    foundMatch = true;
                    break;
                }
            }
            if (foundMatch === false) {
                newSet.push(setA[i]);
            }
        }
        return newSet;
    }

    this._RemoveSets = function (sets) {
        for (var i = 0; i < sets.length; i++) {
            for (var j = 0; j < sets[i].length; j++) {
                sets[i][j].remove = true;
                sets[i][j].removeTick = 0;
                sets[i][j].startRemoveAtTick = 60 + j * 6;
                sets[i][j].removeAtTick = 60 + (sets[i].length) * 6;
            }
        }
    }
    this._IncRemoveSets = function () {
        var removeSet = [];
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].remove === true) {
                this.blocks[i].removeTick++;
                if (this.blocks[i].removeTick == this.blocks[i].removeAtTick) {
                    removeSet.push(this.blocks[i]);
                  
                }
            }
        }

        //RemoveBlocks
        this._RemoveSet(removeSet);
        if (removeSet.length > 0){
            this._Gravity();
        }
       
    }
    this._AnyBlocksBeingRemoved = function (sets) {
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].remove === true) {
                return true;
            }
        }
        return false;
    }
    this._RemoveSet = function (set) {
        for (var i = 0; i < set.length; i++) {
            var block = this.blocks.splice(this.blocks.indexOf(set[i]), 1);
            Sounds("clear");
           delete block;
           this.score += 10;
        }
    }

    //Support
    this._FindBlock = function (row, col) {
        var block = null;
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].row === row && this.blocks[i].col === col) {
                block = this.blocks[i];
                break;
            }
        }
        return block;
    }
    this._FindBlockNotInRemove = function (row, col) {
        var block = null;
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].row === row && this.blocks[i].col === col && this.blocks[i].remove === false) {
                block = this.blocks[i];
                break;
            }
        }
        return block;
    }
    this._FindBlockNotInRemoveOrGravity = function (row, col) {
        var block = null;
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].row === row && this.blocks[i].col === col && this.blocks[i].remove === false && this.blocks[i].gravityInEffect === false) {
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
        if (random == 1) {
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

    //Gravity
    this._Gravity = function () {
        for (var row = 2; row < 11; row++) {
            for (var col = 1; col < 7; col++) {
                var block = this._FindBlock(row, col);
                if (block != null) {
                    this._GravityBlock(block);
                }
            }
        }
    }
    this._GravityBlock = function (block) {
        if (block.gravityInEffect === true || block.remove === true) {
            return;
        }

        var newRow = null;
        for (var row = block.row - 1; row > 0; row--)
        {
            if (!this._GravityBlocksReservedSpotCheckRowOnly(row, block.row, block.col)) {
                newRow = row;
            }  
        }

        if(newRow !== null)
        {
            block.gravityInEffect = true;
            block.gravityTick = 0;
            block.gravityEndRow = newRow;
        }
    }

    this._GravityBlocksReservedSpotCheckRowOnly = function (searchRow, blockRow, blockCol) {
        for (var row = blockRow; row > 0; row--) {
            var block = this._FindBlock(row, blockCol);
            if (block != null &&
                ((block.gravityInEffect === true &&
                 block.col === blockCol &&
                 block.gravityEndRow === searchRow) ||
                (block.gravityInEffect === false &&
                 block.col === blockCol &&
                 block.row === searchRow)))
                {
                    return true;
                }
        }

        if (this.selector.swapInProcess === true) {
            if (
                (this.selector.left === null || (
                    this.selector.left.col === blockCol &&
                    this.selector.left.row === searchRow &&
                    (this.selector.left.row + 1) === searchRow))
                &&
               (this.selector.right === null || (
                this.selector.right.col === blockCol &&
                this.selector.right.row === searchRow &&
                (this.selector.right.row - 1) === searchRow))
                )
            {
                return true;
            }

        }

        return false;
    }

    this._GravityBlocksReservedSpot = function (blockRow, blockCol) {
        for (var i = 0; i < this.blocks.length; i++)
        {
            var block = this.blocks[i];
            if (block != null &&
                (block.gravityInEffect === true &&
                 block.col === blockCol &&
                 block.gravityEndRow === blockRow)) {
                return true;
            }
        }
        return false;
    }

    this._ContinueGravity = function () {
        var blockLaneded = false;
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i] != null && this.blocks[i].gravityInEffect === true) {
                this.blocks[i].gravityTick++;

                if(this.blocks[i].gravityTick === 10)
                {
                    this.blocks[i].gravityTick = 0;
                    this.blocks[i].gravityInEffect = false;
                    this.blocks[i].row = this.blocks[i].gravityEndRow;
                    this.blocks[i].gravityEndRow = null;
                    Sounds("drop");
                    blockLaneded = true;
                }
            }
        }

        if(blockLaneded === true){
            this._CheckForSets();
        }
    }
    this._AnyBlocksIn_Gravity = function (sets) {
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].gravityInEffect === true) {
                return true;
            }
        }
        return false;
    }


};