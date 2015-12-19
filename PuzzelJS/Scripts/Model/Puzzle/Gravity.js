function Gravity( puzzle )
{
    this.active = false;
    this._puzzle = puzzle;
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
                var block = this._puzzle._support.getBlock(row, col);
                if (block != null) {
                    if (this._applyBlock(block)) {
                        AtLeastOneBlockEffected = true;
                    }
                }
            }
        }

        if (AtLeastOneBlockEffected === true && gravityInstance == null) {
            this._puzzle._moveBlocksUp.clearMoveBlocksUp();
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
        if (block.state != BlockState.None) {
            return;
        }

        var newRow = null;
        for (var row = block.row - 1; row > 0; row--) {
            if (!this._blockReservedInRow(row, block.row, block.col)) {
                newRow = row;
            }
        }

        if (newRow != null) {
            this._blocksInGravity = true;
            block.state = BlockState.Gravity;
            return true;
        }
        return false;
    }
    this._blockReserved = function (blockRow, blockCol) {
        for (var i = 0; i < this._puzzle._blocks.length; i++) {
            var block = this._puzzle._blocks[i];
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
            var block = this._puzzle._support.getBlock(row, blockCol);
            if (block != null &&
                ((block.state === BlockState.Gravity &&
                 block.col === blockCol &&
                 block.gravityEndRow != BlockState.Gravity) ||
                (block.state === BlockState.None &&
                 block.col === blockCol &&
                 block.row === searchRow))) {
                return true;
            }
        }

        if (this._puzzle._selector.active === true) {
            if (
                (this._puzzle.selector.left === null || (
                    this._puzzle.selector.left.col === blockCol &&
                    this._puzzle.selector.left.row === searchRow &&
                    (this._puzzle.selector.left.row + 1) === searchRow))
                &&
               (this._puzzle.selector.right === null || (
                this._puzzle.selector.right.col === blockCol &&
                this._puzzle.selector.right.row === searchRow &&
                (this._puzzle.selector.right.row - 1) === searchRow))
                ) {
                return true;
            }

        }

        return false;
    }
    this._removeGravityInstance = function (gravityInstance) {
        var gravityInstance = this._gravityInstances.splice(this._gravityInstances.indexOf(gravityInstance), 1);
        delete gravityInstance;   
    }
}; 