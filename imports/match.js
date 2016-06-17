import { Meteor } from 'meteor/meteor';
import { Listings } from './api/listings.js'


export default function matchListings() {
	var listings = Listings.find({}).fetch();

	listings.forEach(function(listing1) {
		matchListing(listing1);
	})

	function matchListing({fromLoc, toLoc, fromDate, toDate, _id}) {
		listings.forEach(function(listing2) {
			findMatch(listing2);
		})

		function findMatch(listing2) {
			if(fromLoc === listing2.toLoc && toLoc === listing2.fromLoc && fromDate === listing2.fromDate && toDate === listing2.toDate) {
				updateDatabase(_id, listing2._id);
			}
		}
	}
}

function updateDatabase(listing1ID, listing2ID) {
	Listings.update(listing1ID, {
		$set: { match: listing2ID },
	});

	Listings.update(listing2ID, {
		$set: { match: listing1ID },
	});
}