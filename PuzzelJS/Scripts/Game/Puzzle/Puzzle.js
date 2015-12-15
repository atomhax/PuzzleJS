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
   
    this._moveBlocksUp = new MoveBlocksUp();
    this._reset = new Reset();
    this._RemoveSet = new RemoveSet();
    this._CheckSet = new CheckSet();
    this._gravity = new Gravity(this._CheckSet, this._RemoveSet);
    this._setup = new Setup();
    this._support = new Support();

    //Public
    this.Tick = function()
    {
        //Add To Total Ticks
        this.totalTicks++;

        //If Gravity Is on, then Tick Gravity
        //other wise Tick MoveBlocksUp
        if (this._Gravity.InAction()) {
            this._Gravity.Tick();
        } else {
            this._MoveBlocksUp.Tick();
           
        }

        //If selector has a swap in Process
        //then continue the swap
        if (this.selector.swapInProcess) {
            this.selector.ContinueSwap()
        }

        //If a new set is found, start the removeal of that set.
        var sets = this._Sets.CheckForNewSets();
        if(sets.length > 0){
            this._RemoveSets(sets);
        }

        //Increment all sets that are in removal
        this._RemoveSet.IncRemoveSets();
    }

    //Public User Faceing
    this.SelectorSwapped = function ()
    {
        var sets = this._Sets.CheckForNewSets();
        if (sets.length > 0) {
            this._RemoveSets(sets);
        }
        this._Gravity();
    }
    this.ForceBlocksUp = function () {
        this._moveBlocksUp.PushBlocks = true;
    }
    this.ForceBlocksUpStop = function () {
        this._moveBlocksUp.PushBlocksStop = true;
    }
    this.Reset = function () {
        this.totalTicks = 0;
        this.blocks = [];
        this.score = 0;
        this.level = 1;
        this.inPlay = true;

        this.selector.Reset();
        this._gravity.Reset();
        this._moveBlocksUp.Reset();   
    }

};