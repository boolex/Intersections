var PlanTime = function (range, shifts, plannedDowntimes) {
    this.range = range;
    this.shifts = shifts;
    this.plannedDowntimes = plannedDowntimes;
}
PlanTime.prototype.compute = function () {
    var shedTime = 0;
    this.shifts.forEach(function (shift) {
        shedTime += shift.duration;
    }, this);
    var plannedDowntime = 0;
    this.plannedDowntimes.forEach(function (stop) {
        plannedDowntime += stop.duration;
    });
    return shedTime - plannedDowntime;
}