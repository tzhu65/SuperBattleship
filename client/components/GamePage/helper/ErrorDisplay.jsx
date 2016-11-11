var React = require('react');

var GameHelperStore = require('../../../stores/GameHelperStore');

var ErrorDisplay = React.createClass({

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
      <div >
        <p id="display-err" className="alert helper not-float">{this.state.errorMessage}</p>
      </div>
    )
  }

});

module.exports = ErrorDisplay;
