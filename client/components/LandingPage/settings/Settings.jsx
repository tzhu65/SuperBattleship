var React = require('react');

var SliderSetting = require('./SliderSetting.jsx');
var NumPlayer = require('./NumPlayer.jsx');

var Settings = React.createClass({

  render: function() {
    return (
      <div className="container">
        <div>
          <table className="table">
            <tbody>
              <SliderSetting id="board-size" name="Board Size" min="30" max="70" step="1" val="50" />
              <SliderSetting id="miss-age" name="Miss Age" min="0" max="20" step="1" val="10" />
              <SliderSetting id="turn-lim" name="Turn Limit" min="50" max="350" step="10" val="200" />
              <SliderSetting id="rot-miss-lim" name="Rotate Miss Limit" min="0" max="6" step="1" val="3" />
              <SliderSetting id="rview-dis" name="Rear View Distance" min="0" max="4" step="1" val="2" />
            </tbody>
          </table>
        </div>
        <NumPlayer />
      </div>
    )
  }
});

module.exports = Settings;
