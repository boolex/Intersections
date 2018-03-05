var ProductionStatistics = function (history, range) {
    this.history = history;
    this.range = { start: new Date(range.from), end: new Date(range.to) };
}

ProductionStatistics.prototype.get = function () {

}
ProductionStatistics.prototype.getTotalInstersectionTime = function () {
    var duration = 0;
    this.history.forEach(function (item) {
        if (item.group == 'Intersections') {
            duration += item.duration;
        }
    });
    return duration;
}
ProductionStatistics.prototype.getTotalPuTimeEnd = function () {
    var amount = 0;
    this.history.forEach(function (item) {
        if (item.group == 'PUTimeEndWithinIntersections') {
            amount += item.amount || 1;
        }
    });
    return amount;
}
ProductionStatistics.prototype.getTotalPuTimeStart = function () {
    var amount = 0;
    this.history.forEach(function (item) {
        if (item.group == 'PUTimeStartWithinIntersections') {
            amount += item.amount || 1;
        }
    });
    return amount;
}
ProductionStatistics.prototype.getTotalPuTimeScrapped = function () {
    var amount = 0;
    this.history.forEach(function (item) {
        if (item.group == 'PUTimeScrappedWithinIntersections') {
            amount += item.amount || 1;
        }
    });
    return amount;
}

ProductionStatistics.prototype.getShedTime = function () {
    return new ShedTime(
        this.range,
        this.history.getShifts()
    ).compute();
}
ProductionStatistics.prototype.getPlanTime = function () {
    return new PlanTime(
        this.range,
        this.history.getShifts(),
        this.history.getPlannedDowntimeEntries()
    ).compute();
}
ProductionStatistics.prototype.getProductionTime = function () {
    return new ProductionTime(
        this.range,
        new IntersectionSet([/*shifts*/
            this.getIntersections(),
            this.history.getShifts()
        ]).get(),
        new IntersectionSet([/*plannedDowntimes*/
            this.getIntersections(),
            this.history.getPlannedDowntimeEntries(),
            this.history.getShifts()
        ]).get(),
        new IntersectionSet([/*availLossDowntimes*/
            this.getIntersections(),
            this.history.getAvailabilityLossEntries(),
            this.history.getShifts()
        ]).get()
    ).compute();
}
ProductionStatistics.prototype.getProductionTimeWithinOrders = function () {
    return new ProductionTimeWithinOrders(
        this.range,
        this.history.getOrderBatches(),
        new IntersectionSet([/*shifts*/
            this.getIntersections(),
            this.history.getShifts()
        ]).get(),
        new IntersectionSet([/*plannedDowntimes*/
            this.getIntersections(),
            this.history.getPlannedDowntimeEntries(),
            this.history.getShifts()
        ]).get(),
        new IntersectionSet([/*availLossDowntimes*/
            this.getIntersections(),
            this.history.getAvailabilityLossEntries(),
            this.history.getShifts()
        ]).get()
    ).compute();
}
ProductionStatistics.prototype.getIntersections = function () {
    var inter = [];
    this.history.get().forEach(function (e) {
        if (e.group == 'Intersections') {
            inter.push(
                new Event(
                    new Date(Date.parse(e.start)),
                    new Date(Date.parse(e.end))
                )
            );
        }
    });
    if (inter.length == 0) {
        inter.push(
            new Event(
                this.range.start,
                this.range.end
            )
        );
    }
    return inter;
}
ProductionStatistics.prototype.getAvailability = function () {
    return new Availability(
        this.range,/*ranges*/
        new IntersectionSet([/*shifts*/
            this.getIntersections(),
            this.history.getShifts()
        ]).get(),
        new IntersectionSet([/*plannedDowntimes*/
            this.getIntersections(),
            this.history.getPlannedDowntimeEntries(),
            this.history.getShifts()
        ]).get(),
        new IntersectionSet([/*availLossDowntimes*/
            this.getIntersections(),
            this.history.getAvailabilityLossEntries(),
            this.history.getShifts()
        ]).get()
    ).compute();
}
ProductionStatistics.prototype.getTotalTime = function () {
    return new TotalTime(
        this.range,
        this.getIntersections()
    ).compute();
}
ProductionStatistics.prototype.getTotalProducedAmount = function () {
    return new TotalProducedAmount(
        this.history.getProducedAmounts(),
        this.history.getStartedAmounts()
    ).compute();
}