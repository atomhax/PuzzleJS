function Gravity( puzzle )
{
    this.active = false;
    this.puzzle = puzzle;
    this._gravityInstances = new Array();

    //Public
    this.reset = function () {
        this._gravityInstances = new Array();
    }
    this.tick = function (gravityInstance) {
        if (this._gravityInstances.length > 0) {
            this._InstanceTick(this._gravityInstances[0]);
        }
    }
    this.apply = function (gravityInstance) {
        var AtLeastOneBlockEffected = false;
        for (var row = 2; row < 11; row++) {
            for (var col = 1; col < 7; col++) {
                var block = this.puzzle._support.FindBlock(row, col);
                if (block != null) {
                    if (this._ApplyBlock(block)) {
                        AtLeastOneBlockEffected = true;
                    }
                }
            }
        }

        if (AtLeastOneBlockEffected === true && gravityInstance == null) {
            this.puzzle.ClearMoveBlocksUpArow();
            var gravityInstance = new GravityInstance();
            this._gravityInstances.push(gravityInstance);

        }
        else if (gravityInstance != null)
        {
            this._RemoveGravityInstance(gravityInstance);
        } 
      
    }   

    //Private
    this._applyBlock = function ( block ) {
        if (block.gravityInEffect === true || block.remove === true) {
            return;
        }

        var newRow = null;
        for (var row = block.row - 1; row > 0; row--) {
            if (!this.BlockReservedCheckRowOnly(row, block.row, block.col)) {
                newRow = row;
            }
        }

        if (newRow != null) {
            this.blocksInGravity = true;
            block.gravityInEffect = true;
            block.gravityTick = 0;
            block.gravityEndRow = newRow;
            return true;
        }
        return false;
    }
    this._blockReserved = function (blockRow, blockCol) {
        for (var i = 0; i < this.puzzle.blocks.length; i++) {
            var block = this.puzzle.blocks[i];
            if (block != null &&
                (block.gravityInEffect === true &&
                 block.col === blockCol &&
                 block.gravityEndRow === blockRow)) {
                return true;
            }
        }
        return false;
    }
    this._blockReservedInRow = function (searchRow, blockRow, blockCol) {
        for (var row = blockRow; row > 0; row--) {
            var block = this.puzzle._support.FindBlock(row, blockCol);
            if (block != null &&
                ((block.gravityInEffect === true &&
                 block.col === blockCol &&
                 block.gravityEndRow === searchRow) ||
                (block.gravityInEffect === false &&
                 block.col === blockCol &&
                 block.row === searchRow))) {
                return true;
            }
        }

        if (this.puzzle.selector.swapInProcess === true) {
            if (
                (this.puzzle.selector.left === null || (
                    this.puzzle.selector.left.col === blockCol &&
                    this.puzzle.selector.left.row === searchRow &&
                    (this.puzzle.selector.left.row + 1) === searchRow))
                &&
               (this.puzzle.selector.right === null || (
                this.puzzle.selector.right.col === blockCol &&
                this.puzzle.selector.right.row === searchRow &&
                (this.puzzle.selector.right.row - 1) === searchRow))
                ) {
                return true;
            }

        }

        return false;
    }
    this._RemoveGravityInstance = function (gravityInstance) {
        var gravityInstance = this._gravityInstances.splice(this._gravityInstances.indexOf(gravityInstance), 1);
        delete gravityInstance;   
    }
}; 