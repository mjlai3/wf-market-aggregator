// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import _ from 'lodash';

$(() => {
	let itemJSON = [];
	getItems();

	function getItems(){
		$.ajax({
			url: 'http://warframe.market/api/get_all_items_v2',
			dataType: 'json',
			method: 'GET'
		}).done((data) => {
			setJSON(data);
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
			console.log(data);
		})
	}
});
