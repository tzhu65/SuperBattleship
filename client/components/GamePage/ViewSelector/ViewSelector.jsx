var React = require('react');

var ViewButton = require('./ViewButton.jsx');

var ViewSelector = React.createClass({

  render: function() {
    return (
      <form id="view-sel">
        <div className="btn-group" data-toggle="buttons">
          <ViewButton id="vs-0" name="view-selector" value="0" text="None" />
          <ViewButton id="vs-1" name="view-selector" value="1" text="P1" />
          <ViewButton id="vs-2" name="view-selector" value="2" text="P2" />
          <ViewButton id="vs-3" name="view-selector" value="3" text="Both" />
        </div>
      </form>
    )
  }

});

module.exports = ViewSelector;

// <label className="btn btn-primary">
//   <input type="radio" value="1"/> Player 1
// </label>
// <label className="btn btn-primary">
//   <input type="radio" value="2"/> Player 2
// </label>
// <label className="btn btn-primary active">
//   <input type="radio" value="3" defaultChecked={true} /> Both
// </label>
