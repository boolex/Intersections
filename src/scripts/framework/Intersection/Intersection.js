var Intersection = function (source, target) {
    this.source = source;
    this.target = target;
}

Intersection.prototype.get = function () {
    if (this.inter === undefined) {
        this.inter = this.intersect();
    }
    return this.inter;
}
Intersection.prototype.intersect = function () {
    if (
        this.target == null
        || this.source == null
        || this.target.start == null
        || this.target.end == null
        || this.source.start == null
        || this.source.end == null
    ) {
        throw 'Intersection.prototype.get NullReference';
    }
    var inter = {
        start: this.source.start > this.target.start ? this.source.start : this.target.start,
        end: this.source.end < this.target.end ? this.source.end : this.target.end
    };
    if (inter.start > inter.end) {
        return null;
    }
    else {
        return inter;
    }
}
Intersection.prototype.duration = function () {
    if (this.source == null || this.target == null) {
        return 0;
    }
    var inter = this.get();
    if (inter == null) {
        return 0;
    }
    else {
        return (inter.end - inter.start) / 1000;
    }
}