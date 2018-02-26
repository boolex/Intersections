var getProducedUnits = function (content) {
	var units = [];
	content.sites.forEach(function (site, index, array) {
		site.departments.forEach(function (department, index, array) {
			department.operatorstations.forEach(function (operatorstation, index, array) {
				operatorstation.orders.forEach(function (order, index, array) {
					order.producedUnits.forEach(function (unit, index, array) {
						unit.operatorstation = operatorstation;
						unit.department = department;
						unit.site = site;
						unit.order = order;
						units.push(unit);
					});
				});
			});
		});
	});
	return units;
}