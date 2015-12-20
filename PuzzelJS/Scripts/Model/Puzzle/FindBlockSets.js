function FindBlockSets(puzzle)
{
    //Data
    this._puzzle = puzzle;

    //Functions
    this.run = function () {
        var sets = [];
        sets = this._getSetsCols(sets);
        sets = this._getSetsRows(sets);
        sets = this._combineSets(sets);

        return sets;
    }
    this._getSetsCols = function (sets) {
        var set;
        for (var row = 1; row < 12; row++) {
            set = [];

            for (var col = 1; col < 7; col++) {
                var block = this._getAvailableBlock(row, col);

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
    this._getSetsRows = function (sets) {
        var set;
        for (var col = 1; col < 7; col++) {
            set = [];
            for (var row = 1; row < 12; row++) {
                var block = this._getAvailableBlock(row, col);

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
    this._combineSets = function (sets) {
        var combinedSets = [];

        for (var i = 0; i < sets.length; i++) {
            if (combinedSets.length === 0) {
                combinedSets.push(sets[i]);
            }
            else {
                var setFound = false;
                for (var j = 0; j < combinedSets.length; j++) {
                    if (this._compareSet(combinedSets[j], sets[i])) {
                        setFound = true;
                        combinedSets[j] = this._combineSet(combinedSets[j], sets[i]);
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
    this._combineSet = function (setA, setB) {
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
    this._compareSet = function (setA, setB) {
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
    this._getAvailableBlock = function (row, col) {
        var block = this._puzzle._support.getBlock(row, col);
        if (block != null && block.state === BlockState.None) {
            return block;
        } else {
            return null;
        }
    }
}; 