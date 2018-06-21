var getShiftPeriods = function (content) {
	var shiftPeriods = [];
	var prevShift = null;
	getShifts(content).forEach(function (shift, index, array) {
		if (prevShift != null && prevShift.operatorstation != shift.operatorstation) {
			prevShift = null;
		}

		if (shift.changeType > 0) {
			shiftPeriods.push({
				changeType: shift.changeType,
				prodplace:shift.prodplace,
				start: (prevShift == null ? shift.changeDate : prevShift.changeDate),
				end: shift.changeDate,
				site: shift.site,
				department: shift.department,
				operatorstation: shift.operatorstation
			});
		}
		prevShift = shift;
	});

	return shiftPeriods;
}