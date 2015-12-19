function SetupBlocks( puzzle ) {
    this.puzzle = puzzle;
    this.run = function (startingRows) {
        for (var i = 0; i < startingRows; i++) {
            for (var j = 0; j < 6; j++) {
                var row = i;
                var col = j + 1;

                //Get Vaild random Color
                var block;
                do {
                    block = new Block(row, col, this.puzzle._support._randomColor(), 0, 0)
                } while (!this.puzzle._support._isNewBlockVaild(block))

                this.puzzle._blocks.push(block);
            }
        }
    }
}