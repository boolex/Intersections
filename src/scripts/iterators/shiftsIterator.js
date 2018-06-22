var getShifts = function (content) {
	var shifts = [];
	if(content.sites){
		content.sites.forEach(function (site, index, array) {
			if(site.departments){
				site.departments.forEach(function (department, index, array) {
					if(department.operatorstations){
						department.operatorstations.forEach(function (operatorstation, index, array) {	
							operatorstation.prodplaces.forEach(function(prodplace){
								if(operatorstation.shifts){
									operatorstation.shifts.forEach(function (shift, index, array) {
										var item = copy(shift);
										item.operatorstation = operatorstation;
										item.department = department;
										item.site = site;
										item.prodplace =  prodplace;
										shifts.push(item);
									});
								}
							});	
						});
					}
				});
			}
		});
	}
	return shifts;
}