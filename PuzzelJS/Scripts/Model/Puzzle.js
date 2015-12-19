function Puzzle() {

    //Data
    this.active = true;
    this._ticks = 0;
    this._blocks = [];
    this._score = 0;
    this._level = 1;
    this._soundRequests = [];
    this._setupBlocks = new SetupBlocks(this);
    this._moveBlocksUp = new MoveBlocksUp(this);
    this._gravity = new Gravity(this);
    this._selector = new Selector(this, 2, 3);
    this._getNewSets = new GetNewSets(this);
    this._removeSet = new RemoveSet(this);
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
        this._setupBlocks.run(4);
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
            if (this._selector.swapInProcess) {
                this._selector.ContinueSwap()
            }

            //If a new set is found, start the removeal of that set.
            var sets = this._getNewSets.run();
            if (sets.length > 0) {
                this._removeSet.removeSets(sets);
            }

            //Increment all sets that are in removal
            this._removeSet.tick();
        }

    }

    this.getBlocks = function () {
        return this._blocks;
    }
    this.getSelector = function () {
        return this._selector;
    }
    this.getBlockInc = function () {
        return this._moveBlocksUp._blockInc;
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

    }
    this.selectorRight = function () {

    }
    this.selectorUp = function () {

    }
    this.selectorDown = function () {

    }
    this.selectorSwap = function () {

    }
    this.fastBlockOn = function () {
        if (this.inPlay === true && this._gravity.InAction() === false && this.selector.swapInProcess === false && this._removeSet.running === false) {
            this.moveBlocksUp.PushBlocks = true;
        }
    }
    this.fastBlockOff = function () {
        if (this.inPlay === true && this._gravity.InAction() === false && this.selector.swapInProcess === false && this._removeSet.running === false) {
            this.moveBlocksUp.PushBlocksStop = true;
        }
    }

    //Private Functions
    this.addSoundRequest = function (soundRequest) {
        _soundRequests.push(soundRequest)
    }
};