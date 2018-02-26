var getOrders = function (content) {
	var orders = [];
	content.sites.forEach(function (site, index, array) {
		site.departments.forEach(function (department, index, array) {
			department.operatorstations.forEach(function (operatorstation, index, array) {
				operatorstation.orders.forEach(function (order, index, array) {
					order.operatorstation = operatorstation;
					order.department = department;
					order.site = site;
					orders.push(order);
				});
			});
		});
	});
	return orders;
}