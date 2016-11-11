var alt = require('../alt');
var SampleActions = require('../actions/SampleActions');

class SampleStore {
  constructor() {

    this.lastTimestamp = 0;

    this.bindListeners({
      handleButtonClick: SampleActions.CLICK_BUTTON
    });
  }

  handleButtonClick(timestamp) {
    console.log('inside the handler');
    this.lastTimestamp = timestamp;
  }

}

module.exports = alt.createStore(SampleStore, 'SampleStore');
