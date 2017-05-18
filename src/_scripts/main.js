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
		}).done(function(data) {
			setJSON(data);
		})
	}

	function setJSON(data) {
		itemJSON = data;
		console.log(itemJSON);
	}
});
