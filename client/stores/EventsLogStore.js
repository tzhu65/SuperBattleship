var alt = require('../alt');

var GameActions = require('../actions/GameActions');

class EventsLogStore {
  constructor() {

    this.events = [];

    this.bindListeners({
      handleSetUpGame: GameActions.SET_UP_GAME,
      handleHitEvent: GameActions.HIT_EVENT,
      handleMissEvent: GameActions.MISS_EVENT,
      handleShipSunkEvent: GameActions.SHIP_SUNK_EVENT,
      handleShipMoveEvent: GameActions.SHIP_MOVE_EVENT,
      handleGameOverEvent: GameActions.GAME_OVER_EVENT,
    });
  }

  handleSetUpGame(game) {
    this.events = [];
  }

  handleHitEvent(p) {
    var e = p.e;
    var game = p.game;
    var turn = p.turn + 1;
    var player = turn % 2 == 1 ? 1 : 2; // Have to subtract one
    this.events.push('Turn ' + turn + ' - P' + player + ' hit at (' + e.x + ',' + e.y + ')!');
    var event = ''
  }

  handleMissEvent(p) {
    var e = p.e;
    var game = p.game;
    var turn = p.turn + 1
    var player = turn % 2 == 1 ? 1 : 2; // Have to subtract one
    this.events.push('Turn ' + turn + ' - P' + player + ' miss at (' + e.x + ',' + e.y + ').');
  }

  handleShipSunkEvent(p) {
    var e = p.e;
    var game = p.game;
    var turn = p.turn + 1;
    var ship = e.ship;
    var owner = ship.getOwner() == SBConstants.PLAYER_ONE ? 1 : 2;
    this.events.push('P' + owner + "'s " + ship.getName() + ' (' + ship.getSize() + ') has sunk.');
  }

  handleShipMoveEvent(p) {
    var e = p.e;
    var game = p.game;
    var turn = p.turn + 1;
    var ship = p.ship;
    var owner = ship.getOwner() == SBConstants.PLAYER_ONE ? 1 : 2;
    this.events.push('Turn ' + turn + ' - P' + owner + ' moved their ' + ship.getName() + ' (' + ship.getSize() + ').');
  }

  handleGameOverEvent(p) {
    var e = p.e;
    var str;
    switch (e.winner) {
      case SBConstants.PLAYER_ONE:
        str = 'P1 wins!';
        break;
      case SBConstants.PLAYER_TWO:
        str = 'P2 wins!';
        break;
      case SBConstants.DRAW:
        str = 'The game ended in a draw.';
        break;
      default:
        str = null; // Should never get here
    }
    this.events.push(str);
  }

}

module.exports = alt.createStore(EventsLogStore, 'EventsLogStore');
