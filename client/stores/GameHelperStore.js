var alt = require('../alt');
var GameActions = require('../actions/GameActions');

class GameHelperStore {
  constructor() {

    this.turnLimit = 0;
    this.currentTurn = 0;
    this.currentPlayer = "Player 1's Turn"
    this.hoveredBlock = {x: '', y: ''};
    this.selectedBlock = {x: '', y: ''};
    this.selectedShip = null;
    this.errorMessage = '';

    this.bindListeners({
      handleSetUpGame: GameActions.SET_UP_GAME,
      handleHoverChange: GameActions.HOVER_CHANGE,
      handleSelectChange: GameActions.SELECT_CHANGE,
      handleSelectShip: GameActions.SELECT_SHIP,
      handleDisplayError: GameActions.DISPLAY_ERROR,
      handleTurnChange: GameActions.TURN_CHANGE,
    });
  }

  handleSetUpGame(game) {
    this.turnLimit = game.getTurnLimit();
    this.currentTurn = game.getTurnCount();

    var _this = this;
    game.registerEventHandler(SBConstants.TURN_CHANGE_EVENT, function(e) {
      _this.currentTurn = game.getTurnCount();
      var player = (game.getStatus() == SBConstants.PLAYER_ONE) ? 1 : 2;
      _this.currentPlayer = "Player " + player + "'s Turn";
      alt.stores.GameHelperStore.emitChange();
    });
  }

  handleHoverChange(pos) {
    this.hoveredBlock.x = pos.x;
    this.hoveredBlock.y = pos.y;
  }

  handleSelectChange(pos) {
    this.selectedBlock.x = pos.x;
    this.selectedBlock.y = pos.y;
  }

  handleSelectShip(ship) {

  }

  handleDisplayError(msg) {
    this.errorMessage = msg;
    var _this = this;
    var displayError = $('#display-err');
    displayError.stop();
    displayError.fadeTo(0, 1);
    displayError.fadeOut({
      duration: 4000,
      easing: 'swing',
      complete: function() {
        _this.errorMessage = '';
        alt.stores.GameHelperStore.emitChange();
        displayError.show();
      }
    });
  }

  handleTurnChange(game) {

    // Set certain things to null
    this.selectedShip = null;
    this.selectedBlock = {x: '', y: ''};
    this.hoveredBlock = {x: '', y: ''};

    GameActions.drawBoard.defer(game);
  }

}


module.exports = alt.createStore(GameHelperStore, 'GameHelperStore');
