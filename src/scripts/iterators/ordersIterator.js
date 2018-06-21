var getOrders = function (content) {
	var orders = [];
	if(content.sites){
		content.sites.forEach(function (site, index, array) {
			if(site.departments){		
				site.departments.forEach(function (department, index, array) {
					if(department.operatorstations){
						department.operatorstations.forEach(function (operatorstation, index, array) {
							operatorstation.prodplaces.forEach(function(prodplace){
								if(operatorstation.orders){
									operatorstation.orders.forEach(function (order, index, array) {
										order.operatorstation = operatorstation;
										order.department = department;
										order.site = site;
										order.prodplace = prodplace;
										orders.push(order);
									});
								}
							});							
						});
					}
				});
			}
		});
	}
	return orders;
}