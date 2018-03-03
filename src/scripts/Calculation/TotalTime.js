var TotalTime = function (range, intersections) {
    this.range = range;
    this.intersections = intersections;
}
TotalTime.prototype.compute = function () {
    if (this.intersections != null && this.intersections.length > 0) {
        return new EventCollection(
            this.intersections
        ).duration();
    }
    else {
        return new Event(
            this.range.start,
            this.range.end, 'range'
        ).duration();
    }
}
