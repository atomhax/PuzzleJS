// JavaScript source code
function AudioManager() {
    //Data
    this._soundEffects = [];
    this._music = new Audio('/Content/Files/Swap.mp3');

    //Functions
    this.run = function(soundRequests){

    }
    this.load = function (soundRequests) {

    }
    this.loaded = function (soundRequests) {
        return true;
    }

    //General Controls
    this._reset = function (reset) {

    }
    this._pause = function () {

        //this._music.pause

        //for (var i = 0; i < this._sounds.length; i++) {
        //this._sounds[i].pause
        // }
    }
    this._resume = function () {
        //this._music.resume

        //for (var i = 0; i < this._sounds.length; i++) {
        //this._sounds[i].resume
        //}
    }

    //Music
    this._playMusic = function () {   
        //music.play();
    }
    this._muteMusic = function () {
       // this._music.Mute...
    }
    this._unmuteMusic = function () {
      //  this._music.UnMute..
    }
    this._musicEnded = function () {
        //this._music.currentTime = 0;
        //this._music.play();
    }

    //Sound Effects
    this._swapSoundEffect = function () {
        //swap = new Audio("/Content/Files/Swap.mp3");
        //swap.addEventListener("ended", SoundEffectEnded);
        //swap.play();
        //this._sounds.push(swap);
    }
    this._clearSoundEffect = function () {
      
    }
    this._dropSoundEffect = function () {

    }
    this._soundEffectEnded = function () {
        //this refers to the SoundEffect. It may be differnt code this is just the general Idea
        //this._sounds.splice(this._sounds.indexOf(this), 1);
        //delete this;
    }

    //Events
    this._music.addEventListener('ended', this._musicEnded);

};