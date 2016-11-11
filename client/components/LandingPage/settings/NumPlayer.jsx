var React = require('react');

var NumPlayer = React.createClass({

  render: function() {
    return (
      <form id="player-count">
        <div className="btn-group" data-toggle="buttons">
          <label className="btn btn-primary">
            <input type="radio" name="p-count" value="0"/> 0 Player
          </label>
          <label className="btn btn-primary">
            <input type="radio" name="p-count" value="1"/> 1 Player
          </label>
          <label className="btn btn-primary active">
            <input type="radio" name="p-count" value="2" defaultChecked={true} /> 2 Players
          </label>
        </div>
      </form>
    )
  }
});

module.exports = NumPlayer;
