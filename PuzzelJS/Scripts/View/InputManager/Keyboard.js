function Keyboard() {

    //Data
    this._inputActions = new InputActions();
    this._lastKeyboardState = new KeyboardState();
    this._currentKeyboardState = new KeyboardState();

    //Functions
    this.getInputActions = function () {
        return this._inputActions;
    }
    this.clear = function () {
        this._inputActions.clear();
    }

    //Events
    window.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 70: // F

                this._inputActions.blocksFastOn = true;

                break;

            case 82: // R
                if (this.RKeyUp) {
                    this.RKeyUp = false;
                    this._inputActions.reset = true;
                }

                break;

            case 37: // Left
                if (this.LeftKeyUp) {
                    this.LeftKeyUp = false;
                    this._inputActions.selectorLeft = true;
                }

                break;

            case 38: // Up
                if (this.UpKeyUp) {
                    this.UpKeyUp = false;
                    this._inputActions.selectorUp = true;
                }
                break;

            case 39: // Right
                if (this.RightKeyUp) {
                    this.RightKeyUp = false;
                    this._inputActions.selectorRight = true;
                }
                break;

            case 40: // Down
                if (this.DownKeyUp) {
                    this.DownKeyUp = false;
                    this._inputActions.selectorDown = true;
                }
                break;

            case 65: // a left
                if (this.LeftKeyUp) {
                    this.LeftKeyUp = false;
                    this._inputActions.selectorLeft = true;
                }
                break;

            case 87: // w up
                if (this.UpKeyUp) {
                    this.UpKeyUp = false;
                    this._inputActions.selectorUp = true;
                }
                break;

            case 68: // d right
                if (this.RightKeyUp) {
                    this.RightKeyUp = false;
                    this._inputActions.selectorRight = true;
                }
                break;

            case 83: // s down
                if (this.DownKeyUp) {
                    this.DownKeyUp = false;
                    this._inputActions.selectorDown = true;
                }
                break;

            case 32: //Space swap
                if (this.AKeyUp) {
                    this.AKeyUp = false;
                    this._inputActions.selectorSwap = true;
                }

                break;

        }
    }.bind(this), false);
    window.addEventListener('keyup', function (event) {
        switch (event.keyCode) {
            case 70: // F

                this._inputActions.blocksFastOff = true;
                this.FKeyUp = true;
                break;

            case 82: // R
                this.RKeyUp = true;
                break;


            case 37: // Left
                this.LeftKeyUp = true;
                break;

            case 38: // Up
                this.UpKeyUp = true;
                break;

            case 39: // Right
                this.RightKeyUp = true;
                break;

            case 40: // Down
                this.DownKeyUp = true;
                break;

            case 65: // a left
                this.LeftKeyUp = true;
                break;

            case 87: // w up
                this.UpKeyUp = true;
                break;

            case 68: // d right
                this.RightKeyUp = true;
                break;

            case 83: // s down
                this.DownKeyUp = true;
                break;

            case 32: //Space swap
                this.AKeyUp = true;
                break;

        }
    }.bind(this), false);
};