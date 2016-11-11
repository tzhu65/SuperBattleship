var React = require('react');

var PageActions = require('../../actions/PageActions');
var LandingActions = require('../../actions/LandingActions');

var CreateGameButton = React.createClass({

  onClick: function(e) {
    // Get the settings somehow
    var fleet = [
      {
        name: "Carrier",
        size: 5
      },
      {
        name: "Battleship",
        size: 4
      },
      {
        name: "Cruiser",
        size: 3
      },
      {
        name: "Submarine",
        size: 3},
      {
        name: "Destroyer",
        size: 2
      }];


    var settings = {
      boardSize: $('#board-size').slider('getValue'),
      fleet: fleet,
      missAge: $('#miss-age').slider('getValue'),
      turnLimit: $('#turn-lim').slider('getValue'),
      rotateMissLimit: $('#rot-miss-lim').slider('getValue'),
      rearViewDistance: $('#rview-dis').slider('getValue'),
      playerCount: parseInt($("#player-count input[type='radio']:checked").val())
    };

    LandingActions.createGame(settings);
    PageActions.loadGamePage(0);

    e.preventDefault();
  },

  render: function() {
    return (
      <div>
        <button id="create-game-btn" type="button" className="btn btn-primary" onClick={this.onClick}>
          Create Game
        </button>
      </div>
    )
  }
});

module.exports = CreateGameButton;
