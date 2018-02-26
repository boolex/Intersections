var getStops = function (content) {
	var stops = [];
	content.sites.forEach(function (site, index, array) {
		site.departments.forEach(function (department, index, array) {
			department.operatorstations.forEach(function (operatorstation, index, array) {
				operatorstation.prodplaces.forEach(function (prodplace, index, array) {
					if (prodplace.stops != null) {
						prodplace.stops.forEach(function (stop, index, array) {
							stop.prodplace = prodplace;
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
			});
		});
	});
	return stops;
}