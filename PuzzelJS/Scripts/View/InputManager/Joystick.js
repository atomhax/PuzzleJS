function JoyStick() {

    //Data
    this._inputActions = new InputActions();
    this.connected = false;

    this._gamePad = navigator.getGamepads()[0];
    this._lastJoystickState = new JoystickState();

    //Functions
    this.getInputActions = function ()
    {

        //Get Current Game Pad (Player 1)
        this.gamePad = navigator.getGamepads()[0];

        //If Game Pad Not Found return
        if (this.gamePad === undefined) {
            inProcess = false;
            return this._inputActions;
        }


        //A
        if (this.gamePad.buttons[Button.A].pressed === true && this._lastJoystickState.A == false)
        {
            this._inputActions.selectorSwap = true;
        }

   

        //Left Trigger Down
        if (this.gamePad.buttons[Button.LeftTrigger].pressed === true && this._lastJoystickState.R == false) {
            this._inputActions.blocksFastOn = true;
        }

        //Left Trigger Up
        if (this.gamePad.buttons[Button.LeftTrigger].pressed === false && this._lastJoystickState.R == true) {
            this._inputActions.blocksFastOff = true;
        }

        //Up
        if (this.gamePad.buttons[Button.DpadUp].pressed === true && this._lastJoystickState.Up == false) {
            this._inputActions.selectorUp = true;
        }  

        //Down
        if (this.gamePad.buttons[Button.DpadDown].pressed === true && this._lastJoystickState.Down == false) {
            this._inputActions.selectorDown = true;
        }

        //Left
        if (this.gamePad.buttons[Button.DpadLeft].pressed === true && this._lastJoystickState.Left == false) {
            this._inputActions.selectorLeft = true;
        }

        //Right
        if (this.gamePad.buttons[Button.DpadRight].pressed === true && this._lastJoystickState.Right == false) {
            this._inputActions.selectorRight = true;
        }
        
        //Last Pressed
        this._lastJoystickState.A = this.gamePad.buttons[Button.A].pressed;
        this._lastJoystickState.Up = this.gamePad.buttons[Button.DpadUp].pressed;
        this._lastJoystickState.Down = this.gamePad.buttons[Button.DpadDown].pressed;
        this._lastJoystickState.Left = this.gamePad.buttons[Button.DpadLeft].pressed;
        this._lastJoystickState.Right = this.gamePad.buttons[Button.DpadRight].pressed;
        this._lastJoystickState.R = this.gamePad.buttons[Button.LeftTrigger].pressed;

        return this._inputActions;
    
    }; 
    this.clear = function(){
        this._inputActions.clear();
    }
};