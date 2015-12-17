function Images(callBackFunction)
{
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
    
    this.callBackFunction = callBackFunction;

    //Load
    this._onLoad = function (image) {
        image.Loaded = true;

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
    this.Load = function () {

        var images = this;

        this.layout.src = "/Content/Files/layout.png";
        this.layout.onload = function (e) {
            this._onLoad(this.callBackFunction, this.layout);
        }

        this.block.src = "/Content/Files/50x50/block.png";
        this.block.onload = function (e) {
            this._onLoad(this.callBackFunction, this.block);
        }

        this.blockBlue.src = "/Content/Files/50x50/BlockBlue.png";
        this.blockBlue.onload = function (e) {
            this._onLoad(this.callBackFunction, this.blockBlue);
        }

        this.blockGreen.src = "/Content/Files/50x50/BlockGreen.png";
        this.blockGreen.onload = function (e) {
            this._onLoad(this.callBackFunction, this.blockGreen);
        }

        this.blockPurple.src = "/Content/Files/50x50/BlockPurple.png";
        this.blockPurple.onload = function (e) {
            this._onLoad(this.callBackFunction, this.blockPurple);
        }

        this.blockYellow.src = "/Content/Files/50x50/BlockRed.png";
        this.blockYellow.onload = function (e) {
            this._onLoad(this.callBackFunction, this.blockYellow);
        }

        this.blockRed.src = "/Content/Files/50x50/BlockYellow.png";
        this.blockRed.onload = function (e) {
            this._onLoad(this.callBackFunction, this.blockRed);
        }

        this.selecter.src = "/Content/Files/Selecter.png";
        this.selecter.onload = function (e) {
            this._onLoad(this.callBackFunction, this.selecter);
        }
      
    }
};