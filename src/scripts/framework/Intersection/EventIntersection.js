var EventIntersection = function (source, target) {
	this.source = source;
	this.target = target;

	this.sourceStart = Date.parse(this.source.start || this.source.from);
	this.sourceEnd = Date.parse(this.source.end || this.source.to);

	this.targetStart = Date.parse(this.target.start || this.target.from);
	this.targetEnd = Date.parse(this.target.end || this.target.to);
}
EventIntersection.prototype.isIntersected = function () {
	var sourceStartsBeforeTargetEnd = this.sourceStart < this.targetEnd || this.targetEnd == null
	var sourceEndsAfterTargetStart = this.sourceEnd == null || this.sourceEnd > this.targetStart;
	return sourceStartsBeforeTargetEnd && sourceEndsAfterTargetStart;
}
EventIntersection.prototype.getIntersectionPeriod = function () {
	var period = {};
	period.start = new Date((this.sourceStart > this.targetStart ? this.sourceStart : this.targetStart)).yyyymmddhhmmss();
	period.end = new Date(this.sourceEnd > this.targetEnd ? this.targetEnd : this.sourceEnd).yyyymmddhhmmss();
	return period;
}

var getGroupIntersections = function (entries, groups, content) {
	var gr = {};
	entries.forEach(function (entry) {
		if (groups.indexOf(entry.group) != -1) {
			if (gr[entry.group] == null) {
				gr[entry.group] = [];
			}
			gr[entry.group].push(entry);
		}

	});

	var intersections = null;
	for (var k in gr) {
		intersections = getIntersections(intersections, gr[k]);
	}

	if(intersections==null){
		return [];
	}
	return intersections;
}
var getIntersections = function (sourceGroup, targetGroup) {
	if (sourceGroup == null) {
		return targetGroup;
	}

	var intersections = [];
	sourceGroup.forEach(function (sourceItem) {
		targetGroup.forEach(function (targetItem) {
			var i = new EventIntersection(sourceItem, targetItem);
			if (i.isIntersected()) {
				var period = i.getIntersectionPeriod();

				intersections.push({
					start: period.start,
					end: period.end,
					site: { id: 1 },
					department: { id: 1 },
					operatorstation: { id: 1 }
				});
			}
		});
	});
	return intersections;
}