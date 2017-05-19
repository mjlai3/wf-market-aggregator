// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import _ from 'lodash';
import * as firebase from 'firebase';
import moment from 'moment';

$(() => {
	let config = {
		apiKey: "AIzaSyAWmrue0-K3060LW509c4MSZy0Eb0_DJPI",
		authDomain: "wf-market-aggregator.firebaseapp.com",
		databaseURL: "https://wf-market-aggregator.firebaseio.com",
		projectId: "wf-market-aggregator",
		storageBucket: "wf-market-aggregator.appspot.com",
		messagingSenderId: "1025734958112"
	};
	let app = firebase.initializeApp(config);
	let database = firebase.database();
	let currentTime = moment().format('YYYYMMMMDHHmmss');
	let pricesJSON = [];

	console.log(currentTime);

	$('.update__firebase').on('click', () => {
		getItems();
	})

	function getFirebaseData() {
		$.ajax({
			url: 'https://wf-market-aggregator.firebaseio.com/data.json',
			dataType: 'json',
			method: 'GET'
		}).done((data) => {
			console.log(data);
		})
	}

	function addFirebaseData(data, location) {
		$.ajax({
			url: `https://wf-market-aggregator.firebaseio.com/${location}.json`,
			data: JSON.stringify(data),
			method: 'PUT'
		});
	}

	function getItems(){
		$.ajax({
			url: 'http://warframe.market/api/get_all_items_v2',
			dataType: 'json',
			method: 'GET'
		}).done((data) => {
			addFirebaseData(data, 'items');
			_.forEach(data, (item) => {
				callItem(item.item_type, item.item_name);
			})
		})
	}

	function setJSON(data) {
		itemJSON = data;
		console.log(itemJSON);
	}

	function callItem(itemType, itemName) {
		$.ajax({
			url: `http://warframe.market/api/get_orders/${itemType}/${itemName}`,
			dataType: 'json',
			method: 'GET'
		}).done((data) => {
			let lowestPrice = (_.minBy(_.filter(data.response.sell, ['online_ingame', true]), 'price')).price || null;
			$('.progress').prepend(`<p>${itemName}: ${lowestPrice}</p>`);
			pricesJSON.push({[itemName]:lowestPrice});
			addFirebaseData(pricesJSON, `prices/${currentTime}`);
		})
	}
});
