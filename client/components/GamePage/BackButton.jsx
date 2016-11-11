var React = require('react');

var PageActions = require('../../actions/PageActions');

var BackButton = React.createClass({

  onClick: function() {
    BootstrapDialog.show({
      closable: true,
      title: '',
      message: 'Exit Game?',
      cssClass: '',
      buttons: [{
        label: 'Yes',
        cssClass: 'btn btn-primary',
        action: function(dialogItself) {
          PageActions.loadLandingPage(0);
          dialogItself.close();
        }
      }, {
        label: 'No',
        cssClass: 'btn btn-primary',
        action: function(dialogItself) {
          dialogItself.close();
        }
      }]
    });

  },

  render: function() {
    return (
      <button id="back-btn" type="button" className="btn btn-primary pull-left" onClick={this.onClick}>◀</button>
    )
  }

});

module.exports = BackButton;
