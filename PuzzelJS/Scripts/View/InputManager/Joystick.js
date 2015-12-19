function Controller(  ) {

    //Data
    this.inputActions = new InputAction();
    this.connected = false;

    this._gamePad = navigator.getGamepads()[0];
    this._lastControllerState = new ControllerState();

    //Functions
    this.run = function () 
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
        if (this.gamePad.buttons[Button.a].pressed === true && this.lastDownA == false)
        {
            this.inputActions.selectorSwap = true;
        }

   

        //Left Trigger Down
        if (this.gamePad.buttons[Button.lefttrigger].pressed === true && this.lastDownR == false) {
            this.inputActions.blocksFastOn = true;
        }

        //Left Trigger Up
        if (this.gamePad.buttons[Button.lefttrigger].pressed === false && this.lastDownR == false) {
            this.inputActions.blocksFastOff = true;
        }

        //Up
        if (this.gamePad.buttons[Button.dpadUp].pressed === true && this.lastDownUp == false) {
            this.inputActions.selectorUp = true;
        }  

        //Down
        if (this.gamePad.buttons[Button.dpadDown].pressed === true && this.lastDownDown == false) {
            this.inputActions.selectorDown = true;
        }

        //Left
        if (this.gamePad.buttons[Button.dpadLeft].pressed === true && this.lastDownLeft == false) {
            this.inputActions.selectorLeft = true;
        }

        //Right
        if (this.gamePad.buttons[Button.dpadRight].pressed === true && this.lastDownRight == false) {
            this.inputActions.selectorRight = true;
        }
        
        //Last Pressed
        this.lastDownA = this.gamePad.buttons[Button.a].pressed;
        this.lastDownUp = this.gamePad.buttons[Button.dpadUp].pressed;
        this.lastDownDown = this.gamePad.buttons[Button.dpadDown].pressed;
        this.lastDownLeft = this.gamePad.buttons[Button.dpadLeft].pressed;
        this.lastDownRight = this.gamePad.buttons[Button.dpadRight].pressed;
        this.lastDownR = this.gamePad.buttons[Button.lefttrigger].pressed;
        this.inProcess = false;
          
    }; 
    this.clear = function(){
        this.inputActions.clear();
    }
};