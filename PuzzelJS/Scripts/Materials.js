function Materials() {

    //Blocks
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

    //Load
    this._onLoad = function (callBackFunction, material) {
        material.Loaded = true;

        if (this.block.Loaded === true &&
            this.blockBlue.Loaded === true &&
            this.blockGreen.Loaded === true &&
            this.blockPurple.Loaded === true &&
            this.blockYellow.Loaded === true &&
            this.blockRed.Loaded === true)
        {
            callBackFunction();
        }
            

    }
    this.Load = function (callBackFunction) {
        this.callBackFunction = callBackFunction;
        var Materials = this;


        this.block.src = "/Content/Files/block.png";
        this.block.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.block);
        }

        this.blockBlue.src = "/Content/Files/BlockBlue.png";
        this.blockBlue.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.blockBlue);
        }

        this.blockGreen.src = "/Content/Files/BlockGreen.png";
        this.blockGreen.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.blockGreen);
        }

        this.blockPurple.src = "/Content/Files/BlockPurple.png";
        this.blockPurple.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.blockPurple);
        }

        this.blockYellow.src = "/Content/Files/BlockRed.png";
        this.blockYellow.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.blockYellow);
        }

        this.blockRed.src = "/Content/Files/BlockYellow.png";
        this.blockRed.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.blockRed);
        }
      
    }
};