function Puzzle() {

    //Data
    this.active = true;
    this._ticks = 0;
    this._blocks = [];
    this._score = 0;
    this._level = 1;
    this._soundRequests = [];

    this._moveBlocksUp = new MoveBlocksUp(this);
    this._gravity = new Gravity(this);
    this._selector = new Selector(this, 2, 3);
    this._findBlockSets = new FindBlockSets(this);
    this._removeBlocks = new RemoveBlocks(this);

    //Public  
    this.Reset = function () {
        this.active = true;
        this._ticks = 0;
        this._blocks = new Array();
        this._score = 0;
        this._level = 1;

        this._selector.reset(2, 3);
        this._gravity.reset();
        this._moveBlocksUp.reset();
        this._createSetupBlocks(4);
    }
    this.tick = function () {
        if (this.active) {
            //Add To Total Ticks
            this._ticks++;

            //If Gravity Is on, then Tick Gravity
            //other wise Tick MoveBlocksUp
            if (this._gravity.active) {
                this._gravity.tick();
            } else {
                this._moveBlocksUp.tick();

            }

            //If selector has a swap in Process
            //then continue the swap
            if (this._selector.active) {
                this._selector.tick()
            }

            //If a new set is found, start the removeal of that set.
            var sets = this._findBlockSets.run();
            if (sets.length > 0) {
                this._removeBlocks.removeSetsOfBlocks(sets);
            }

            //Increment all sets that are in removal
            this._removeBlocks.tick();
        }

    }

    //View Functions
    this.getBlocks = function () {
        return this._blocks;
    }
    this.getSelector = function () {
        return this._selector;
    }
    this.getBlockInc = function () {
        return this._moveBlocksUp.blockInc;
    }
    this.getScore = function () {
        return this._score;
    }
    this.getLevel = function () {
        return this._level;
    }
    this.getSoundRequests = function () {
        return this._soundRequests;
        return this._soundRequests = [];
    }
    this.clearSoundRequests = function () {
        if(this._soundRequests.length != 0){
            this._soundRequests = new Array();
        }
    }
    //Player Functions
    this.selectorLeft = function () {
        this._selector.moveLeft();
    }
    this.selectorRight = function () {
        this._selector.moveRight();
    }
    this.selectorUp = function () {
        this._selector.moveUp();
    }
    this.selectorDown = function () {
        this._selector.moveDown();
    }
    this.selectorSwap = function () {
        this._selector.swap();
    }
    this.fastBlockOn = function () {
        if (this.active === true && this._gravity.active === false && this._selector.active === false && this._removeBlocks.active === false) {
            this._moveBlocksUp.pushBlocksOn = true;
        }
    }
    this.fastBlockOff = function () {
        if (this.active === true && this._gravity.active === false && this._selector.active === false && this._removeBlocks.active === false) {
            this._moveBlocksUp.pushBlocksEnd = true;
        }
    }

    //private functions
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
        for (var i = 0; i < this._blocks.length; i++) {
            if (this._blocks[i].row === 11) {
                puzzle.active = false;
                return false;
                break;
            }
        }
        return true;
    }
    this._getBlock = function (row, col) {
        var block = null;
        for (var i = 0; i < this._blocks.length; i++) {
            if (this._blocks[i].row === row && this._blocks[i].col === col) {
                block = this._blocks[i];
                break;
            }
        }
        return block;
    }
    this._addBlockRow = function (row) {
        for (var i = 0; i < 6; i++) {
            var col = i + 1;

            //Get Vaild random Color
            var block;
            do {
                block = new Block(row, col, this._randomColor(), 0, 0)
            } while (!this._isNewBlockVaild(block))

            this._blocks.push(block);
        }
    }
    this._createSetupBlocks = function (startingRows) {
        for (var i = 0; i < startingRows; i++) {
            this._addBlockRow(i);
        }
    }
    this._isNewBlockVaild = function (newblock) {

        var foundValue = false;
        var i;
        //Check Row
        var rowSameColor = 1;
        //Down

        i = 1;
        do {
            foundValue = false;

            var block = this._getBlock(newblock.row - i, newblock.col);
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

            var block = this._getBlock(newblock.row + i, newblock.col);
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

            var block = this._getBlock(newblock.row, newblock.col - i);
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

            var block = this._getBlock(newblock.row, newblock.col + i);
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
    this._addSoundRequest = function (soundRequest) {
        this._soundRequests.push(soundRequest)
    }
    this._generateBlockAttacks = function (chain, combo) {

    }

    this._addEffect = function (chain, totalBlocks) {
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

        this._score += addtionalScore;

    }
    this._chainScore = function (chain) {
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

        this._score += addtionalScore;

    }
    this._totalBlockScore = function (totalBlocks) {
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
        this._score += addtionalScore;

    }
};