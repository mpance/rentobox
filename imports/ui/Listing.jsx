import React, { Component, PropTypes } from 'react';
 
// Task component - represents a single todo item
export default class Listing extends Component {
  render() {
  	console.log(this.props.listing);
    return (
      <li>{this.props.listing.fromLoc}, {this.props.listing.toLoc}, {this.props.listing.fromDate}, {this.props.listing.toDate}</li>
    );
  }
}
 
Listing.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  listing: PropTypes.object.isRequired,
};