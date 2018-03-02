var SortedEventCollection = function (events, predicate) {
    this.events = events.slice();
    this.predicate = predicate;
}
SortedEventCollection.prototype.get = function () {
    var sortedCollection = [];
    while (this.events.length > 0) {
        sortedCollection.push(
            this.events.splice(this.next(), 1)[0]
        );
    }
    return sortedCollection;
}
SortedEventCollection.prototype.next = function () {
    var index = 0;
    for (var i = 1; i < this.events.length; i++) {
        if (this.predicate(this.events[i], this.events[index])) {
            index = i;
        }
    }
    return index;
}