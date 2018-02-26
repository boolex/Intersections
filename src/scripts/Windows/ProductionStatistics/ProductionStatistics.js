var ProductionStatistics = function (history) {
    this.history = history;
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