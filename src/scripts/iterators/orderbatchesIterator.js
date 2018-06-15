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
									if(order.batches){
										order.batches.forEach(function (orderBatch, index, array) {
											orderBatch.operatorstation = operatorstation;
											orderBatch.department = department;
											orderBatch.site = site;
											orderBatch.order = order;
											orderBatches.push(orderBatch);
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