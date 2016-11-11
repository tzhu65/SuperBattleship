var React = require('react');

var CurrentSelectionStore = require('../../../stores/CurrentSelectionStore');

var CurrentSelection = React.createClass({

  getInitialState() {
    return CurrentSelectionStore.getState();
  },

  componentDidMount() {
    CurrentSelectionStore.listen(this.onChange);
  },

  componentWillUnmount() {
    CurrentSelectionStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },

  render: function() {
    return (
      <div className="events-log">
        <p>Current Selection</p>
        <p>{this.state.currentText}</p>
      </div>
    )
  }

});

module.exports = CurrentSelection;
