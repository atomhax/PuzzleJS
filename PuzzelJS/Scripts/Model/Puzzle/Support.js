function Support(puzzle)
{
    //Data
    this._puzzle = puzzle;

    //Functions
    this.randomColor = function () {
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
    this.isPlayeralive = function () {
        for (var i = 0; i < this._puzzle._blocks.length; i++) {
            if (this._puzzle._blocks[i].row === 11) {
                puzzle.active = false;
                return false;
                break;
            }
        }
        return true;
    }
    this.getBlock = function (row, col) {
        var block = null;
        for (var i = 0; i < this._puzzle._blocks.length; i++) {
            if (this._puzzle._blocks[i].row === row && this._puzzle._blocks[i].col === col) {
                block = this._puzzle._blocks[i];
                break;
            }
        }
        return block;
    }
    this.isNewBlockVaild = function ( newblock ) {

        var foundValue = false;
        var i;
        //Check Row
        var rowSameColor = 1;
        //Down

        i = 1;
        do {
            foundValue = false;

            var block = this.getBlock(newblock.row - i, newblock.col);
            if (block !== null && block.color == newblock.color) {
                rowSameColor++;
                foundValue = true;
            }
            i++
        } while (foundValue)

        //Up
        i = 1;
        do {
            foundValue = false;

            var block = this.getBlock(newblock.row + i, newblock.col);
            if (block !== null && block.color == newblock.color) {
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

            var block = this.getBlock(newblock.row, newblock.col - i);
            if (block !== null && block.color == newblock.color) {
                colSameColor++;
                foundValue = true;
            }
            i++
        } while (foundValue)

        //Right
        i = 1;
        do {
            foundValue = false;

            var block = this.getBlock(newblock.row, newblock.col + i);
            if (block !== null && block.color == newblock.color) {
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
    this.addSoundRequest = function (soundRequest) {
        this._puzzle._soundRequests.push(soundRequest)
    }
}; 