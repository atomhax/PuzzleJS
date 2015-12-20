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
    this.chainScore = function (chain) {
        var addtionalScore = 0;

        if (chain == 2) {
            addtionalScore = 50;
        }
        if (chain == 3) {
            addtionalScore = 130;
        }
        if (chain == 4) {
            addtionalScore = 280;
        }
        if (chain == 5) {
            addtionalScore = 580;
        }
        if (chain == 6) {
            addtionalScore = 980;
        }
        if (chain == 7) {
            addtionalScore = 1480;
        }
        if (chain == 8) {
            addtionalScore = 2180;
        }
        if (chain == 9) {
            addtionalScore = 3080;
        }
        if (chain === 10) {
            addtionalScore = 4180;
        }
        if (chain == 11) {
            addtionalScore = 5480;
        }
        if (chain == 12) {
            addtionalScore = 6980;
        }
        if (chain > 12) {
            addtionalScore = 6980 + ((chain - 12) * 1800);
        }

        this._puzzle.score += addtionalScore;

    }
    this.totalBlockScore = function (totalBlocks) {
        var addtionalScore = 0;

        if (totalBlocks == 3) {
            addtionalScore = 30;
        }
        if (totalBlocks == 4) {
            addtionalScore = 70;
        }
        if (totalBlocks == 5) {
            addtionalScore = 100;
        }
        if (totalBlocks == 6) {
            addtionalScore = 210;
        }
        if (totalBlocks == 7) {
            addtionalScore = 260;
        }
        if (totalBlocks == 8) {
            addtionalScore = 310;
        }
        if (totalBlocks == 9) {
            addtionalScore = 360;
        }
        if (totalBlocks == 10) {
            addtionalScore = 410;
        }
        if (totalBlocks == 11) {
            addtionalScore = 510;
        }
        if (totalBlocks == 12) {
            addtionalScore = 570;
        }
        if (totalBlocks == 13) {
            addtionalScore = 630;
        }
        if (totalBlocks == 14) {
            addtionalScore = 690;
        }
        if (totalBlocks == 15) {
            addtionalScore = 850;
        }
        if (totalBlocks == 16) {
            addtionalScore = 920;
        }
        if (totalBlocks == 17) {
            addtionalScore = 1020;
        }
        if (totalBlocks == 18) {
            addtionalScore = 1150;
        }
        if (totalBlocks == 19) {
            addtionalScore = 1310;
        }
        if (totalBlocks == 20) {
            addtionalScore = 1500;
        }
        if (totalBlocks == 21) {
            addtionalScore = 1720;
        }
        if (totalBlocks == 22) {
            addtionalScore = 1970;
        }
        if (totalBlocks == 23) {
            addtionalScore = 2250;
        }
        if (totalBlocks == 24) {
            addtionalScore = 2560;
        }
        if (totalBlocks == 25) {
            addtionalScore = 2900;
        }
        if (totalBlocks == 26) {
            addtionalScore = 3270;
        }
        if (totalBlocks == 27) {
            addtionalScore = 3670;
        }
        if (totalBlocks == 28) {
            addtionalScore = 4100;
        }
        if (totalBlocks == 29) {
            addtionalScore = 4560;
        }
        if (totalBlocks == 30) {
            addtionalScore = 5050;
        }
        if (totalBlocks == 31) {
            addtionalScore = 5570;
        }
        if (totalBlocks == 32) {
            addtionalScore = 15320;
        }
        if (totalBlocks == 33) {
            addtionalScore = 15900;
        }
        if (totalBlocks == 34) {
            addtionalScore = 16510;
        }
        if (totalBlocks == 35) {
            addtionalScore = 17150;
        }
        if (totalBlocks == 36) {
            addtionalScore = 17820;
        }
        if (totalBlocks == 37) {
            addtionalScore = 18520;
        }
        if (totalBlocks == 38) {
            addtionalScore = 19250;
        }
        if (totalBlocks == 39) {
            addtionalScore = 20010;
        }
        if (totalBlocks == 40) {
            addtionalScore = 20800;
        }
        if (totalBlocks > 40) {
            addtionalScore = 20400 + ((totalBlocks - 40) * 800) + (totalBlocks * 10);
        }
        this._puzzle.score += addtionalScore;

    }
    this.generateBlockAttacks = function (chain, combo) {

    }
    this.createSetupBlocks = function (startingRows) {
        for (var i = 0; i < startingRows; i++) {
            for (var j = 0; j < 6; j++) {
                var row = i;
                var col = j + 1;

                //Get Vaild random Color
                var block;
                do {
                    block = new Block(row, col, this._puzzle._support.randomColor(), 0, 0)
                } while (!this._puzzle._support.isNewBlockVaild(block))

                this._puzzle._blocks.push(block);
            }
        }
    }
}; 