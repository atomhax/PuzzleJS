﻿function GameController(canvas) {

    //Functions
    this.tick = function (game, gameManger) {

        //Get View Input
        var inputActions = gameManger.inputManager.getInputActions();

        //Run Model Functions with Views Input
        if (inputActions.selectorLeft === true) {
            game.player.puzzle.selectorLeft();
        }
        else if (inputActions.selectorRight === true) {
            game.player.puzzle.selectorRight();
        }
        else if (inputActions.selectorUp === true) {
            game.player.puzzle.selectorUp();
        }
        else if (inputActions.selectorDown === true) {
            game.player.puzzle.selectorDown();
        } 
        if (inputActions.selectorSwap === true) {
            game.player.puzzle.selectorSwap();
        }
        if (inputActions.reset === true) {
            game.reset();
        }
        if (inputActions.pause === true) {
            game.pause();
        }
        if (inputActions.blocksFastOn === true) {
            game.player.puzzle.fastBlockOn();
        }
        if (inputActions.blocksFastOff === true) {
            game.player.puzzle.fastBlockOff();
        }


        //Game Tick
        game.tick();

        //Update View
        gameManger.audioManager.run(game.player.puzzle.getSoundRequests());
        game.player.puzzle.clearSoundRequests();
        gameManger.displayManager.render(game.player.puzzle.getBlocks(),
                                  game.player.puzzle.getSelector(),
                                  game.player.puzzle.getBlockInc(),
                                  game.player.puzzle.getScore(),
                                  game.player.puzzle.getLevel());
    } 
}