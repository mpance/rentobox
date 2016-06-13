import React, { Component, PropTypes } from 'react';

import { Listings } from '../api/listings.js'

 
// Task component - represents a single todo item
export default class Listing extends Component {

	toggleChecked() {
		Listings.update(this.props.listing._id, {
			$set: { checked: !this.props.listing.checked },
		});
	}

	deleteThisListing() {
		console.log(this.props.listing);
		Listings.remove(this.props.listing._id);
	}

  render() {
    return (
      <div className="listingItem">
      	<div>From: {this.props.listing.fromLoc}</div>
        <div>To: {this.props.listing.toLoc}</div>
        <div>From: {this.props.listing.fromDate}</div>
        <div>Until: {this.props.listing.toDate}</div>
        <button className="delete" onClick={this.deleteThisListing.bind(this)}>
        &times;
        </button>
        <input 
        	type="checkbox"
        	readOnly
        	checked={this.props.listing.checked}
        	onClick={this.toggleChecked.bind(this)}
        />
      </div>
    );
  }
}
 
Listing.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  listing: PropTypes.object.isRequired,
};