var alt = require('../alt');

var LandingActions = require('../actions/LandingActions');
var PageActions = require('../actions/PageActions');
var GameActions = require('../actions/GameActions');

var DumbAI = require('../scripts/TestAI');

class GameHandlerStore {
  constructor() {

    this.game = null;
    this.players = {
      'one': null,
      'two': null
    };
    this.currentPlayer = 'one';
    this.selectedShip = null;
    this.selectedBlock = {x: -1, y: -1};
    this.currentKey = '';

    this.bindListeners({
      handleCreateGame: LandingActions.CREATE_GAME,
      handleSetUpGame: GameActions.SET_UP_GAME,
      handleSelectChange: GameActions.SELECT_CHANGE,
      handleMoveForward: GameActions.MOVE_FORWARD,
      handleMoveBackward: GameActions.MOVE_BACKWARD,
      handleRotateCW: GameActions.ROTATE_CW,
      handleRotateCCW: GameActions.ROTATE_CCW,
      handleShootAt: GameActions.SHOOT_AT,
      handleTurnChange: GameActions.TURN_CHANGE,

    });
  }

  handleCreateGame(settings) {
    console.log('Creating the game with these settings:');
    console.log(settings);

    // Start the game with the passed in settings
    this.game = new SuperBattleship(settings);

    // Register the players
    var playerCount = settings.playerCount;
    switch(playerCount) {
      case 0:
        this.players.one = new DumbAI(this.game, true).giveUpKey();
        this.players.two = new DumbAI(this.game, false).giveUpKey();
        break;
      case 1:
        this.players.one = this.game.registerPlayerOne();
        this.players.two = new DumbAI(this.game, false).giveUpKey();
        break;
      case 2:
        this.players.one = this.game.registerPlayerOne();
        this.players.two = this.game.registerPlayerTwo();
        break;
      default:  // Defaults to 0 players
        this.players.one = new DumbAI(this.game, true).giveUpKey();
        this.players.two = new DumbAI(this.game, false).giveUpKey();
        break;
    }

    // Set initial values
    this.currentKey = this.players.one;

    // Register the global listener
    this.game.registerEventHandler(SBConstants.ALL_EVENTS, function(e) {
      console.log('EVENT:', e);
    });

    // Start the game and finish setting up
    GameActions.setUpGame.defer(this.game);
  }

  handleSetUpGame(game) {
    // Register listeners
    var _this = this;
    this.game.registerEventHandler(SBConstants.TURN_CHANGE_EVENT, function(e) {
      var isPlayerOne = (_this.game.getStatus() == SBConstants.PLAYER_ONE) ? true : false;
      _this.currentKey = isPlayerOne ? _this.players.one : _this.players.two;
      GameActions.turnChange.defer(_this.game);
    });

    this.game.registerEventHandler(SBConstants.HIT_EVENT, function(e) {
      GameActions.hitEvent.defer(e, _this.game, _this.game.getTurnCount());
    });

    this.game.registerEventHandler(SBConstants.MISS_EVENT, function(e) {
      GameActions.missEvent.defer(e, _this.game, _this.game.getTurnCount());
    });

    this.game.registerEventHandler(SBConstants.SHIP_SUNK_EVENT, function(e) {
      GameActions.shipSunkEvent.defer(e, _this.game, _this.game.getTurnCount());
    });

    this.game.registerEventHandler(SBConstants.GAME_OVER_EVENT, function(e) {
      GameActions.gameOverEvent.defer(e, _this.game);
    });

    this.game.startGame();
  }

  handleSelectChange(pos) {
    this.selectedBlock = {
      x: pos.x,
      y: pos.y
    };

    // Check if selecting a ship
    var isPlayerOne = this.game.getStatus() == SBConstants.PLAYER_ONE;
    var key = isPlayerOne ? this.players.one : this.players.two;
    var fleet = this.game.getFleetByKey(key);
    var isShip = false;

    for (var i = 0; i < fleet.length; i++) {
      var ship = fleet[i];
      if (ship.occupies(key, pos.x, pos.y)) {
        this.selectedShip = ship;
        GameActions.selectShip.defer(ship);
        isShip = true;
        break;
      }
    }
    if (!isShip) this.selectedShip = null;
  }

  handleMoveForward(timestamp) {
    var turn = this.game.getTurnCount();
    if (this.selectedShip) {
      var success = this.game.moveShipForward(this.currentKey, this.selectedShip);
      if (!success) GameActions.displayError.defer("Can't move forwards");
      else GameActions.shipMoveEvent.defer(this.selectedShip, this.game, this.selectedShip, turn);
    } else {
      GameActions.displayError.defer('Select a ship first');
    }
  }

  handleMoveBackward(timestamp) {
    var turn = this.game.getTurnCount();
    if (this.selectedShip) {
      var success = this.game.moveShipBackward(this.currentKey, this.selectedShip);
      if (!success) GameActions.displayError.defer("Can't move backwards");
      else GameActions.shipMoveEvent.defer(this.selectedShip, this.game, this.selectedShip, turn);
    } else {
      GameActions.displayError.defer('Select a ship first');
    }
  }

  handleRotateCW(timestamp) {
    var turn = this.game.getTurnCount();
    if (this.selectedShip) {
      var success = this.game.rotateShipCW(this.currentKey, this.selectedShip);
      if (!success) GameActions.displayError.defer("Can't rotate CW");
      else GameActions.shipMoveEvent.defer(this.selectedShip, this.game, this.selectedShip, turn);
    } else {
      GameActions.displayError.defer('Select a ship first');
    }
  }

  handleRotateCCW(timestamp) {
    var turn = this.game.getTurnCount();
    if (this.selectedShip) {
      var success = this.game.rotateShipCCW(this.currentKey, this.selectedShip);
      if (!success) GameActions.displayError.defer("Can't rotate CCW");
      else GameActions.shipMoveEvent.defer(this.selectedShip, this.game, this.selectedShip, turn);
    } else {
      GameActions.displayError.defer("Select a ship first");
    }
  }

  handleShootAt(timestamp) {
    var turn = this.game.getTurnCount();
    if (!this.selectedShip) {
      if (this.selectedBlock.x < 0 || this.selectedBlock.y < 0) {
        GameActions.displayError.defer("Select a block first");
      } else {
        var success = this.game.shootAt(this.currentKey, this.selectedBlock.x, this.selectedBlock.y);
        if (!success) GameActions.displayError.defer("Can't shoot there");
      }
    } else {
      GameActions.displayError.defer("Can't shoot your own ship")
    }
  }

  handleTurnChange(game) {
    this.selectedShip = null;
    this.selectedBlock = {x: -1, y: -1};
  }

}

module.exports = alt.createStore(GameHandlerStore, 'GameHandlerStore');
