var EventCollection = function (collection) {
    this.collection = collection;
}
EventCollection.prototype.duration = function () {
    var d = 0;
    if (this.collection) {
        this.collection.forEach(function (event) {
            d += event.duration();
        });
    }
    return d;
}