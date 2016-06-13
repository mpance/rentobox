import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Listings } from '../api/listings.js';

import Listing from './Listing.jsx'
import InputForm from './InputForm.jsx'
 
// App component - represents the whole app
class App extends Component {
  renderListings() {
    console.log(this.props.listings);
    return this.props.listings.map((listing) => (
      <Listing key={listing._id} listing={listing} />
    ));
  }
 
  render() {
    return (
      <section>
        <div className="column">
          <header>
            <h1>Listings</h1>
          </header>
   
          <ul>
            {this.renderListings()}
          </ul>
        </div>
        <div className="column">
          <InputForm />
        </div>
      </section>
    );
  }
}

App.propTypes = {
  listings: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    listings: Listings.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);