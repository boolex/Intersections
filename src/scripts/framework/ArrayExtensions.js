Array.prototype.filter = function (predicate, selector) {
    var f = [];
    this.forEach(function (item, index, array) {
        if (predicate(item, index, array)) {
            if (selector) {
                f.push(selector(item));
            } else {
                f.push(item);
            }
        }
    });
    return f;
}