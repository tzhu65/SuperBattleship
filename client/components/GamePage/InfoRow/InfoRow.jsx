var React = require('react');

var CurrentTurn = require('./CurrentTurn.jsx');
var CurrentPlayer = require('./CurrentPlayer.jsx');
var HoveredLocation = require('./HoveredLocation.jsx');
var BackButton = require('../BackButton.jsx');

var InfoRow = React.createClass({

  render: function() {
    return (
      <div>
        <div id="info-row" className="info-row">
          <span className="info-row">
            <CurrentTurn className="ir-l"/>
            <CurrentPlayer className="ir-m"/>
            <HoveredLocation className="ir-r"/>
          </span>
        </div>
      </div>
    )
  }
});

module.exports = InfoRow;
