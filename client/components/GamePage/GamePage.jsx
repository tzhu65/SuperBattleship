var React = require('react');

var ViewSelector = require('./ViewSelector/ViewSelector.jsx');
var Canvas = require('./Canvas.jsx');
var Helper = require('./helper/Helper.jsx');
var EventsLog = require('./EventsLog.jsx');
var BackButton = require('./BackButton.jsx');
var InfoRow = require('./InfoRow/InfoRow.jsx');

var GamePage = React.createClass({

  render: function() {
    return (
      <div id="game-page" hidden>
        <div className="container">
          <div className="vertical-center-row">

            <div className="row">
              <div className="col-sm-6">
                <InfoRow />
                <Canvas />
                <ViewSelector />
              </div>
              <br />
              <div className="col-sm-6">
                <BackButton />
                <EventsLog />
                <br />
                <Helper />
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }

});

module.exports = GamePage;
