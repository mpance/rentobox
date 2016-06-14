import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
 
export const Listings = new Mongo.Collection('listings');

Meteor.methods({
	'listings.insert'(fromLoc, toLoc, fromDate, toDate) {
		check(fromLoc, String);
		check(toLoc, String);
		check(fromDate, String);
		check(toDate, String);

		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		Listings.insert({
			fromLoc: fromLoc,
			toLoc: toLoc,
			fromDate: fromDate,
			toDate: toDate,
			owner: Meteor.userId(),
			username: Meteor.user().username,
			createdAt: new Date()
		});
	},

	'listings.remove'(listingId) {
		check(listingId, String);
		
		Listings.remove(listingId);	
	},

	'listings.toggleChecked'(listingId, isChecked) {
		Listings.update(listingId, {
			$set: { checked: !isChecked },
		});
	}
})