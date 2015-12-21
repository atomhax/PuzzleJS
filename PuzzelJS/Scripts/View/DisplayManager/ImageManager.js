﻿function ImageManager()
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

    this.selector = new Image();
    this.selector.Loaded = false;
  
    //Load
    this._onLoad = function (image) {
        image.Loaded = true;

    }
    this.load = function () {

        var images = this;

        this.layout.src = "/Content/Files/layout.png";
        this.layout.onload = function (e) {
            images._onLoad(this);
        }

        this.block.src = "/Content/Files/50x50/block.png";
        this.block.onload = function (e) {
            images._onLoad(this);
        }

        this.blockBlue.src = "/Content/Files/50x50/BlockBlue.png";
        this.blockBlue.onload = function (e) {
            images._onLoad(this);
        }

        this.blockGreen.src = "/Content/Files/50x50/BlockGreen.png";
        this.blockGreen.onload = function (e) {
            images._onLoad(this);
        }

        this.blockPurple.src = "/Content/Files/50x50/BlockPurple.png";
        this.blockPurple.onload = function (e) {
            images._onLoad(this);
        }

        this.blockYellow.src = "/Content/Files/50x50/BlockRed.png";
        this.blockYellow.onload = function (e) {
            images._onLoad(this);
        }

        this.blockRed.src = "/Content/Files/50x50/BlockYellow.png";
        this.blockRed.onload = function (e) {
            images._onLoad(this);
        }

        this.selector.src = "/Content/Files/Selecter.png";
        this.selector.onload = function (e) {
            images._onLoad(this);
        }
      
    }
    this.loaded = function () {
        if (this.layout.Loaded === true &&
            this.block.Loaded === true &&
            this.blockBlue.Loaded === true &&
            this.blockGreen.Loaded === true &&
            this.blockPurple.Loaded === true &&
            this.blockYellow.Loaded === true &&
            this.blockRed.Loaded === true &&
            this.selector.Loaded == true) {
            return true;
        } else {
            return false;
        }
    }
};