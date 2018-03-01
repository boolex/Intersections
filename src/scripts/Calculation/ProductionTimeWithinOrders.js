var ProductionTimeWithinOrders = function (range, orders, shifts, plannedDowntimes, availLossDowntimes) {
    this.range = range;
    this.orders = orders;
    this.shifts = shifts;
    this.plannedDowntimes = plannedDowntimes;
    this.availLossDowntimes = availLossDowntimes;
}
ProductionTimeWithinOrders.prototype.compute = function () {
    return this.shedTime() - this.losses();
}
ProductionTimeWithinOrders.prototype.shedTime = function () {
    return new EventCollection(
        new IntersectionSet([
            [this.range],
            this.orders,
            this.shifts
        ]).get()).duration();
}
ProductionTimeWithinOrders.prototype.losses = function () {
    return new EventCollection(
        new IntersectionSet([
            [this.range],
            this.orders,
            this.shifts,
            [].concat(this.plannedDowntimes).concat(this.availLossDowntimes)
        ]).get()).duration();
}