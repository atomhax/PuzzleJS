function Controller( puzzle ) {

    //Data
    this.puzzle = puzzle;
    this.gamePad = navigator.getGamepads()[0];

    //Functions
    this.Run = function () 
    {
        
        if (!this.GetGamePad()){
            return;
        }

        //A
        if (this.gamePad.buttons[0].pressed === true)
            this.puzzle.Reset();

        //Left
       // if (this.gamePad.buttons[16].pressed === true)
//this.puzzle.Reset();

        //Down
        //if (this.gamePad.buttons[13].pressed === true)
        //    this.puzzle.Reset();

        if (this.gamePad.buttons[14].pressed === true)
            this.puzzle.Reset();

        //if (this.gamePad.buttons[15].pressed === true)
         //   this.puzzle.Reset();
    };
   
    this.GetGamePad = function () {
        this.gamePad = navigator.getGamepads()[0];
        if (this.gamePad === undefined) {
            this.gamePad = navigator.getGamepads()[0];
        }
        if (this.gamePad !== undefined) {
            return true;
        }
        else
            return false;
    };

};