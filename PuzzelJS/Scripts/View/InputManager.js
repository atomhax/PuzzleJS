function InputManager() {

    //Blocks
    this._keyboard = new Keyboard();
    this._joystick = new JoyStick();

    this.load = function () {
    }
    this.loaded = new function () {
        return true;
    }
    this.run() = new function ()
    {
        var inputActions = new InputActions();

      
        var inputActionsKeyboard = this._keyboard.run();
        var inputActionsJoystick = this._joystick.run();

        if(inputActionsKeyboard.selectorLeft === true ||
           inputActionsJoystick.selectorLeft === true){
            inputActions.selectorLeft = true;
        }
        if(inputActionsKeyboard.selectorRight === true ||
         inputActionsJoystick.selectorRight === true){
            inputActions.selectorRight = true;
        }
        if(inputActionsKeyboard.selectorDown === true ||
         inputActionsJoystick.selectorDown === true){
            inputActions.selectorDown = true;
        }
        if(inputActionsKeyboard.selectorUp === true ||
         inputActionsJoystick.selectorUp === true){
            inputActions.selectorUp = true;
        }
        if(inputActionsKeyboard.selectorSwap === true ||
         inputActionsJoystick.selectorSwap === true){
            inputActions.selectorSwap = true;
        }
        if(inputActionsKeyboard.reset === true ||
         inputActionsJoystick.reset === true){
            inputActions.reset = true;
        }
        if(inputActionsKeyboard.pause === true ||
         inputActionsJoystick.pause === true){
            inputActions.pause = true;
        }


        this._keyboard.clear();
        this._joystick.clear();

        return inputActions;
    }
};