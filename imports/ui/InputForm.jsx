import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Listings } from '../api/listings.js'

export default class InputForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fromLoc: '',
			toLoc: '',
			fromDate: '',
			toDate: '',
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(event);

		Meteor.call('listings.insert', this.state.fromLoc, this.state.toLoc, this.state.fromDate, this.state.toDate);

		this.setState({ fromLoc: '' });
		this.setState({ toLoc: '' });
		this.setState({ fromDate: '' });
		this.setState({ toDate: '' });

	}

	handleChange(event) {
		console.log(event.target.id);
		if(event.target.id === 'fromLocInput') {
			this.setState({ fromLoc: event.target.value})
		} else if (event.target.id === 'toLocInput') {
			this.setState({ toLoc: event.target.value})
		} else if (event.target.id === 'fromDateInput') {
			this.setState({ fromDate: event.target.value})
		} else if (event.target.id === 'toDateInput') {
	    this.setState({ toDate: event.target.value})
		}
	}

	render() {
		return (
			<div>
				<form className="new-listing" onSubmit={this.handleSubmit.bind(this)}>
					<p>I live: 
					<input 
						id="fromLocInput"
						type="text"
						value={this.state.fromLoc}
						ref="fromLoc"
						placeholder="From"
						onChange={this.handleChange.bind(this)}
					/></p>
					<p>I'd like to go:
					<input 
					  id="toLocInput"
						type="text"
						ref="toLoc"
						value={this.state.toLoc}
						onChange={this.handleChange.bind(this)}
						placeholder="To"
					/></p>
					<p>From: 
					<input 
					  id="fromDateInput"
						type="text"
						ref="fromDate"
						value={this.state.fromDate}
						onChange={this.handleChange.bind(this)}
						placeholder="July 1"
					/></p>
					<p>To: 
					<input 
					  id="toDateInput"
						type="text"
						ref="toDate"
						value={this.state.toDate}
						onChange={this.handleChange.bind(this)}
						placeholder="July 4"
					/></p>
					<p>
					<input 
						type="submit"
					/></p>
				</form>
			</div>
		)
	}
}