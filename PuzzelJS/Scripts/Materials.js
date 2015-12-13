function Materials() {

    //Blocks
    this.layout = new Image();
    this.layout.Loaded = false;

  

    this.block = new Image();
    this.block.Loaded = false;

    this.blockBlue = new Image();
    this.blockBlue.Loaded = false;

    this.blockGreen = new Image();
    this.blockGreen.Loaded = false;

    this.blockPurple = new Image();
    this.blockPurple.Loaded = false;

    this.blockYellow = new Image();
    this.blockYellow.Loaded = false;

    this.blockRed = new Image();
    this.blockRed.Loaded = false;

    this.selecter = new Image();
    this.selecter.Loaded = false;
    

    //Load
    this._onLoad = function (callBackFunction, material) {
        material.Loaded = true;

        if (this.layout.Loaded === true &&
            this.block.Loaded === true &&
            this.blockBlue.Loaded === true &&
            this.blockGreen.Loaded === true &&
            this.blockPurple.Loaded === true &&
            this.blockYellow.Loaded === true &&
            this.blockRed.Loaded === true &&
            this.selecter.Loaded == true)
        {
            callBackFunction();
        }
            

    }
    this.Load = function (callBackFunction) {
        this.callBackFunction = callBackFunction;
        var Materials = this;

        this.layout.src = "/Content/Files/layout.png";
        this.layout.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.layout);
        }

        this.block.src = "/Content/Files/50x50/block.png";
        this.block.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.block);
        }

        this.blockBlue.src = "/Content/Files/50x50/BlockBlue.png";
        this.blockBlue.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.blockBlue);
        }

        this.blockGreen.src = "/Content/Files/50x50/BlockGreen.png";
        this.blockGreen.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.blockGreen);
        }

        this.blockPurple.src = "/Content/Files/50x50/BlockPurple.png";
        this.blockPurple.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.blockPurple);
        }

        this.blockYellow.src = "/Content/Files/50x50/BlockRed.png";
        this.blockYellow.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.blockYellow);
        }

        this.blockRed.src = "/Content/Files/50x50/BlockYellow.png";
        this.blockRed.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.blockRed);
        }

        this.selecter.src = "/Content/Files/Selecter.png";
        this.selecter.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.selecter);
        }
      
    }
};