var ProductionTime = function (range, shifts, plannedDowntimes, availLossDowntimes) {
    this.range = range;
    this.shifts = shifts;
    this.plannedDowntimes = plannedDowntimes;
    this.availLossDowntimes = availLossDowntimes;
}
ProductionTime.prototype.compute = function () {
    return this.planTime() - this.availabilityLosses();
}
ProductionTime.prototype.planTime = function () {
    return new PlanTime(this.range, this.shifts, this.plannedDowntimes).compute();
}
ProductionTime.prototype.availabilityLosses = function () {
    var availLoss = 0;
    if (this.availLossDowntimes) {
        this.availLossDowntimes.forEach(function (stop) {
            availLoss +=
                new Intersection(
                    this.range,
                    {
                        start: Date.parse(stop.start),
                        end: Date.parse(stop.end)
                    }
                ).duration();
        }, this);
    }
    return availLoss;
}