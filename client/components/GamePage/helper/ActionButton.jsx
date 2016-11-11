var React = require('react');

var ActionButton = React.createClass({

  render: function() {
    return (
      <button
        id={this.props.id}
        type="button"
        className="btn btn-primary no-ol"
        onClick = {this.props.onClick}
      >
        {this.props.text}
      </button>
    )
  }

});

module.exports = ActionButton;
