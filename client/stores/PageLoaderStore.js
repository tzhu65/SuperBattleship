var alt = require('../alt');
var PageActions = require('../actions/PageActions');

class PageLoaderStore {
  constructor() {

    this.currentPage = null;
    this.settings = {
      duration: 500
    }
    this.bindListeners({
      handleLoadLandingPage: PageActions.LOAD_LANDING_PAGE,
      handleLoadGamePage: PageActions.LOAD_GAME_PAGE,
    });
  }

  handleLoadLandingPage(timestamp) {

    var _this = this;
    var duration = this.settings.duration;
    var landingPage = $('#landing-page');
    var loadLandingPage = function() {
      landingPage.fadeIn(duration);
    }

    // Fade out the current page if any
    if (this.currentPage) {
      duration /= 2;
      this.currentPage.fadeOut(_this.settings.duration, loadLandingPage);
    } else {
      loadLandingPage();
    }
    this.currentPage = landingPage;

  }

  handleLoadGamePage(timestamp) {

    var _this = this;
    var duration = this.settings.duration;
    var gamePage = $('#game-page');
    var loadGamePage = function() {
      gamePage.fadeIn(duration);
    }

    // Fade out the current page if any
    if (this.currentPage) {
      duration /= 2;
      this.currentPage.fadeOut(_this.settings.duration, loadGamePage);
    } else {
      loadGamePage();
    }
    this.currentPage = gamePage;

  }

}

module.exports = alt.createStore(PageLoaderStore, 'PageLoaderStore');
