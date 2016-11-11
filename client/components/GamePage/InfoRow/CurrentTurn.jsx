var React = require('react');

var GameHelperStore = require('../../../stores/GameHelperStore');

var CurrentTurn = React.createClass({

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
      <span className="helper ir-l">Turn {this.state.currentTurn + 1} / {this.state.turnLimit}</span>
    )
  }

});

module.exports = CurrentTurn;
