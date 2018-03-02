var Event = function (start, end, type) {
    this.start = start;
    this.end = end;
    this.type = type;
}
Event.prototype.getStart = function () {
    return this.start;
}
Event.prototype.getEnd = function () {
    return this.end;
}
Event.prototype.getType = function () {
    return this.type;
}
Event.prototype.duration = function () {
    return (this.end - this.start) / 1000;
}