﻿function GameController(canvas) {

    //Functions
    this.tick = function (game, gameManger) {

        //Get View Input
        var inputActions = model.InputManger.GetInputs();

        //Run Model Functions with Views Input
        if (inputActions.left === true) {
            game.player.puzzle.selectorLeft();
        }
        else if (inputActions.right === true) {
            game.player.puzzle.selectorRight();
        }
        else if (inputActions.up === true) {
            game.player.puzzle.selectorUp();
        }
        else if (inputActions.down === true) {
            game.player.puzzle.selectorDown();
        }
        if (inputActions.wwap === true) {
            game.player.puzzle.selectorSwap();
        }
        if (inputActions.reset === true) {
            game.reset();
        }
        if (inputActions.pause === true) {
            game.pause();
        }

        //Game Tick
        game.tick();

        //Update View
        gameManger.audioManger(game.player.puzzle.getSoundRequests());
        gameManger.display.render(gameManger.player.puzzle.getBlocks(),
                                  gameManger.player.puzzle.getSelector(),
                                  gameManger.player.puzzle.getBlockInc(),
                                  gameManger.player.puzzle.getScore(),
                                  gameManger.player.puzzle.getLevel());
    } 
}