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
			operatorstation.prodplaces.forEach(function(prodplace){
				operatorstation.orders.forEach(function (order, index, array) {
					if(order.producedUnits){
						order.producedUnits.forEach(function (unit, index, array) {
							var item = copy(unit);
							item.operatorstation = operatorstation;
							item.department = department;
							item.site = site;
							item.order = order;
							item.prodplace =  prodplace;
							item.type='PUTimeEnd';
							units.push(item);
						});
					}
					if(order.scrappedUnits){
						order.scrappedUnits.forEach(function (unit, index, array) {
							var item = copy(unit);
							item.operatorstation = operatorstation;
							item.department = department;
							item.site = site;
							item.order = order;
							item.prodplace = prodplace;
							item.type='PUTimeScrapped';
							units.push(item);
						});
					}
					if(order.startedUnits){
						order.startedUnits.forEach(function (unit, index, array) {
							var item = copy(unit);
							item.operatorstation = operatorstation;
							item.department = department;
							item.site = site;
							item.order = order;
							item.prodplace =  prodplace;
							item.type='PUTimeStart';
							units.push(item);
						});
					}
				});
			});				
			});
		});
	});
	return units;
}