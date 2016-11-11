var React = require('react');

var LandingPage = require('./LandingPage/LandingPage.jsx');
var GamePage = require('./GamePage/GamePage.jsx');

var PageActions = require('../actions/PageActions');

require('../stores/GameHandlerStore');
require('../stores/CanvasStore');
require('../stores/GameHelperStore');
require('../stores/EventsLogStore');
require('../stores/PageLoaderStore');
require('../stores/CurrentSelectionStore');

window.onload = function() {
  $(function(){
    $('[rel="tooltip"]').tooltip();
  });

  var timestamp = new Date().getTime();
  PageActions.loadLandingPage(timestamp);
};

var MainFrame = React.createClass({

  render: function() {
    return (
      <div>
        <div>
          <LandingPage />
        </div>
        <div>
          <GamePage />
        </div>
      </div>
    )
  }
});

module.exports = MainFrame;
