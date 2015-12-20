function InputActions(tick, tickEnd, row, col, chain, set) {

    //Data
    this.selectorLeft = false;
    this.selectorRight = false;
    this.selectorDown = false;
    this.selectorUp = false;
    this.selectorSwap = false;
    this.reset = false;
    this.pause = false;
    this.blocksFastOn = false;
    this.blocksFastOff = false;
    //functions
    this.clear = function () {
        this.selectorLeft = false;
        this.selectorRight = false;
        this.selectorDown = false;
        this.selectorUp = false;
        this.selectorSwap = false;
        this.reset = false;
        this.pause = false;
        this.blocksFastOn = false;
        this.blocksFastOff = false;
    }
};