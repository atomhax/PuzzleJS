function Puzzle(BLOCK_COLORS, audio) {
   
    //Constants
    this.BLOCK_COLORS = BLOCK_COLORS;

    //Selector
    this.totalTicks = 0;
    this.selector = new Selector(2, 3, this, audio);
    this.blocks = [];
    this.score = 0;
    this.level = 1;
    this.inPlay = true;

    //Logic
    this.moveBlocksUp = new MoveBlocksUp(this);
    this._removeSet = new RemoveSet(this);
    this._checkSet = new CheckSet(this);
    this._gravity = new Gravity(this);
 
    this._support = new Support(this);
    this._setupBlocks = new SetupBlocks(this);
    //Public
    this.Tick = function()
    {
        //Add To Total Ticks
        this.totalTicks++;

        //If Gravity Is on, then Tick Gravity
        //other wise Tick MoveBlocksUp
        if (this._gravity.InAction()) {
            this._gravity.Tick();
        } else {
            this.moveBlocksUp.Tick();
           
        }

        //If selector has a swap in Process
        //then continue the swap
        if (this.selector.swapInProcess) {
            this.selector.ContinueSwap()
        }

        //If a new set is found, start the removeal of that set.
        var sets = this._checkSet.CheckForNewSets();
        if(sets.length > 0){
            this._removeSet.RemoveSets(sets);
        }

        //Increment all sets that are in removal
        this._removeSet.IncRemoveSets();
    }

    //Public User Faceing
    this.SelectorSwapped = function ()
    {
        var sets = this._checkSet.CheckForNewSets();
        if (sets.length > 0) {
            this._removeSet.RemoveSets(sets);
        }
        this._gravity.Apply();
    }
    this.ForceBlocksUp = function () {
        this.moveBlocksUp.PushBlocks = true;
    }
    this.ForceBlocksUpStop = function () {
        this.moveBlocksUp.PushBlocksStop = true;
    }
    this.Reset = function () {
        this.totalTicks = 0;
        this.blocks = new Array();
        this.score = 0;
        this.level = 1;
        this.inPlay = true;
        this.selector.Reset(2, 3);
        this._setupBlocks.CreateStartingBlocks(4);
        this._gravity.Reset();
        this.moveBlocksUp.Reset();   
    }

};