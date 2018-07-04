var getOrderBatches = function (content) {
	var orderBatches = [];
	if(content.sites){
		content.sites.forEach(function (site, index, array) {
			if(site.departments){
				site.departments.forEach(function (department, index, array) {
					if(department.operatorstations){
						department.operatorstations.forEach(function (operatorstation, index, array) {
							if(operatorstation.orders){
								operatorstation.orders.forEach(function (order, index, array) {
									if(operatorstation.prodplaces){
										operatorstation.prodplaces.forEach(function(prodplace){
											if(order.batches){
												order.batches.forEach(function (orderBatch, index, array) {
													var item = copy(orderBatch);
													item.operatorstation = operatorstation;
													item.department = department;
													item.site = site;
													item.order = order;
													item.prodplace = prodplace;
													orderBatches.push(item);
												});
											}
										});								
									}	
								});
							}
						});
					}
				});
			}
		});
	}
	return orderBatches;
}