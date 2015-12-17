function Support(puzzle)
{
    //Data
    this.puzzle = puzzle;

    //Functions
    this._randomColor = function () {
        var min = 1;
        var max = 5;
        var random = Math.floor(Math.random() * (max - min)) + min;
        if (random == 1) {
            return Color.Green;
        }
        if (random == 2) {
            return Color.Blue;
        }
        if (random == 3) {
            return Color.Red;
        }
        if (random == 4) {
            return Color.Purple;
        }
        if (random == 5) {
            return Color.Yellow;
        }
    }
    this._isPlayeralive = function () {
        for (var i = 0; i < this.puzzle.blocks.length; i++) {
            if (this.puzzle.blocks[i].row === 11) {
                return false;
                break;
            }
        }
        return true;
    }
    this._getBlock = function (row, col) {
        var block = null;
        for (var i = 0; i < this.puzzle.blocks.length; i++) {
            if (this.puzzle.blocks[i].row === row && this.puzzle.blocks[i].col === col) {
                block = this.puzzle.blocks[i];
                break;
            }
        }
        return block;
    }
    this._BlocksBeingRemoved = function () {
        for (var i = 0; i < this.puzzle.blocks.length; i++) {
            if (this.puzzle.blocks[i].remove === true) {
                return true;
            }
        }
        return false;
    }
    this._isNewBlockVaild = function ( newblock ) {

        var foundValue = false;
        var i;
        //Check Row
        var rowSameColor = 1;
        //Down

        i = 1;
        do {
            foundValue = false;

            var block = this._getBlock(newblock.row - i, newblock.col);
            if (block !== null && block.color == newblock.randomColor) {
                rowSameColor++;
                foundValue = true;
            }
            i++
        } while (foundValue)

        //Up
        i = 1;
        do {
            foundValue = false;

            var block = this._getBlock(newblock.row + i, newblock.col);
            if (block !== null && block.color == newblock.randomColor) {
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

            var block = this._getBlock(newblock.row, newblock.col - i);
            if (block !== null && block.color == newblock.randomColor) {
                colSameColor++;
                foundValue = true;
            }
            i++
        } while (foundValue)

        //Right
        i = 1;
        do {
            foundValue = false;

            var block = this._getBlock(newblock.row, newblock.col + i);
            if (block !== null && block.color == newblock.randomColor) {
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