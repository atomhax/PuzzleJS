function Setup() {
    this.CreateStartingBlocks = function (startingRows) {
        for (var i = 0; i < startingRows; i++) {
            for (var j = 0; j < 6; j++) {
                var row = i;
                var col = j + 1;

                //Get Vaild random Color
                var randomColor;
                do {
                    randomColor = this._RandomColor();
                } while (!this._VaildRandomColor(row, col, randomColor))

                this.blocks.push(new Block(row, col, randomColor, 0, 0));
            }
        }
    }
}