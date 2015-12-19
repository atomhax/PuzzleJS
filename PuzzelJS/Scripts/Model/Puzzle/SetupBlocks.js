function SetupBlocks( puzzle ) {
    this._puzzle = puzzle;
    this.run = function (startingRows) {
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
}