function Keyboard(puzzle) {

    //Data
    this.puzzle = puzzle;
    this.lastKeyboardState = new KeyboardState();
    this.currentKeyboardState = new KeyboardState();
  
    //Functions
    this.Run = function () {



     

    }

    //Events
    window.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 70: // F

                this.puzzle.ForceBlocksUp();

                break;

            case 82: // R
                if (this.RKeyUp) {
                    this.RKeyUp = false;
                    this.puzzle.Reset();
                }

                break;

            case 37: // Left
                if (this.LeftKeyUp) {
                    this.LeftKeyUp = false;
                    this.puzzle.selector.MoveLeft();
                }

                break;

            case 38: // Up
                if (this.UpKeyUp) {
                    this.UpKeyUp = false;
                    this.puzzle.selector.MoveUp();
                }
                break;

            case 39: // Right
                if (this.RightKeyUp) {
                    this.RightKeyUp = false;
                    this.puzzle.selector.MoveRight();
                }
                break;

            case 40: // Down
                if (this.DownKeyUp) {
                    this.DownKeyUp = false;
                    this.puzzle.selector.MoveDown();
                }
                break;

            case 65: // a left
                if (this.LeftKeyUp) {
                    this.LeftKeyUp = false;
                    this.puzzle.selector.MoveLeft();
                }
                break;

            case 87: // w up
                if (this.UpKeyUp) {
                    this.UpKeyUp = false;
                    this.puzzle.selector.MoveUp();
                }
                break;

            case 68: // d right
                if (this.RightKeyUp) {
                    this.RightKeyUp = false;
                    this.puzzle.selector.MoveRight();
                }
                break;

            case 83: // s down
                if (this.DownKeyUp) {
                    this.DownKeyUp = false;
                    this.puzzle.selector.MoveDown();
                }
                break;

            case 32: //Space swap
                if (this.AKeyUp) {
                    this.AKeyUp = false;
                    this.puzzle.selector.StartSwap();
                }

                break;

        }
    }, false);
    window.addEventListener('keyup', function (event) {
        switch (event.keyCode) {
            case 70: // F

                this.puzzle.ForceBlocksUpStop();

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
    }, false);
};