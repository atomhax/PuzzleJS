function Materials() {
    //Block
    this.blockSVG = new Image();
    this.blockSVG.Loaded = false;

    //Load
    this._onLoad = function (callBackFunction, material) {
        material.Loaded = true;

        if (this.blockSVG.Loaded === true)
            callBackFunction();

    }
    this.Load = function (callBackFunction) {
        this.callBackFunction = callBackFunction;
        var Materials = this;


        this.blockSVG.src = "/Content/Files/block.png";
        this.blockSVG.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.blockSVG);
        }
        var x = 0;
        x++;
        x = 5;
    }
};