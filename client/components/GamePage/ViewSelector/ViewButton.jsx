var React = require('react');

var GameActions = require('../../../actions/GameActions');

var ViewButton = React.createClass({

  onClick: function(e) {
    GameActions.changeView(this.props.value);
  },

  render: function() {
    return (
      <label id={this.props.id + '-l'} className="btn btn-primary" onClick={this.onClick}>
        <input id={this.props.id} type="radio" name={this.props.name} value={this.props.value} />{this.props.text}
      </label>
    )
  }

});

module.exports = ViewButton;
