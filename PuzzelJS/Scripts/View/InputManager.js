function InputManager() {

    //Blocks
    this._keyboard = new Keyboard();
    this._joystick = new JoyStick();

    this.load = function () {
    }
    this.loaded = function () {
        return true;
    }
    this.getInputActions = function ()
    {
        var inputActions = new InputActions();
        var inputActionsKeyboard = this._keyboard.run();
        var inputActionsJoystick = this._joystick.run();

        if(this._keyboard.inputActions.selectorLeft === true ||
           this._joystick.inputActions.selectorLeft === true) {
            inputActions.selectorLeft = true;
        }
        if(this._keyboard.inputActions.selectorRight === true ||
         this._joystick.inputActions.selectorRight === true){
            inputActions.selectorRight = true;
        }
        if(this._keyboard.inputActions.selectorDown === true ||
         this._joystick.inputActions.selectorDown === true){
            inputActions.selectorDown = true;
        }
        if(this._keyboard.inputActions.selectorUp === true ||
         this._joystick.inputActions.selectorUp === true){
            inputActions.selectorUp = true;
        }
        if(this._keyboard.inputActions.selectorSwap === true ||
         this._joystick.inputActions.selectorSwap === true){
            inputActions.selectorSwap = true;
        }
        if(this._keyboard.inputActions.reset === true ||
         this._joystick.inputActions.reset === true){
            inputActions.reset = true;
        }
        if(this._keyboard.inputActions.pause === true ||
         this._joystick.inputActions.pause === true){
            inputActions.pause = true;
        }


        this._keyboard.clear();
        this._joystick.clear();

        return inputActions;
    }
};