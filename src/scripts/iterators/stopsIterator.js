var getStops = function (content) {
	var stops = [];
	if(content.sites){
	content.sites.forEach(function (site, index, array) {
		if(site.departments){
			site.departments.forEach(function (department, index, array) {
				if(department.operatorstations){
					department.operatorstations.forEach(function (operatorstation, index, array) {
						if(operatorstation.prodplaces){
							operatorstation.prodplaces.forEach(function (prodplace, index, array) {
								if (prodplace.stops != null) {
									prodplace.stops.forEach(function (stop, index, array) {
										stop.prodplace =  {id: prodplace.id};
										stop.operatorstation = operatorstation;
										stop.department = department;
										stop.site = site;
										if (content.downtimetypes != null) {
											stop.dttype = content.downtimetypes[stop.type];
										}
										stops.push(stop);
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
	return stops;
}