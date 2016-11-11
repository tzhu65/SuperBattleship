var React = require('react');

var SliderSetting = React.createClass({

  componentDidMount() {
    var jQId = '#' + this.props.id;

    $(jQId + '-name').text(this.props.name);

    $(jQId).slider({
      tooltip: 'hide'
    });
    $(jQId).on('change', function(e) {
      var str = " " + e.value.newValue;
    	$(jQId + '-val').val(str);
      $(jQId + '-val').text(str);
      return e.value.newValue;
    });
    $(jQId).slider('refresh');
  },

  componentWillUnmount() {
    var jQId = '#' + this.props.id;

    $(jQId).slider('destroy');
  },

  render: function() {
    return (
      <tr>
        <td>
          <span id={this.props.id + '-name'}></span>
        </td>
        <td>
          <span id={this.props.id + '-val'}>&nbsp;{this.props.val}</span>
        </td>
        <td>
          <input
            id={this.props.id}
            type="text"
            data-slider-min={this.props.min}
            data-slider-max={this.props.max}
            data-slider-step={this.props.step}
            data-slider-value={this.props.val}
          />
        </td>
      </tr>
    )
  }

});

module.exports = SliderSetting;
