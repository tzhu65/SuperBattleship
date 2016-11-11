var alt = require('../alt');

var GameActions = require('../actions/GameActions');

class CurrentSelectionStore {
  constructor() {

    this.currentSelection = null;
    this.currentText = '-';

    this.bindListeners({
      handleTurnChange: GameActions.TURN_CHANGE,
      handleSelectChange: GameActions.SELECT_CHANGE,
      handleSelectShip: GameActions.SELECT_SHIP,
    });
  }

  handleTurnChange(game) {
    this.currentSelection = null;
    this.currentText = '-';
  }

  handleSelectChange(pos) {
    var x = pos.x;
    var y = pos.y;

    this.currentText = '(' + x + ','+ y + ')';
  }

  handleSelectShip(ship) {

    var text = ship.getName() + ' (' + ship.getSize() + ')\n'

    var isAlive = ship.getStatus() == SBConstants.ALIVE;
    var aliveText = isAlive ? 'ALIVE' : 'DEAD';
    this.currentText = text + aliveText;
  }

}

module.exports = alt.createStore(CurrentSelectionStore, 'CurrentSelectionStore');
