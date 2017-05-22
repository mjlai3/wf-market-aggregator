'use strict';

import $ from 'jquery';

export default class Selector {
	constructor() {

		if ($('.selector').length > 0) {
			let $selector = $('.selector');
			populateSelector($selector);
		}

		$('.selector').on('click', '.selector__link', (e) => {
			e.preventDefault();
			$('.viewer tbody').empty();
			var target = $(e.target).attr('href');
			displayPrices(target);
		});

		function displayPrices(dataset) {
			$.ajax({
				url: `https://wf-market-aggregator.firebaseio.com/prices/${dataset}.json`,
				dataType: 'json',
				method: 'GET'
			}).done((data) => {
				var sorted = _.sortBy(data, ['price', 'item_name']);
				console.log(sorted.reverse());
				_.forEach(sorted, (value, key) => {
					$('.viewer tbody').append(`<tr><td>${value.item_name}</td><td>${value.price}</td></tr>`);
				});
			})
		}

		function populateSelector(target) {
			$.ajax({
				url: 'https://wf-market-aggregator.firebaseio.com/prices.json',
				dataType: 'json',
				method: 'GET'
			}).done((data) => {
				console.log(data);
				_.forEach(data, (value, key) => {
					console.log(key);
					target.append(`<a href="${key}" class="selector__link">${key}</a>`);
				});
			})
		}
	}
}
