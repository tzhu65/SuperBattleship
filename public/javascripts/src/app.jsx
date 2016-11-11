var React = require('react');
var ReactDOM = require('react-dom');

/**
 * Libraries
 */

global.SBConstants = require('./SBConstants');
global.SuperBattleship = require('./SuperBattleship');
global.jQuery = require('jquery');
global.$ = jQuery;
var bootstrap = require('../../libraries/bootstrap-sass/assets/javascripts/bootstrap');
var bootstrapSlider = require('../../libraries/seiyria-bootstrap-slider/dist/bootstrap-slider.min');
global.BootstrapDialog = require('../../libraries/bootstrap3-dialog/dist/js/bootstrap-dialog.min');

/**
 * Components
 */

var MainFrame = require('../../../client/components/MainFrame.jsx');

/**
 * Add the components
 */

ReactDOM.render(
  <MainFrame />,
  document.getElementById('main-frame')
);
