var React = require('react');

var GameHelperStore = require('../../../stores/GameHelperStore');

var HoveredLocation = React.createClass({
  getInitialState() {
    return GameHelperStore.getState();
  },

  componentDidMount() {
    GameHelperStore.listen(this.onChange);
  },

  componentWillUnmount() {
    GameHelperStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },

  render: function() {
    return (
      <span className="helper ir-r">X: {this.state.hoveredBlock.x} Y: {this.state.hoveredBlock.y}</span>
    )
  }

});

module.exports = HoveredLocation;
