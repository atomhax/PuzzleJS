function Controller( puzzle ) {

    //Data
    this.puzzle = puzzle;
    this.gamePad = navigator.getGamepads()[0];

    this.lastDownA = false;
    this.lastDownUp = false;
    this.lastDownDown = false;
    this.lastDownLeft = false;
    this.lastDownRight = false;

    //Functions
    this.Run = function () 
    {
        
        if (!this.GetGamePad()){
            return;
        }

//        if (this.gamePad.buttons[0].pressed === true)
//            this.puzzle.Reset();


        //A
        if (this.gamePad.buttons[0].pressed === true && this.lastDownA == false)
        {
            this.lastDownA = true;
            this.puzzle.selector.Swap();
        }
        if (this.gamePad.buttons[0].pressed === false) {
            this.lastDownA = false;
        }
    
            

        //Up
        if (this.gamePad.buttons[12].pressed === true && this.lastDownUp == false) {
            this.lastDownUp = true;
            this.puzzle.selector.MoveUp();
        }
        if (this.gamePad.buttons[12].pressed === false) {
            this.lastDownUp = false;
        }

        //Right
        if (this.gamePad.buttons[13].pressed === true)
            this.puzzle.selector.MoveRight();
      

        //Left
        if (this.gamePad.buttons[14].pressed === true)
            this.puzzle.selector.MoveLeft();

        //Down
        if (this.gamePad.buttons[15].pressed === true && this.lastDownDown == false)
        {
            this.lastDownDown = true;
            this.puzzle.selector.MoveDown();
        }
          
        if (this.gamePad.buttons[15].pressed === false) {
            this.lastDownDown = false;
        }
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