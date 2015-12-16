function MoveBlocksUp() {

    //Vars
    //Public
    this.PushBlocks = false;
    this.PushBlocksStop = false;

    this.BLOCK_ROW_CHANGE = 50;

    //Private
    this._ticksperSet = 0;
    this._blockInc = 0;

    //Public
    this.Tick = function ()
    {
        if (this.PushBlocks === false) {
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
    this.Reset = function () {
        this.PushBlocksStop = false;
        this._ticksperSet = 0;
        this._blockInc = 0;
    }
    //Private
    this._MoveToNextBlockRow = function () {
        this.ticksperSet++;
        if (this.ticksperSet % 1 === 0 && this.blockInc != 50) {
            this.blockInc += 2.5;
        }


        if (this.blockInc === 50 && this.PushBlocksStop === true) {
            this.PushBlocksStop = false;
            this.PushBlocks = false;
            this.ticksperSet = 0;
        }
    };
    this._RowChange = function () {
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
}