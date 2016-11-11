var alt = require('../alt');

class PageActions {

  loadLandingPage(timestamp) {
    return timestamp;
  }

  loadGamePage(timestamp) {
    return timestamp;
  }

}

module.exports = alt.createActions(PageActions);
