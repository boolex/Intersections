var getShifts = function (content) {
	var shifts = [];
	if(content.sites){
		content.sites.forEach(function (site, index, array) {
			if(site.departments){
				site.departments.forEach(function (department, index, array) {
					if(department.operatorstations){
						department.operatorstations.forEach(function (operatorstation, index, array) {
							if(operatorstation.shifts){
								operatorstation.shifts.forEach(function (shift, index, array) {
									shift.operatorstation = operatorstation;
									shift.department = department;
									shift.site = site;
									shifts.push(shift);
								});
							}
						});
					}
				});
			}
		});
	}
	return shifts;
}