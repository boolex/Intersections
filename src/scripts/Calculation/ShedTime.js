var ShedTime = function (range, shifts) {
    this.range = range;
    this.shifts = shifts;
}
ShedTime.prototype.compute = function () {
    var shedTime = 0;
    this.shifts.forEach(function (shift) {
        shedTime +=
            new Intersection(
                this.range,
                shift
            ).duration();
    }, this);  
    return shedTime;
}