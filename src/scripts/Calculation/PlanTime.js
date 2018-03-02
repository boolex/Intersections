var PlanTime = function (range, shifts, plannedDowntimes) {
    this.range = range;
    this.shifts = shifts;
    this.plannedDowntimes = plannedDowntimes;
}
PlanTime.prototype.compute = function () {
    return this.shedTime() - this.plannedDowntime();
}
PlanTime.prototype.shedTime = function () {
    return new ShedTime(this.range, this.shifts).compute();
}
PlanTime.prototype.plannedDowntime = function () {
    var plannedDowntime = 0;
    if (this.plannedDowntimes) {
        this.plannedDowntimes.forEach(function (stop) {
            plannedDowntime +=
                new Intersection(
                    this.range,
                    {
                        start: Date.parse(stop.start),
                        end: Date.parse(stop.end)
                    }
                ).duration();
        }, this);
    }
    return plannedDowntime;
}