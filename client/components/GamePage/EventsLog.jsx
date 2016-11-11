var React = require('react');

var EventsLogStore = require('../../stores/EventsLogStore');

var EventsLog = React.createClass({

  getInitialState() {
    return EventsLogStore.getState();
  },

  componentDidMount() {
    EventsLogStore.listen(this.onChange);
  },

  componentWillUnmount() {
    EventsLogStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);

    // Auto scroll to the bottom
    var textarea = document.getElementById('events-log');
    textarea.scrollTop = textarea.scrollHeight;
  },
  render: function() {
    return (
      <div>
        <textarea
          id="events-log"
          className="form-control events-log"
          rows="10"
          value={this.state.events.join('\n')}
          readOnly
        >

        </textarea>
      </div>
    )
  }

});

module.exports = EventsLog;
