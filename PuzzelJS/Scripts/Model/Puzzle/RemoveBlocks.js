function RemoveBlocks(puzzle)
{
    //Data
    this.active = false;
    this._puzzle = puzzle;
    this._removalInstances = new Array();

    //Functions
    this.reset = function () {
        this._removalInstances = new Array();
        this.active = false;
    }
    this.tick = function () {

        for (var i = 0; i < this._removalInstances.length; i++) {
            this._removalInstances[i].tick++;
            if (this._removalInstances[i].tick === 60) {
                
                //Remove Block Sets
                this._removeBlockSets(this._removalInstances[i]);


                //Remove _removalInstances
                var chain = this._removalInstances[i].chain;
                var removalInstance = this._removalInstances.splice(i, 1);
                delete removalInstance;
                i--;

                //Apply gravity
                this._puzzle._gravity.apply(chain);

                
            }
        }

        if (this._removalInstances.length === 0) {
            this.active = false;
        }

    }
    this.removeSetsOfBlocks = function (setsOfBlocks, chain) {
        this.running = true;
        this._puzzle._moveBlocksUp.clearMoveBlocksUp();
        if (chain == null) {
            chain = 1;
        } else {
            chain++;
        }

        //Create removeSetsOfBlocks
        var totalBlocks = 0;
        for (var i = 0; i < setsOfBlocks.length; i++) {
            for (var j = 0; j < setsOfBlocks[i].length; j++) {
                setsOfBlocks[i][j].state = BlockState.Remove;
                totalBlocks++;
            }
        }

        //Score
        this._puzzle._chainScore(chain);
        this._puzzle._totalBlockScore(totalBlocks);

        var removeSetsOfBlocks = new RemovalInstance(chain, setsOfBlocks);
        this._removalInstances.push(removeSetsOfBlocks);
    }

    //private
    this._removeBlockSets = function (removalInstance) {

        //Delete Blocks
        for (var i = 0; i < removalInstance.setsOfBlocks.length; i++) {
            var blockSet = removalInstance.setsOfBlocks[i];
            for (var j = 0; j < blockSet.length; j++) {
                var block = this._puzzle._blocks.splice(this._puzzle._blocks.indexOf(blockSet[j]), 1);
                delete block;
            }
        }
    }
};