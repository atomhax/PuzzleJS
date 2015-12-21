function Game() {
    //Data
   

    this.player = new Player('Player');
    this.networkPlayers = new Array();

    this.testPlayers = new Array();




    this.AddTestPlayers = function(){
        for (var i = 0; i < 99; i++) {
            var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            this.testPlayers.push(new Player(guid, i));
            this.testPlayers[i].puzzle.Reset();
            this.networkPlayers.push(new NetworkPlayer(guid, 'TestPlayer' + i));
        }
    }

    //Functions
    this.tick = function () {
        this.player.puzzle.tick();
     
        for (var i = 0; i < this.testPlayers.length; i++) {
            this.testPlayers[i].puzzle.tick();
            };

        this.updateNetworkPlayersRenderData();
    }

    this.getPlayerRenderData = function() {
        return new PlayerRenderData(this.player.puzzle.getBlocks(),
                                    this.player.puzzle.getScore(),
                                    this.player.puzzle.getLevel(),
                                    this.player.puzzle.getBlockInc(),
                                    this.player.puzzle.getSelector(),
                                    this.player.name);

    }
    this.updateNetworkPlayersRenderData = function()
    {
      
        for (var i = 0; i < this.networkPlayers.length; i++) {
            this.networkPlayers[i].playerRenderData = new PlayerRenderData(this.testPlayers[i].puzzle.getBlocks(),
                                     this.testPlayers[i].puzzle.getScore(),
                                     this.testPlayers[i].puzzle.getLevel(),
                                     this.testPlayers[i].puzzle.getBlockInc(),
                                     this.testPlayers[i].puzzle.getSelector(),
                                     this.testPlayers[i].name)
          
        }

      
    }
    this.getPlayersRenderData = function () {
        var PlayersRenderData = new Array();
        PlayersRenderData.push(this.getPlayerRenderData());

        for (var i = 0; i < this.networkPlayers.length; i++) {
            PlayersRenderData.push(this.networkPlayers[i].playerRenderData);
        }
        return PlayersRenderData;
    }
    
    this.load = function () {
        this.player.puzzle.Reset();
        this.AddTestPlayers();

    }
    this.loaded = function () {
        return true;
    }
};