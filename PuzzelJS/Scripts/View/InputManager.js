function InputManager() {

    //Blocks
    this._keyboard = new Keyboard();
    this._joystick = new JoyStick();

    this.load = function () {
        return true;
    }
    this.loaded = function () {
        return true;
    }
    this.getInputActions = function ()
    {
        var inputActions = new InputActions();
        var keyboardInputActions = this._keyboard.getInputActions();
        var joystickInputActions = this._joystick.getInputActions();

        if (keyboardInputActions.selectorLeft === true ||
           joystickInputActions.selectorLeft === true) {
            inputActions.selectorLeft = true;
        }
        if (keyboardInputActions.selectorRight === true ||
         joystickInputActions.selectorRight === true) {
            inputActions.selectorRight = true;
        }
        if (keyboardInputActions.selectorDown === true ||
         joystickInputActions.selectorDown === true) {
            inputActions.selectorDown = true;
        }
        if (keyboardInputActions.selectorUp === true ||
         joystickInputActions.selectorUp === true) {
            inputActions.selectorUp = true;
        }
        if (keyboardInputActions.selectorSwap === true ||
         joystickInputActions.selectorSwap === true) {
            inputActions.selectorSwap = true;
        }
        if (keyboardInputActions.reset === true ||
         joystickInputActions.reset === true) {
            inputActions.reset = true;
        }
        if (keyboardInputActions.pause === true ||
         joystickInputActions.pause === true) {
            inputActions.pause = true;
        }
        if (keyboardInputActions.blocksFastOn === true ||
            joystickInputActions.blocksFastOn === true) {
            inputActions.blocksFastOn = true;
        }
        if (keyboardInputActions.blocksFastOff === true ||
         joystickInputActions.blocksFastOff === true) {
            inputActions.blocksFastOff = true;
        }


     

        this._keyboard.clear();
        this._joystick.clear();

        return inputActions;
    }
};