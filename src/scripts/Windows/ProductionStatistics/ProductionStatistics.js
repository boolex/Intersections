var ProductionStatistics = function (history, range) {
    this.history = history;
    this.range = { start: range.from, end: range.to };
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

ProductionStatistics.prototype.getShedTime=function(){
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
        this.history.getShifts(),
        this.history.getPlannedDowntimeEntries(),
        this.history.getAvailabilityLossEntries()
    ).compute();
}
ProductionStatistics.prototype.getProductionTimeWithinOrders = function () {
    return new ProductionTimeWithinOrders(
        this.range,
        this.history.getOrderBatches(),
        this.history.getShifts(),        
        this.history.getPlannedDowntimeEntries(),
        this.history.getAvailabilityLossEntries()
    ).compute();
}