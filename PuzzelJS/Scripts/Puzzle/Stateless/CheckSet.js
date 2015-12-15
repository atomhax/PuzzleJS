function CheckSets(row, col, color, x, y)
{
    //public
    this.CheckForNewSets = function () {
        var sets = [];
        sets = this._GetSetsCols(sets);
        sets = this._GetSetsRows(sets);
        sets = this._CombineSets(sets);

        return sets;
    }

    //Check
    this._GetSetsCols = function (sets) {
        var set;
        for (var row = 1; row < 12; row++) {
            set = [];

            for (var col = 1; col < 7; col++) {
                var block = this._FindBlockNotInRemove(row, col);

                if (block != null) {
                    if (set.length === 0 ||
                        block.color === set[0].color) {
                        set.push(block)
                    }

                    else {
                        if (set.length >= 3) {
                            sets.push(set);
                        }
                        set = []
                        set.push(block)
                    }
                }
                else {
                    if (set.length >= 3) {
                        sets.push(set);
                    }
                    set = []
                }
            }
            if (set.length >= 3) {
                sets.push(set);
            }
        }
        return sets;
    }
    this._GetSetsRows = function (sets) {
        var set;
        for (var col = 1; col < 7; col++) {
            set = [];
            for (var row = 1; row < 12; row++) {
                var block = this._FindBlockNotInRemove(row, col);

                if (block != null) {
                    if (set.length === 0 ||
                        block.color === set[0].color) {
                        set.push(block)
                    }

                    else {
                        if (set.length >= 3) {
                            sets.push(set);
                        }
                        set = [];
                        set.push(block)
                    }
                }
                else {
                    if (set.length >= 3) {
                        sets.push(set);
                    }
                    set = [];
                }
            }
            if (set.length >= 3) {
                sets.push(set);
            }
        }
        return sets;
    }
    this._CombineSets = function (sets) {
        var combinedSets = [];

        for (var i = 0; i < sets.length; i++) {
            if (combinedSets.length === 0) {
                combinedSets.push(sets[i]);
            }
            else {
                var setFound = false;
                for (var j = 0; j < combinedSets.length; j++) {
                    if (this._CompareSet(combinedSets[j], sets[i])) {
                        setFound = true;
                        combinedSets[j] = this._CombineSet(combinedSets[j], sets[i]);
                        break;
                    }
                }
                if (!setFound) {
                    combinedSets.push(sets[i]);
                }
            }

        }

        return combinedSets;
    }
    this._CompareSet = function (setA, setB) {
        for (var i = 0; i < setA.length; i++) {
            for (var j = 0; j < setB.length; j++) {
                if (setA[i].row == setB[j].row &&
                    setA[i].col == setB[j].col) {
                    return true;
                }
            }
        }
        return false;
    }
    this._CombineSet = function (setA, setB) {
        var foundMatch = false;
        var newSet = [];
        for (var j = 0; j < setB.length; j++) {
            newSet.push(setB[j]);
        }
        for (var i = 0; i < setA.length; i++) {
            var foundMatch = false;
            for (var j = 0; j < setB.length; j++) {
                if ((setA[i].row == setB[j].row &&
                    setA[i].col == setB[j].col)) {
                    foundMatch = true;
                    break;
                }
            }
            if (foundMatch === false) {
                newSet.push(setA[i]);
            }
        }
        return newSet;
    }
    this._FindBlockNotInRemove = function (row, col) {
        var block = null;
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].row === row && this.blocks[i].col === col && this.blocks[i].remove === false) {
                block = this.blocks[i];
                break;
            }
        }
        return block;
    }

}; 