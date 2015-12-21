// JavaScript source code
function AudioManager() {
    //Data
    this._soundEffects = [];
    this._music = new Audio('/Content/Files/Swap.mp3');

    //Functions
    this.run = function (soundRequests) {
        for (var i = 0; i < soundRequests.length; i++) {
            if (soundRequests[i] === SoundRequest.Pause) {
                this._pause();
            }
            if (soundRequests[i] === SoundRequest.Resume) {
                this._resume();
            }
            if (soundRequests[i] === SoundRequest.MusicStart) {
                this._musicStart();
            }
            if (soundRequests[i] === SoundRequest.MusicMute) {
                this._musicMute();
            }
            if (soundRequests[i] === SoundRequest.MusicUnMute) {
                this._musicUnMute();
            }
            if (soundRequests[i] === SoundRequest.SoundEffectsMute) {
                this._soundEffectsMute();
            }
            if (soundRequests[i] === SoundRequest.SoundEffectsUnMute) {
                this._soundEffectsUnMute();
            }
            if (soundRequests[i] === SoundRequest.Swap) {
                this._swap();
            }
            if (soundRequests[i] === SoundRequest.BlocksFall) {
                this._blocksFall();
            }
            if (soundRequests[i] === SoundRequest.BlockSet) {
                this._blockSet();
            }
            if (soundRequests[i] === SoundRequest.Combo) {
                this._combo();
            }
            if (soundRequests[i] === SoundRequest.LargeCombo) {
                this._largeCombo();
            }
            if (soundRequests[i] === SoundRequest.Chain) {
                this._chain();
            }
            if (soundRequests[i] === SoundRequest.LargeChain) {
                this._largeChain();
            }
        }
    }
    this.load = function (soundRequests) {

    }
    this.loaded = function (soundRequests) {
        return true;
    }
    this.reset = function () {

    }

    //General Controls
    this._pause = function () {

    }
    this._resume = function () {
     
    }

    //Music
    this._musicStart = function () {

    }
    this._musicMute = function () {
     
    }
    this._musicUnMute = function () {

    }

    //Sound Effects
    this._soundEffectsMute = function () {

    }
    this._soundEffectsUnMute = function () {

    }
    this._swap = function () {
     
    }
    this._blocksFall = function () {
      
    }
    this._blockSet = function () {
     
    }
    this._combo = function () {

    }
    this._largeCombo = function () {

    }
    this._chain = function () {

    }
    this._largeChain = function () {

    }

};