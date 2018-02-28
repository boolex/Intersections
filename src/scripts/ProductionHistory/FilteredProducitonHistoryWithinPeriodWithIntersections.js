var FilteredProducitonHistoryWithinPeriodWithIntersections = function (content, range, groups) {
	ProductionHistoryWithinPeriod.apply(this, arguments);
	this.groups = groups;
}

FilteredProducitonHistoryWithinPeriodWithIntersections.prototype = Object.create(ProductionHistoryWithinPeriod.prototype);

FilteredProducitonHistoryWithinPeriodWithIntersections.prototype.get = function () {
	return (this.filteredItems = this.filteredItems || this.getFilteredItems());
}

FilteredProducitonHistoryWithinPeriodWithIntersections.prototype.getFilteredItems = function () {
	var items = ProductionHistoryWithinPeriod.prototype.get.apply(this, arguments);

	if (this.groups != null && this.groups.length > 0) {
		var filteredItems = filterItems(items, this.groups);
		var groups = [];
		for (var i = 0; i < this.groups.length; i++) {
			groups.push(this.groups[i].split(',')[0]);
		}
		
		getGroupIntersections(filteredItems, groups, this.content).forEach(function (inter, index, array) {
			var interStart = new Date(Date.parse(inter.start));
			var interEnd = new Date(Date.parse(inter.end));

			items.push({
				id: "inter_" + inter.start,
				content: "[" + inter.start + "]  -  [" + inter.end + "]",
				title: "<br/><b>Start:</b> " + inter.start
				+ "<br/><b>End:</b> " + inter.end
				+ "<br/><b>Duration: </b>"
				+ (interEnd - interStart) / 1000 + " <b>s</b>",
				start: inter.start,
				end: inter.end,
				group: "Intersections",
				duration: (interEnd - interStart) / 1000,
				className: 'intersection'
			});


			items.forEach(function (item) {
				if (item.eventType == 'PUTimeEnd') {
					var puTime = new Date(Date.parse(item.start));
					if (puTime >= interStart && puTime <= interEnd) {
						items.push({
							id: "PUTimeEndWithinIntersections_" + item.start,
							content: item.start,
							title: item.start,
							start: item.start,
							end: item.start,
							amount: item.amount,
							group: "PUTimeEndWithinIntersections"
						});
					}
				}
			});

			items.forEach(function (item) {
				if (item.eventType == 'PUTimeStart') {
					var puTime = new Date(Date.parse(item.start));
					if (puTime >= interStart && puTime <= interEnd) {
						items.push({
							id: "PUTimeStartWithinIntersections_" + item.start,
							content: item.start,
							title: item.start,
							start: item.start,
							end: item.start,
							amount: item.amount,
							group: "PUTimeStartWithinIntersections"
						});
					}
				}
			});


			items.forEach(function (item) {
				if (item.eventType == 'PUTimeScrapped') {
					var puTime = new Date(Date.parse(item.start));
					if (puTime >= interStart && puTime <= interEnd) {
						items.push({
							id: "PUTimeScrappedWithinIntersections_" + item.start,
							content: item.start,
							title: item.start,
							start: item.start,
							end: item.start,
							amount: item.amount,
							group: "PUTimeScrappedWithinIntersections"
						});
					}
				}
			});
		});
	}

	return items;
}
function filterItems(items, groups) {
	var gr = [];
	for (var i = 0; i < groups.length; i++) {
		gr.push(groups[i].split(','));
	}

	var filteredItems = [];

	items.forEach(function (item) {
		gr.forEach(function (group) {
			if (filteredItems.indexOf(item) == -1 && isItemUnderGroup(item, group)) {
				filteredItems.push(item);
			}
		});
	});


	return filteredItems;
}
function isItemUnderGroup(item, group) {
	if (item.group != group[0]) {
		return false;
	}
	if (group.length == 1) {
		return true;
	}
	if (group.length == 3 && item.tags != null && item.tags[group[1]] == group[2]) {
		return true;
	}
	if (group.length == 2 && item.tags != null && item.tags[group[1]] != null) {
		return true;
	}
	return false;
}