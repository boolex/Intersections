var getProducedUnits = function (content) {
	var units = [];
	if(content.sites==null)
	return;
	content.sites.forEach(function (site, index, array) {
		if(site.departments==null)
		return;
		site.departments.forEach(function (department, index, array) {
		if(department.operatorstations==null)
		return;
			department.operatorstations.forEach(function (operatorstation, index, array) {
			if(operatorstation.orders==null)
			return;
				operatorstation.orders.forEach(function (order, index, array) {
					if(order.producedUnits){
						order.producedUnits.forEach(function (unit, index, array) {
							unit.operatorstation = operatorstation;
							unit.department = department;
							unit.site = site;
							unit.order = order;
							unit.type='PUTimeEnd';
							units.push(unit);
						});
					}
					if(order.scrappedUnits){
						order.scrappedUnits.forEach(function (unit, index, array) {
							unit.operatorstation = operatorstation;
							unit.department = department;
							unit.site = site;
							unit.order = order;
							unit.type='PUTimeScrapped';
							units.push(unit);
						});
					}
					if(order.startedUnits){
						order.startedUnits.forEach(function (unit, index, array) {
							unit.operatorstation = operatorstation;
							unit.department = department;
							unit.site = site;
							unit.order = order;
							unit.type='PUTimeStart';
							units.push(unit);
						});
					}
				});
			});
		});
	});
	return units;
}