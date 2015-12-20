function Puzzle() {

    //Data
    this.active = true;
    this._ticks = 0;
    this._blocks = [];
    this._score = 0;
    this._level = 1;
    this._soundRequests = [];

    this._moveBlocksUp = new MoveBlocksUp(this);
    this._gravity = new Gravity(this);
    this._selector = new Selector(this, 2, 3);
    this._findBlockSets = new FindBlockSets(this);
    this._removeBlocks = new RemoveBlocks(this);
    this._support = new Support(this);
    //Public  
    this.Reset = function () {
        this.active = true;
        this._ticks = 0;
        this._blocks = new Array();
        this._score = 0;
        this._level = 1;

        this._selector.reset(2, 3);
        this._gravity.reset();
        this._moveBlocksUp.reset();
        this._support.createSetupBlocks(4);
    }
    this.tick = function () {
        if (this.active) {
            //Add To Total Ticks
            this._ticks++;

            //If Gravity Is on, then Tick Gravity
            //other wise Tick MoveBlocksUp
            if (this._gravity.active) {
                this._gravity.tick();
            } else {
                this._moveBlocksUp.tick();

            }

            //If selector has a swap in Process
            //then continue the swap
            if (this._selector.active) {
                this._selector.tick()
            }

            //If a new set is found, start the removeal of that set.
            var sets = this._findBlockSets.run();
            if (sets.length > 0) {
                this._removeBlocks.removeSetsOfBlocks(sets);
            }

            //Increment all sets that are in removal
            this._removeBlocks.tick();
        }

    }

    this.getBlocks = function () {
        return this._blocks;
    }
    this.getSelector = function () {
        return this._selector;
    }
    this.getBlockInc = function () {
        return this._moveBlocksUp.blockInc;
    }
    this.getScore = function () {
        return this._score;
    }
    this.getLevel = function () {
        return this._level;
    }
    this.getSoundRequests = function () {
        return this._soundRequests;
    }
    this.clearSoundRequests = function () {
        return this._soundRequests = [];
    }

    //Player Functions
    this.selectorLeft = function () {
        this._selector.moveLeft();
    }
    this.selectorRight = function () {
        this._selector.moveRight();
    }
    this.selectorUp = function () {
        this._selector.moveUp();
    }
    this.selectorDown = function () {
        this._selector.moveDown();
    }
    this.selectorSwap = function () {
        this._selector.swap();
    }
    this.fastBlockOn = function () {
        if (this.active === true && this._gravity.active === false && this._selector.active === false && this._removeBlocks.active === false) {
            this._moveBlocksUp.pushBlocksOn = true;
        }
    }
    this.fastBlockOff = function () {
        if (this.active === true && this._gravity.active === false && this._selector.active === false && this._removeBlocks.active === false) {
            this._moveBlocksUp.pushBlocksEnd = true;
        }
    }
};