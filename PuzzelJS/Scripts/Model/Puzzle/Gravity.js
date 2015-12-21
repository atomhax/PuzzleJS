function Gravity(puzzle) {

    //Variables
    this.active = false;

    this._puzzle = puzzle;
    this._blocks = new Array();
    this._blocksRowAfterGravity = new Array();
    this._chain = 0;
    this._tick = 0;

    //Functions
    this.reset = function () {
        this.active = false;
        this._blocks = new Array();
        this._blocksRowAfterGravity = new Array();
        this._chain = 0;
        this._tick = 0;
    }
    this.tick = function () {
        if (this.active === true) {
            var blocksLanded = false;
            this._tick++;
            if (this._tick === 10) {

                //Drop Blocks
                for (var i = 0; i < this._blocks.length; i++) {
                    this._blocks[i].row = this._blocksRowAfterGravity[i].row;
                    this._blocks[i].state = BlockState.None;
                }

                //Sound Effect
                this._puzzle._addSoundRequest(SoundRequest.EffectFall);

                //Look For New Block Sets
                var newBlockSets = this._puzzle._findBlockSets.run();
                
                //Reset
                var chain = this._chain;
                this.reset();

                //If New Block Sets are Found, then trigger Removeal
                if (newBlockSets.length > 0) {
                    this._puzzle._removeBlocks.removeSetsOfBlocks(newBlockSets, chain);
                }



            }

        }
     
    }  
    this.apply = function (chain) {
        if (chain == null)  {
            chain = 0;
        }
        for (var row = 2; row < 11; row++) {
            for (var col = 1; col < 7; col++) {
                var block = this._puzzle._getBlock(row, col);
                if (block != null) {
                    if (this._applyBlock(block)) {
                        this._blocks.push(block);
                    }
                }
            }
        }

        if (this._blocks.length > 0) {
            this._puzzle._moveBlocksUp.clearMoveBlocksUp();
            this.active = true;
            this._chain = chain;
        }
 
    }

    this._applyBlock = function ( block ) {
        if (block.state != BlockState.None) {
            return;
        }

        var newRow = null;
        for (var row = block.row - 1; row > 0; row--) {
            if (!this._blockReserved(row, block.col)) {
                newRow = row;
            }
        }

        if (newRow != null) {
            block.state = BlockState.Gravity;
            this._blocksRowAfterGravity.push(new BlockStateAfterGravity(newRow, block.col));
            return true;
        }
        return false;
    }
    this._blockReserved = function (row, col) {
        var block = this._puzzle._getBlock(row, col);
        if (block != null &&
            block.state !== BlockState.Gravity) {
            return true;
        }
        if (this._blockReservedDueToGravity(row, col)) {
            return true;
        }
        return false;
    }
    this._blockReservedDueToGravity = function (row, col) {
        for (var i = 0; i < this._blocksRowAfterGravity.length; i++) {
            if (this._blocksRowAfterGravity[i].row === row && this._blocksRowAfterGravity[i].col === col) {
                return true;
            }
        }
        return false;
    }
}; 