function RemoveSet()
{
    //public
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
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].remove === true) {
                this.blocks[i].removeTick++;
                if (this.blocks[i].removeTick == this.blocks[i].removeAtTick) {
                    removeSet.push(this.blocks[i]);

                }
            }
        }

        //RemoveBlocks
        this._RemoveSet(removeSet);
        if (removeSet.length > 0) {
            this._Gravity();
        }

    }
    this._RemoveSet = function (set) {
        for (var i = 0; i < set.length; i++) {
            var block = this.blocks.splice(this.blocks.indexOf(set[i]), 1);
            delete block;
            this.score += 10;
        }
    }

}; 