function Keyboard(puzzle) {

    //Data
    this.puzzle = puzzle;
    this.gamePad = navigator.getGamepads()[0];

    this.lastDownA = false;
    this.lastDownUp = false;
    this.lastDownDown = false;
    this.lastDownLeft = false;
    this.lastDownRight = false;

    //Functions
    this.Run = function () {



        window.addEventListener('keydown', function (event) {
            switch (event.keyCode) {
                case 37: // Left
                    this.puzzle.selector.MoveLeft();
                    break;

                case 38: // Up
                    this.puzzle.selector.MoveUp();
                    break;

                case 39: // Right
                    this.puzzle.selector.MoveRight();
                    break;

                case 40: // Down
                    this.puzzle.selector.MoveDown();
                    break;

                case 65: // a left
                    this.puzzle.selector.MoveLeft();
                    break;

                case 87: // w up
                    this.puzzle.selector.MoveUp();
                    break;

                case 68: // d right
                    this.puzzle.selector.MoveRight();
                    break;

                case 83: // s down
                    this.puzzle.selector.MoveDown();
                    break;

                case 32: //Space swap
                    this.puzzle.selector.Swap();
                    break;

            }
        }, false);

    }
};