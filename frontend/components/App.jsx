var React = require('react');
var NavBar = require('./NavBar');
var PetIndex = require('./PetIndex');
var PetStore = require('./../stores/pet_store');
var Search = require('./Search');

var App = React.createClass({

  render: function () {
    return (
      <div>
        <div>
          <img src={ursaUrl} className="scaling-image"/>
          <Search />
          <img src={itemsUrl} className="scaling-image ad"/>
          <PetIndex />
        </div>
      </div>
    );
  }
});

module.exports = App;
