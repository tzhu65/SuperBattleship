var GameActions = require('../actions/GameActions');

var TestAI = function(game, is_player_one, delay) {
  if (is_player_one) {
    var key = game.registerPlayerOne();
  } else {
    key = game.registerPlayerTwo();
  }

  var enemy = is_player_one ? SBConstants.PLAYER_TWO : SBConstants.PLAYER_ONE;
  var etype = is_player_one ? 'p2' : 'p1';

  var turn_delay = delay || 0;

  var size = game.getBoardSize();

  var mvf = function(key, ship) { return game.moveShipForward(key, ship); };
  var mvb = function(key, ship) { return game.moveShipBackward(key, ship); };
  var rcw = function(key, ship) { return game.rotateShipCW(key, ship); };
  var ccw = function(key, ship) { return game.rotateShipCCW(key, ship); };

  // No need to complicate, only need two movements
  var shipMovements = [
    mvf,
    // mvb,
    rcw,
    // ccw
  ];

  var turnChangeHandler = function(e) {
    if (e.event_type != SBConstants.TURN_CHANGE_EVENT) return;
    if (((e.who == SBConstants.PLAYER_ONE) && is_player_one) ||
       ((e.who == SBConstants.PLAYER_TWO) && (!is_player_one))) {

      var possibleTargets = [];
      var currentTurn = game.getTurnCount();

      // Check all visible locations for an ok enemy ship
      var finishTurn = false;
      for (var x = 0; x < size; x++) {
        if (finishTurn) break;
        for (var y = 0; y < size; y++) {
          var block = game.queryLocation(key, x, y);
          if (block.type == etype && block.state == SBConstants.OK) { // Found enemy
            finishTurn = true;
            setTimeout(function() {
              game.shootAt(key, x, y);
            }, turn_delay);
            return;
          }
          else if (block.type == 'invisible') {
            possibleTargets.push({x: x, y: y});
          }
        }
      }

      // Move a ship if no visible enemies
      var fleet = game.getFleetByKey(key);  // Get the movable ships
      var ships = [];
      for (var i = 0; i < fleet.length; i++) {
        var ship = fleet[i];

        if (ship.getStatus() == SBConstants.ALIVE) {
          ships.push(ship);
        }
      }

      // Try to move
      var actionIndex = Math.floor(Math.random() * 100);
      if (actionIndex < 80) actionIndex = 0;
      else actionIndex = 1;
      var action = shipMovements[actionIndex];

      var shipIndex = Math.floor(Math.random() * ships.length);
      var ship = ships[shipIndex];
      setTimeout(function() {
        var passed = action(key, ship);

        if (!passed) {

          // Couldn't move, fire a random shot
          var index = Math.floor(Math.random() * possibleTargets.length);
          var pos = possibleTargets[index];
          game.shootAt(key, pos.x, pos.y);
        } else {
          GameActions.shipMoveEvent({}, game, ship, currentTurn);
        }
      }, turn_delay);
    }
  }

  game.registerEventHandler(SBConstants.TURN_CHANGE_EVENT, turnChangeHandler);

  this.giveUpKey = function() {
    return key;
  }

}

module.exports = TestAI;
