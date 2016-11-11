var React = require('react');

var CreateGameButton = require('./CreateGameButton.jsx');
var Settings = require('./settings/Settings.jsx');

var LandingPage = React.createClass({

  render: function() {
    return (
      <div id="landing-page" hidden>
        <div className="vertical-center">
          <div className="container">
            <div className="row">
              <CreateGameButton />
              <Settings />
            </div>
          </div>
        </div>
      </div>
    )
  }

});

module.exports = LandingPage;
