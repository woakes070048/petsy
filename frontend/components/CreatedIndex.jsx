var React = require('react');
var PetStore = require('./../stores/pet_store');
var PetApiUtil = require('./../util/pet_api_util');
var PetIndexItem = require('./PetIndexItem');
var SessionStore = require('./../stores/session_store');
var PetEdit = require('./PetEdit');

var CreatedIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({
      pets: PetStore.createdPets(SessionStore.currentUser().id),
      modal: null
    });
  },

  componentDidMount: function () {
    this.petListener = PetStore.addListener(this._onChange);
      PetApiUtil.fetchCreatedPets();
  },

  componentWillReceiveProps: function (newProps) {
      PetApiUtil.fetchCreatedPets(SessionStore.currentUser().id);
  },

  componentWillUnmount: function () {
    this.petListener.remove();
  },

  _onChange: function () {
    debugger
    this.setState({
      pets: PetStore.createdPets(SessionStore.currentUser().id)
    });
  },

  closeModal: function () {
    this.setState({modal: null});
  },

  showEdit: function (e) {
    var petId = e.currentTarget.value;
    this.setState({modal: <PetEdit id={petId} close={this.closeModal}/>});
  },

  deleteListing: function (e) {
    var petId = e.currentTarget.value
    PetApiUtil.deletePet(petId);
    this.context.router.push("/")
  },

  _onChange: function () {
    this.setState({
      pets: PetStore.createdPets(SessionStore.currentUser().id),
      modal: null
    });
  },

  render: function () {
    if (!this.state.pets) {
      return (
        <div>Fetching pets...</div>
      )
    } else {
      var el = this;
      return(
        <div>
        {this.state.modal}
        <ul className="pet-index">
          {this.state.pets.map(function (pet) {
            return(
              //bind if you're going to show modal

              <div className="created-pet" key={pet.id}>
                <PetIndexItem pet={pet}/>
                <p className="login-button er" value={pet.id} onClick={el.showEdit}>Edit</p>
                <p className="login-button er" value={pet.id} onClick={el.deleteListing}>Remove</p>
              </div>
            )
          })}
        </ul>
        </div>
      );
    }

  }
});



module.exports = CreatedIndex;
