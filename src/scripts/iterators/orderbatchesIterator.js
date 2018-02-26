var getOrderBatches = function (content) {
	var orderBatches = [];
	content.sites.forEach(function (site, index, array) {
		site.departments.forEach(function (department, index, array) {
			department.operatorstations.forEach(function (operatorstation, index, array) {
				operatorstation.orders.forEach(function (order, index, array) {
					order.batches.forEach(function (orderBatch, index, array) {
						orderBatch.operatorstation = operatorstation;
						orderBatch.department = department;
						orderBatch.site = site;
						orderBatch.order = order;
						orderBatches.push(orderBatch);
					});
				});
			});
		});
	});
	return orderBatches;
}