function SetupBlocks( puzzle ) {
    this.puzzle = puzzle;
    this.run = function (startingRows) {
        for (var i = 0; i < startingRows; i++) {
            for (var j = 0; j < 6; j++) {
                var row = i;
                var col = j + 1;

                //Get Vaild random Color
                var randomColor;
                do {
                    randomColor = this.puzzle._support.RandomColor();
                } while (!this.puzzle._support.VaildRandomColor(row, col, randomColor))

                this.puzzle.blocks.push(new Block(row, col, randomColor, 0, 0));
            }
        }
    }
}