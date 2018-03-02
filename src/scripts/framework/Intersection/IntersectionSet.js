var IntersectionSet = function (collections) {
    this.collections = collections;

}
IntersectionSet.prototype.all = function () {
    var items = [];
    if (this.collections) {
        this.collections.forEach(function (collection, collectionIndex) {
            collection.forEach(function (item, index) {
                items.push({
                    item: item,
                    on: item.start,
                    isStart: true,
                    type: collectionIndex
                });
                items.push({
                    item: item,
                    on: item.end,
                    isStart: false,
                    type: collectionIndex
                });
            })
        }, this);
    }
    return items;
}
IntersectionSet.prototype.allSorted = function () {
    return new SortedEventCollection(
        this.all(),
        function (a, b) {
            return a.on < b.on;
        }
    ).get();
}
IntersectionSet.prototype.get = function () {
    var sorted = this.allSorted();
    if (sorted.length == 0) {
        return [];
    }
    var intersections = [];
    var activeTypes = [];
    var start = sorted[0].on;
    sorted.forEach(function (item) {
        if (activeTypes.length == this.collections.length) {
            intersections.push(new Event(start, item.on, 'itr'));
        }

        if (item.isStart) {
            start = item.on;
            if (activeTypes.indexOf(item.type) == -1) {
                activeTypes.push(item.type);
            }
        }
        else {
            activeTypes.splice(activeTypes.indexOf(item.type), 1);
        }
    }, this);
    return intersections;
}