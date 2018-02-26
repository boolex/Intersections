var getShifts = function (content) {
	var shifts = [];
	content.sites.forEach(function (site, index, array) {
		site.departments.forEach(function (department, index, array) {
			department.operatorstations.forEach(function (operatorstation, index, array) {
				operatorstation.shifts.forEach(function (shift, index, array) {
					shift.operatorstation = operatorstation;
					shift.department = department;
					shift.site = site;
					shifts.push(shift);
				});
			});
		});
	});
	return shifts;
}