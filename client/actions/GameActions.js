var alt = require('../alt');

class GameActions {

  showSettings(timestamp) {
    return settings;
  }

  changeView(val) {
    return val;
  }

  setUpGame(game) {
    return game;
  }

  drawBoard(game) {
    return game;
  }

  hoverChange(x, y) {
    return {x: x, y: y};
  }

  selectChange(x, y) {
    return {x: x, y: y};
  }

  selectShip(ship) {
    return ship;
  }

  moveForward(timestamp) {
    return timestamp;
  }

  moveBackward(timestamp) {
    return timestamp;
  }

  rotateCW(timestamp) {
    return timestamp;
  }

  rotateCCW(timestamp) {
    return timestamp;
  }

  shootAt(timestamp) {
    return timestamp;
  }

  turnChange(game) {
    return game;
  }

  displayError(msg) {
    return msg;
  }

  hitEvent(e, game, turn) {
    return {
      e: e,
      game: game,
      turn: turn
    };
  }

  missEvent(e, game, turn) {
    return {
      e: e,
      game: game,
      turn: turn
    };
  }

  shipMoveEvent(e, game, ship, turn) {
    return {
      e: e,
      game: game,
      ship: ship,
      turn: turn
    };
  }

  shipSunkEvent(e, game) {
    return {
      e: e,
      game: game
    };
  }

  gameOverEvent(e, game) {
    return {
      e: e,
      game: game
    };
  }

}

module.exports = alt.createActions(GameActions);
