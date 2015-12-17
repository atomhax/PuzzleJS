function Controller( puzzle ) {

    //Data
    this.puzzle = puzzle;
    this.connected = false;
    this.gamePad = navigator.getGamepads()[0];
    this.lastControllerState = new ControllerState();

    //Functions
    this.Run = function () 
    {
        if (this.inProcess)
            return;

        this.inProcess = true;

        //Get Current Game Pad (Player 1)
        this.gamePad = navigator.getGamepads()[0];

        //If Game Pad Not Found return
        if (this.gamePad === undefined) {
            inProcess = false;
            return;
        }


        //A
        if (this.gamePad.buttons[this.buttons.a].pressed === true && this.lastDownA == false)
        {
            this.puzzle.selector.StartSwap();
        }

        //Left Trigger Down
        if (this.gamePad.buttons[this.buttons.lefttrigger].pressed === true && this.lastDownA == false) {
            this.puzzle.ForceBlocksUp();
        }

        //Left Trigger Up
        if (this.gamePad.buttons[this.buttons.lefttrigger].pressed === false && this.lastDownR === true && this.lastDownA == false) {
            this.puzzle.ForceBlocksUpStop();
        }

        //Up
        if (this.gamePad.buttons[this.buttons.dpadUp].pressed === true && this.lastDownUp == false) {
            this.puzzle.selector.MoveUp();
        }  

        //Down
        if (this.gamePad.buttons[this.buttons.dpadDown].pressed === true && this.lastDownDown == false) {
            this.puzzle.selector.MoveDown();
        }

        //Left
        if (this.gamePad.buttons[this.buttons.dpadLeft].pressed === true && this.lastDownLeft == false) {
            this.puzzle.selector.MoveLeft();
        }

        //Right
        if (this.gamePad.buttons[this.buttons.dpadRight].pressed === true && this.lastDownRight == false) {
            this.puzzle.selector.MoveRight();
        }
        
        //Last Pressed
        this.lastDownA = this.gamePad.buttons[this.buttons.a].pressed;
        this.lastDownUp = this.gamePad.buttons[this.buttons.dpadUp].pressed;
        this.lastDownDown = this.gamePad.buttons[this.buttons.dpadDown].pressed;
        this.lastDownLeft = this.gamePad.buttons[this.buttons.dpadLeft].pressed;
        this.lastDownRight = this.gamePad.buttons[this.buttons.dpadRight].pressed;
        this.lastDownR = this.gamePad.buttons[this.buttons.lefttrigger].pressed;
        this.inProcess = false;
          
    }; 
};