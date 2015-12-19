function RemoveSet(puzzle)
{
    //Data
    this.active = false;
    this._puzzle = puzzle;
    this._removeSets = [];

    //Functions
    this.reset = function () {

    }
    this.tick = function () {
        var removeSet = [];

        for (var i = 0; i < this._puzzle._blocks.length; i++) {
            if (this._puzzle._blocks[i].state === BlockState.Remove) {
                this._puzzle._blocks[i].removeTick++;
                if (this._puzzle._blocks[i].removeTick == this._puzzle._blocks[i].removeAtTick) {
                    removeSet.push(this._puzzle._blocks[i]);

                }
            }
        }
    }
    this.removeSets = function (sets, combo) {
        this.running = true;
        this._puzzle._moveBlocksUp.clearMoveBlocksUp();
        this._chainScore(combo);
        for (var i = 0; i < sets.length; i++) {
            for (var j = 0; j < sets[i].length; j++) {
                sets[i][j].state = BlockState.Remove;
                sets[i][j].removeTick = 0;
               // sets[i][j].startRemoveAtTick = 60 + j * 6;
                sets[i][j].removeAtTick = 60 + (sets[i].length) * 6;
            }
        }
    }

    //private
    this._removeSet = function(set){
        if (_removeSets.length > 0) {
            this._puzzle._gravity.Apply();
        }

        var atLeastOne = false;
        for (var i = 0; i < this._puzzle._blocks.length; i++) {
            if (this._puzzle._blocks[i].remove === true) {
                atLeastOne = true;
                break;
            }
        }
        this.running = atLeastOne;
       
    }
    this._chainScore = function (chain) {
        var addtionalScore = 0;
      
        if(chain == 2) {
            addtionalScore = 50;
        }
        if(chain == 3) {
            addtionalScore = 130;
        }
        if(chain == 4) {
            addtionalScore = 280;
        }
        if(chain == 5) {
            addtionalScore = 580;
        }
        if(chain == 6) {
            addtionalScore = 980;
        }
        if(chain == 7) {
            addtionalScore = 1480;
        }
        if(chain == 8) {
            addtionalScore = 2180;
        }
        if(chain == 9) {
            addtionalScore = 3080;
        }
        if(chain === 10) {
            addtionalScore = 4180;
        }
        if(chain == 11) {
            addtionalScore = 5480;
        }
        if(chain == 12) {
            addtionalScore = 6980;
        }
        if(chain > 12) {
            addtionalScore = 6980 + ((chain - 12) * 1800);
        }

        this._puzzle.score += addtionalScore;

    }
    this._blockScore = function (combo) {
        var addtionalScore = 0;

        if(combo == 3) {
            addtionalScore = 30;
        }
        if(combo == 4) {
            addtionalScore = 70;
        }
        if(combo == 5) {
            addtionalScore = 100;
        }
        if(combo == 6) {
            addtionalScore = 210;
        }
        if(combo == 7) {
            addtionalScore = 260;
        }
        if(combo == 8) {
            addtionalScore = 310;
        }
        if(combo == 9) {
            addtionalScore = 360;
        }
        if(combo == 10) {
            addtionalScore = 410;
        }
        if(combo == 11) {
            addtionalScore = 510;
        }
        if(combo == 12) {
            addtionalScore = 570;
        }
        if(combo == 13) {
            addtionalScore = 630;
        }
        if(combo == 14) {
            addtionalScore = 690;
        }
        if(combo == 15) {
            addtionalScore = 850;
        }
        if(combo == 16) {
            addtionalScore = 920;
        }
        if(combo == 17) {
            addtionalScore = 1020;
        }
        if(combo == 18) {
            addtionalScore = 1150;
        }
        if(combo == 19) {
            addtionalScore = 1310;
        }
        if(combo == 20) {
            addtionalScore = 1500;
        }
        if(combo == 21) {
            addtionalScore = 1720;
        }
        if(combo == 22) {
            addtionalScore = 1970;
        }
        if(combo == 23) {
            addtionalScore = 2250;
        }
        if(combo == 24) {
            addtionalScore = 2560;
        }
        if(combo == 25) {
            addtionalScore = 2900;
        }
        if(combo == 26) {
            addtionalScore = 3270;
        }
        if(combo == 27) {
            addtionalScore = 3670;
        }
        if(combo == 28) {
            addtionalScore = 4100;
        }
        if(combo == 29) {
            addtionalScore = 4560;
        }
        if(combo == 30) {
            addtionalScore = 5050;
        }
        if(combo == 31) {
            addtionalScore = 5570;
        }
        if(combo == 32) {
            addtionalScore = 15320;
        }
        if(combo == 33) {
            addtionalScore = 15900;
        }
        if(combo == 34) {
            addtionalScore = 16510;
        }
        if(combo == 35) {
            addtionalScore = 17150;
        }
        if(combo == 36) {
            addtionalScore = 17820;
        }
        if(combo == 37) {
            addtionalScore = 18520;
        }
        if(combo == 38) {
            addtionalScore = 19250;
        }
        if(combo == 39) {
            addtionalScore = 20010;
        }
        if(combo == 40) {
            addtionalScore = 20800;
        }
        if(combo > 40) {
            addtionalScore = 20400 + ((combo - 40) * 800) + (combo * 10);
        }
        this._puzzle.score += addtionalScore;

    }
    this._generateBlockAttacks = function (chain, combo) {
       
    }
};