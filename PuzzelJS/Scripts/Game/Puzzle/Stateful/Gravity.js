function Gravity( puzzle, removeSet )
{
    var _gravityInstances = [];
    this.puzzle = puzzle;
   

    //Public
    this.Tick = function () {
        if (_gravityInstances.length > 0) {
            this._InstanceTick(_gravityInstances[0]);
        }
    }
    this.Apply = function (gravityInstance) {
        var AtLeastOneBlockEffected = false;
        for (var row = 2; row < 11; row++) {
            for (var col = 1; col < 7; col++) {
                var block = this._FindBlock(row, col);
                if (block != null) {
                    if (this._GravityBlock(block)) {
                        AtLeastOneBlockEffected = true;
                    }
                }
            }
        }


        if (AtLeastOneBlockEffected > 0 && this._gravityInstances === null) {
            var gravityInstance = new GravityInstance();
            this._gravityInstances.push(gravityInstance);

        }
        else if (gravityInstance !== null)
        {
            this._RemoveGravityInstance(gravityInstance);
        }
      
    }   
    this.InAction = function () {
        return (_gravityInstances.length > 0);
    }
    this.Reset = function () {
        this._gravityInstances = null;
    }
    //Private
    this._ApplyBlock = function ( block ) {
        if (block.gravityInEffect === true || block.remove === true) {
            return;
        }

        var newRow = null;
        for (var row = block.row - 1; row > 0; row--) {
            if (!this._BlockReservedCheckRowOnly(row, block.row, block.col)) {
                newRow = row;
            }
        }

        if (newRow !== null) {
            this.blocksInGravity = true;
            block.gravityInEffect = true;
            block.gravityTick = 0;
            block.gravityEndRow = newRow;
            return true;
        }
        return false;
    }
    this._InstanceTick = function ( gravityInstance ) {
        _gravityInstances.tick++;
        if (_gravityInstances.tick === 10) {
            for (var i = 0; i < this.blocks.length; i++)
            {
                if (this.blocks[i] != null && this.blocks[i].gravityInEffect === true) {
                    this.blocks[i].gravityInEffect = false;
                    this.blocks[i].row = this.blocks[i].gravityEndRow;
                    this.blocks[i].gravityEndRow = null;
                }
            }
            _gravityInstances.tick = 0;
        }

       
        var sets = _checkSet.CheckForNewSets();//Check for sets
        if (sets.length > 0) {
            gravityInstance.combos++;
            this._RemoveSets(sets,combo);
        }
        else {
            this._RemoveGravityInstance(gravityInstance);
        }

    }
    this._BlockReservedCheckRowOnly = function (searchRow, blockRow, blockCol) {
        for (var row = blockRow; row > 0; row--) {
            var block = puzzle.support.FindBlock(row, blockCol);
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

        if (this.selector.swapInProcess === true) {
            if (
                (this.selector.left === null || (
                    this.selector.left.col === blockCol &&
                    this.selector.left.row === searchRow &&
                    (this.selector.left.row + 1) === searchRow))
                &&
               (this.selector.right === null || (
                this.selector.right.col === blockCol &&
                this.selector.right.row === searchRow &&
                (this.selector.right.row - 1) === searchRow))
                ) {
                return true;
            }

        }

        return false;
    }
    this._BlockReserved = function (blockRow, blockCol) {
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
    this._RemoveGravityInstance = function (gravityInstance) {
        var gravityInstance = this._gravityInstances.splice(this._gravityInstances.indexOf(gravityInstance), 1);
        delete gravityInstance;   
    }
}; 