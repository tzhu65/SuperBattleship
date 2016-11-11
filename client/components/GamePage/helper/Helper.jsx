var React = require('react');

var GameActions = require('../../../actions/GameActions');

var ErrorDisplay = require('./ErrorDisplay.jsx');
var CurrentSelection = require('./CurrentSelection.jsx');
var ActionButton = require('./ActionButton.jsx');

var actions = {

  moveForward: function(e) {
    GameActions.moveForward(1);
  },

  moveBackward: function(e) {
    GameActions.moveBackward(2);
  },

  rotateCW: function(e) {
    GameActions.rotateCW(3);
  },

  rotateCCW: function(e) {
    GameActions.rotateCCW(4);
  },

  shootAt: function(e) {
    GameActions.shootAt(5);
  }


};

var Helper = React.createClass({

  render: function() {
    return (
      <div className="row">
        <div data-toggle="popover" data-placement="top" data-content="Content">
          <ActionButton id="move-for" text="Forward" onClick={actions.moveForward} />
          <ActionButton id="move-back" text="Backward" onClick={actions.moveBackward} />
          <ActionButton id="rot-cw" text="CW" onClick={actions.rotateCW} />
          <ActionButton id="rot-ccw" text="CCW" onClick={actions.rotateCCW} />
          <ActionButton id="shoot-at" text="Shoot" onClick={actions.shootAt} />
          <div>
            <br />
            <br />
            <CurrentSelection />
            <ErrorDisplay />
          </div>
        </div>
      </div>
    )
  }

});

// <div>
//   <CurrentTurn />
//   <CurrentPlayer />
//   <MoveForwardButton />
//   <MoveBackwardButton />
//   <RotateCWButton />
//   <RotateCCWButton />
//   <ShootAtButton />
//   <YourShips />
//   <EnemyShips />
// </div>

module.exports = Helper;
