var ProductionHistoryWithinPeriod = function (content, range) {
    ProductionHistory.apply(this, arguments);
    this.range = range;
}

ProductionHistoryWithinPeriod.prototype = Object.create(ProductionHistory.prototype);

ProductionHistoryWithinPeriod.prototype.get = function () {
    return (this.itemsLimitedByRange = this.itemsLimitedByRange || this.getItemsLimitedByRange());
}
ProductionHistoryWithinPeriod.prototype.getEvents = function () {
    return (this.itemsLimitedByRange = this.itemsLimitedByRange || this.getItemsLimitedByRange());
}
ProductionHistoryWithinPeriod.prototype.getItemsLimitedByRange = function () {
    var items = ProductionHistory.prototype.get.apply(this, arguments);
    var itemsLimitedByRange = [];
    var ctx = { from: this.range.from, to: this.range.to };
    var withinDateRange = function (fromStr, toStr) {
        var from = Date.parse(fromStr);
        var to = Date.parse(toStr);
        return (ctx == null || ctx.to == null || from <= ctx.to) && (ctx == null || ctx.from == null || to == null || ctx.from <= to);
    }
    var updateEvent = function (e) {
        var from = Date.parse(e.start || e.from);
        if (from < ctx.from) {
            if (e.from != null) {
                e.from = dateToString(ctx.from);
            }
            else {
                e.start = dateToString(ctx.from);
            }
        }
        var end = Date.parse(e.end || e.to);
        if (end > ctx.to) {
            if (e.to != null) {
                e.to = dateToString(ctx.to);
            } else {
                e.end = dateToString(ctx.to);
            }
        }
        return e;
    }
    items.forEach(function (item, index, array) {
        if (withinDateRange(item.start, item.end)) {
            item = updateEvent(item);
            itemsLimitedByRange.push(item);
        }
    });
    return itemsLimitedByRange;
}
ProductionHistoryWithinPeriod.prototype.getProducedAmounts = function () {
    return this.get().filter(
        function (item) {
            return 'PUTimeEnd' == item.eventType;
        },
        function (item) {
            return {
                orderId: item.tags.orderId,
                amount: item.amount,
                time: item.start
            };
        });
}
ProductionHistoryWithinPeriod.prototype.getStartedAmounts = function () {
    return this.get().filter(
        function (item) {
            return 'PUTimeStart' == item.eventType;
        },
        function (item) {
            return {
                orderId: item.tags.orderId,
                amount: item.amount,
                time: item.start
            };
        });
}
ProductionHistoryWithinPeriod.prototype.getScrappedAmounts = function () {
    return this.get().filter(
        function (item) {
            return 'PUTimeScrapped' == item.eventType;
        },
        function (item) {
            return {
                orderId: item.tags.orderId,
                amount: item.amount,
                time: item.start
            };
        });
}
