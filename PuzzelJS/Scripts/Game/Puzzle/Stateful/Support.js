function Support(puzzle)
{
    this.puzzle = puzzle;
    this.CheckPuzzel = function () {
        for (var i = 0; i < this.puzzle.blocks.length; i++) {
            if (this.puzzle.blocks[i].row === 11) {
                this.puzzle.inPlay = false;
                break;
            }
        }
    }
    this.FindBlock = function (row, col) {
        var block = null;
        for (var i = 0; i < this.puzzle.blocks.length; i++) {
            if (this.puzzle.blocks[i].row === row && this.puzzle.blocks[i].col === col) {
                block = this.puzzle.blocks[i];
                break;
            }
        }
        return block;
    }
    this.BlocksBeingRemoved = function () {
        for (var i = 0; i < this.puzzle.blocks.length; i++) {
            if (this.puzzle.blocks[i].remove === true) {
                return true;
            }
        }
        return false;
    }
    this.RandomColor = function () {
        var min = 1;
        var max = 5;
        var random = Math.floor(Math.random() * (max - min)) + min;
        if (random == 1) {
            return this.puzzle.BLOCK_COLORS.Green;
        }
        if (random == 2) {
            return this.puzzle.BLOCK_COLORS.Blue;
        }
        if (random == 3) {
            return this.puzzle.BLOCK_COLORS.Red;
        }
        if (random == 4) {
            return this.puzzle.BLOCK_COLORS.Purple;
        }
        if (random == 5) {
            return this.puzzle.BLOCK_COLORS.Yellow;
        }
    }
    this.VaildRandomColor = function (row, col, randomColor) {

        var foundValue = false;
        var i;
        //Check Row
        var rowSameColor = 1;
        //Down

        i = 1;
        do {
            foundValue = false;

            var block = this.FindBlock(row - i, col);
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

            var block = this.FindBlock(row + i, col);
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

            var block = this.FindBlock(row, col - i);
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

            var block = this.FindBlock(row, col + i);
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
}; 