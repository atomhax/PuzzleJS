function RemoveSet(puzzle)
{
    this.running = false;

    this.puzzle = puzzle;
    //publichttp://localhost:7669/Scripts/Game
    this.RemoveSets = function (sets, combo) {
        this.running = true;
        this.puzzle.ClearMoveBlocksUpArow();
        this._ChainScore(combo);
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

        var atLeastOne = false;
        for (var i = 0; i < this.puzzle.blocks.length; i++) {
            if (this.puzzle.blocks[i].remove === true) {
                atLeastOne = true;
                break;
            }
        }
        this.running = atLeastOne;
       
    }
    this._RemoveSet = function (set) {
        this._BlockScore(set.length);
        for (var i = 0; i < set.length; i++) {
            var block = this.puzzle.blocks.splice(this.puzzle.blocks.indexOf(set[i]), 1);
            delete block;
        }
    }

    this._ChainScore = function (combo) {
        var addtionalScore = 0;
      
        if(combo == 2) {
            addtionalScore = 50;
        }
        if(combo == 3) {
            addtionalScore = 130;
        }
        if(combo == 4) {
            addtionalScore = 280;
        }
        if(combo == 5) {
            addtionalScore = 580;
        }
        if(combo == 6) {
            addtionalScore = 980;
        }
        if(combo == 7) {
            addtionalScore = 1480;
        }
        if(combo == 8) {
            addtionalScore = 2180;
        }
        if(combo == 9) {
            addtionalScore = 3080;
        }
        if(combo === 10) {
            addtionalScore = 4180;
        }
        if(combo == 11) {
            addtionalScore = 5480;
        }
        if(combo == 12) {
            addtionalScore = 6980;
        }
        if(combo > 12) {
            addtionalScore = 6980 + ((combo - 12) * 1800);
        }

        this.puzzle.score += addtionalScore;

    }
    this._BlockScore = function (blocks) {
        var addtionalScore = 0;

        if(blocks == 3) {
            addtionalScore = 30;
        }
        if(blocks == 4) {
            addtionalScore = 70;
        }
        if(blocks == 5) {
            addtionalScore = 100;
        }
        if(blocks == 6) {
            addtionalScore = 210;
        }
        if(blocks == 7) {
            addtionalScore = 260;
        }
        if(blocks == 8) {
            addtionalScore = 310;
        }
        if(blocks == 9) {
            addtionalScore = 360;
        }
        if(blocks == 10) {
            addtionalScore = 410;
        }
        if(blocks == 11) {
            addtionalScore = 510;
        }
        if(blocks == 12) {
            addtionalScore = 570;
        }
        if(blocks == 13) {
            addtionalScore = 630;
        }
        if(blocks == 14) {
            addtionalScore = 690;
        }
        if(blocks == 15) {
            addtionalScore = 850;
        }
        if(blocks == 16) {
            addtionalScore = 920;
        }
        if(blocks == 17) {
            addtionalScore = 1020;
        }
        if(blocks == 18) {
            addtionalScore = 1150;
        }
        if(blocks == 19) {
            addtionalScore = 1310;
        }
        if(blocks == 20) {
            addtionalScore = 1500;
        }
        if(blocks == 21) {
            addtionalScore = 1720;
        }
        if(blocks == 22) {
            addtionalScore = 1970;
        }
        if(blocks == 23) {
            addtionalScore = 2250;
        }
        if(blocks == 24) {
            addtionalScore = 2560;
        }
        if(blocks == 25) {
            addtionalScore = 2900;
        }
        if(blocks == 26) {
            addtionalScore = 3270;
        }
        if(blocks == 27) {
            addtionalScore = 3670;
        }
        if(blocks == 28) {
            addtionalScore = 4100;
        }
        if(blocks == 29) {
            addtionalScore = 4560;
        }
        if(blocks == 30) {
            addtionalScore = 5050;
        }
        if(blocks == 31) {
            addtionalScore = 5570;
        }
        if(blocks == 32) {
            addtionalScore = 15320;
        }
        if(blocks == 33) {
            addtionalScore = 15900;
        }
        if(blocks == 34) {
            addtionalScore = 16510;
        }
        if(blocks == 35) {
            addtionalScore = 17150;
        }
        if(blocks == 36) {
            addtionalScore = 17820;
        }
        if(blocks == 37) {
            addtionalScore = 18520;
        }
        if(blocks == 38) {
            addtionalScore = 19250;
        }
        if(blocks == 39) {
            addtionalScore = 20010;
        }
        if(blocks == 40) {
            addtionalScore = 20800;
        }
        if(blocks > 40) {
            addtionalScore = 20400 + ((blocks - 40) * 800) + (blocks * 10);
        }
        this.puzzle.score += addtionalScore;

    }
}; 