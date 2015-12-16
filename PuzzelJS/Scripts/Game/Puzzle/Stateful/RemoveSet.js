function RemoveSet(puzzle)
{
    this.puzzle = puzzle;
    //publichttp://localhost:7669/Scripts/Game
    this.RemoveSets = function (sets,combo) {
        for (var i = 0; i < sets.length; i++) {
            for (var j = 0; j < sets[i].length; j++) {
                sets[i][j].remove = true;
                sets[i][j].removeTick = 0;
                sets[i][j].startRemoveAtTick = 60 + j * 6;
                sets[i][j].removeAtTick = 60 + (sets[i].length) * 6;
            }
        }
    }

    //private
    this.IncRemoveSets = function () {
        var removeSet = [];
        for (var i = 0; i < this.puzzle.blocks.length; i++) {
            if (this.puzzle.blocks[i].remove === true) {
                this.puzzle.blocks[i].removeTick++;
                if (this.puzzle.blocks[i].removeTick == this.puzzle.blocks[i].removeAtTick) {
                    removeSet.push(this.puzzle.blocks[i]);

                }
            }
        }

        //RemoveBlocks
        this._RemoveSet(removeSet);
        if (removeSet.length > 0) {
            this.puzzle._gravity.Apply();
        }

    }
    this._RemoveSet = function (set) {
        for (var i = 0; i < set.length; i++) {
            var block = this.puzzle.blocks.splice(this.puzzle.blocks.indexOf(set[i]), 1);
            delete block;
            this.score += 10;
        }
    }

}; 