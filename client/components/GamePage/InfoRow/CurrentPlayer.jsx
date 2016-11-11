var React = require('react');

var GameHelperStore = require('../../../stores/GameHelperStore');

var CurrentPlayer = React.createClass({

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
      <span className="helper ir-l">&nbsp;- {this.state.currentPlayer}</span>
    )
  }

});

module.exports = CurrentPlayer;
