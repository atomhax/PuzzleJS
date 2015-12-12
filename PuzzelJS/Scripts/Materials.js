function Materials() {
    //Block
    this.block = new Image();
    this.block.Loaded = false;

    //Load
    this._onLoad = function (callBackFunction, material) {
        material.Loaded = true;

        if (this.block.Loaded === true)
            callBackFunction();

    }
    this.Load = function (callBackFunction) {
        this.callBackFunction = callBackFunction;
        var Materials = this;


        this.block.src = "/Content/Files/block.png";
        this.block.onload = function (e) {
            var callBackFunction = callBackFunction;
            Materials._onLoad(Materials.callBackFunction, Materials.block);
        }
        var x = 0;
        x++;
        x = 5;
    }
};