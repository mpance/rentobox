import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Listings } from '../api/listings.js';

import Listing from './Listing.jsx'
import InputForm from './InputForm.jsx'
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
 
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    })
  }

  renderListings() {
    console.log(this.props.listings);
    let filteredListings = this.props.listings;
    if(this.state.hideCompleted) {
      filteredListings = filteredListings.filter(listing => !listing.checked);
    }

    return filteredListings.map((listing) => (
      <Listing key={listing._id} listing={listing} />
    ));
  }
 
  render() {
    return (
      <section>
        <div className="column">
          <header>
            <h1>Listings: {this.props.incompleteCount}</h1>
            <label className="hide-completed">
              <input 
                type="checkbox"
                readOnly
                checked={this.state.hideCompleted}
                onClick={this.toggleHideCompleted.bind(this)}
              />
              Hide selected listings
            </label>

            <div><AccountsUIWrapper /></div>

          </header>
   
          <div id="listingList">
            {this.renderListings()}
          </div>
        </div>
        <div className="column">
          { this.props.currentUser ?
            <InputForm /> : ''
          }
        </div>
      </section>
    );
  }
}

App.propTypes = {
  listings: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    listings: Listings.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Listings.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, App);