// JavaScript source code
function Sounds() {
    //Data
    this._soundEffects = [];
    this._music = new Audio('/Content/Files/Swap.mp3');

    //Functions
    this.run = new function(soundRequests){

    }

    //General Controls
    this._reset = new function (reset) {

    }
    this._pause = new function () {

        //this._music.pause

        //for (var i = 0; i < this._sounds.length; i++) {
        //this._sounds[i].pause
        // }
    }
    this._resume = new function () {
        //this._music.resume

        //for (var i = 0; i < this._sounds.length; i++) {
        //this._sounds[i].resume
        //}
    }

    //Music
    this._playMusic = new function () {   
        //music.play();
    }
    this._muteMusic = new function () {
       // this._music.Mute...
    }
    this._unmuteMusic = new function () {
      //  this._music.UnMute..
    }
    this._musicEnded = new function () {
        //this._music.currentTime = 0;
        //this._music.play();
    }

    //Sound Effects
    this._swapSoundEffect = new function () {
        //swap = new Audio("/Content/Files/Swap.mp3");
        //swap.addEventListener("ended", SoundEffectEnded);
        //swap.play();
        //this._sounds.push(swap);
    }
    this._clearSoundEffect = new function () {
      
    }
    this._dropSoundEffect = new function () {

    }
    this._soundEffectEnded = new function () {
        //this refers to the SoundEffect. It may be differnt code this is just the general Idea
        //this._sounds.splice(this._sounds.indexOf(this), 1);
        //delete this;
    }

    //Events
    this._music.addEventListener('ended', this._musicEnded);

};