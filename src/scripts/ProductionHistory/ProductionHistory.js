var ProductionHistory = function (content) {
    this.content = content;
};
ProductionHistory.prototype.forEach = function (callback) {
    this.get().forEach(callback);
}
ProductionHistory.prototype.get = function () {
    return (this.items = this.items || this.buildItems(this.content));
}
ProductionHistory.prototype.buildItems = function (content) {
    var entries = [];
    entries = entries.concat(this.orders = buildOrders(content));
    entries = entries.concat(this.orderBatches = buildOrderBatches(content));
    entries = entries.concat(this.stops = buildStops(content));
    entries = entries.concat(this.shifts = buildShifts(content));
    entries = entries.concat(this.units = buildProducedUnits(content));
    return entries;
}
ProductionHistory.prototype.getOrderBatches = function () {
    var orderBatches = [];
    if (this.orderBatches) {
        this.orderBatches.forEach(function (orderBatch) {
            orderBatches.push({
                start: new Date(Date.parse(orderBatch.start)),
                end: new Date(Date.parse(orderBatch.end))
            });
        });
    }
    return orderBatches;
}
ProductionHistory.prototype.getStops = function () {
   return (this.stops = this.stops || buildStops(this.content));    
}
ProductionHistory.prototype.getFilteredStops = function (predicate) {
    var stops = [];
    this.getStops().forEach(function (stop) {
        if (predicate(stop)) {
            stops.push({
                start: new Date(Date.parse(stop.start)),
                end: new Date(Date.parse(stop.end))
            });
        }
    });
    return stops;
}
ProductionHistory.prototype.getPlannedDowntimeEntries = function () {
    return this.getFilteredStops(function (stop) {
        return stop.tags.losstype == "1";
    });
}
ProductionHistory.prototype.getAvailabilityLossEntries = function () {
    return this.getFilteredStops(function (stop) {
        return stop.tags.losstype == "2" || stop.tags.losstype == null;
    });
}
ProductionHistory.prototype.getShifts = function (filter) {
    var shifts = [];
    if (this.shifts) {
        this.shifts.forEach(function (shift) {
            shifts.push({
                start: new Date(Date.parse(shift.start)),
                end: new Date(Date.parse(shift.end))
            });
        });
    }
    return shifts;
}

function getTypeProperty(content, id, field) {
    if (content != null && content["dttypes"] != null) {
        for (var i = 0; i < content["dttypes"].length; i++) {
            if (content["dttypes"][i].id == id) {
                return content["dttypes"][i][field];
            }
        }
    }
    return "unknown";
}
function buildOrders(content) {
    var orders = [];
    getOrders(content).forEach(function (order, index, array) {
        orders.push({
            id: order.id,
            content: "order",
            title: "<b>Order_Id:</b> " + order.id + "<br/><b>Start:</b> " + order.start + "<br/><b>End:</b> " + order.end + "<br/><b>Duration: </b>" + (Date.parse(order.end) - Date.parse(order.start)) / 1000 + " <b>s</b>",
            start: order.start,
            end: order.end == null ? content.now : order.end,
            group: "S" + order.site.id
            + "D" + order.department.id
            + "O" + order.operatorstation.id
            + "Orders",
            tags: {
                orderNumber: 'test',
                articleNumber: order.articleNumber,
                orderId: order.id
            },
            className: 'order',
            operatorStationId: order.operatorstation.id,
            source:order
        });
    });
    return orders;
};
function buildOrderBatches(content) {
    var orderBatches = [];
    getOrderBatches(content).forEach(function (orderBatch, index, array) {
        orderBatches.push({
            id: orderBatch.order.id + '_' + orderBatch.id,
            title: "<b>Order_Id:</b> " + orderBatch.order.id + "<br/><b>Start:</b> " + orderBatch.start + "<br/><b>End:</b> " + orderBatch.end + "<br/><b>Duration: </b>" + (Date.parse(orderBatch.end) - Date.parse(orderBatch.start)) / 1000 + " <b>s</b>",
            content: "orderbatch",
            start: orderBatch.start,
            end: orderBatch.end == null ? content.now : orderBatch.end,
            group: "S" + orderBatch.site.id
            + "D" + orderBatch.department.id
            + "O" + orderBatch.operatorstation.id
            + "OrderBatches",
            tags: {
                orderId: orderBatch.order.id,
                orderNumber: 'test',
                articleNumber: orderBatch.order.articleNumber
            },
            className: 'orderbatch',
            operatorStationId: orderBatch.operatorstation.id,
            source: orderBatch
        });
    });
    return orderBatches;
}
function buildStops(content) {
    var stops = [];
    getStops(content).forEach(function (stop, index, array) {
        var tags = {
            id: stop.id
        }
        if (stop.type != null) {
            tags['type'] = '[id=' + stop.type + '] ' + getTypeProperty(content, stop.type, 'name');
            tags['group'] = '[id=' + getTypeProperty(content, stop.type, 'group') + ']';
            tags['losstype'] = getTypeProperty(content, stop.type, 'loss');
        }
        else {
            tags['type'] = 'uncoded';
            tags['group'] = 'uncoded';
            tags['losstype'] = null;
        }
        stops.push({
            id: "stop_" + stop.id,
            content: "[" + stop.from + "]  -  [" + stop.to + "] " + (stop.dttype == null ? "uncoded" : stop.dttype.name),
            title: tooltip({
                "loss": (stop.type == null ? "uncoded" : (getTypeProperty(content, stop.type, 'loss').toString())),
                "type": (stop.type == null ? "uncoded" : ('[id=' + stop.type + '] ' + getTypeProperty(content, stop.type, 'name'))),
                "group": (stop.type == null ? "uncoded" : ('[id=' + getTypeProperty(content, stop.type, 'group') + ']')),
                "Start": stop.from,
                "End": stop.to,
                "Duration": (Date.parse(stop.to) - Date.parse(stop.from)) / 1000 + " <b>s</b>"               
            }),
            source : stop,
            start: stop.from,
            end: stop.to,
            group: "S" + stop.site.id
            + "D" + stop.department.id
            + "O" + stop.operatorstation.id
            + "P" + stop.prodplace.id
            + "Stops",
            tags: tags,
            className: 'stop',
            duration: (Date.parse(stop.to) - Date.parse(stop.from)) / 1000
        });
    });
    return stops;
}
function buildShifts(content) {
    var shifts = [];
    getShiftPeriods(content).forEach(function (shift, index, array) {
        shifts.push({
            id: shift.operatorstation.id + "_" + shift.start,
            title: "<b>" + (shift.changeType > 0 ? ("Team_" + shift.changeType) : "Not plan prod") + "</b><br/><b>Start:</b> " + shift.start + "<br/><b>End:</b> " + shift.end + "<br/><b>Duration: </b>" + (Date.parse(shift.end) - Date.parse(shift.end) / 1000) + " <b>s</b>",
            content: ((shift.changeType > 0) ? ("Team_" + shift.changeType) : "Not plan prod"),
            start: shift.start,
            end: shift.end,
            group: "S" + shift.site.id
            + "D" + shift.department.id
            + "O" + shift.operatorstation.id
            + "Shifts",
            tags: {
                name: getTeamName(content, shift.changeType)
            },
            source:shift,
            className: 'shift',
            duration: (Date.parse(shift.end) - Date.parse(shift.start)) / 1000
        });
    });
    return shifts;
}
function getTeamName(content, number) {
    if (content != null && content.teams != null) {
        for (var i = 0; i < content.teams.length; i++) {
            if (content.teams[i].number == number) {
                return content.teams[i].name;
            }
        }
        return 'unknown';
    }
    else {
        return "unknown";
    }
}
function buildProducedUnits(content) {
    var units = [];
    getProducedUnits(content).forEach(function (unit, index, array) {
        units.push({
            id: unit.order.id + '_' + unit.type + "_" + unit.time,
            title: "<b>Order_Id:</b> " + unit.order.id + "<br/><b>Time:</b> " + unit.time,
            content: "Amount: " + unit.amount.toString(),
            start: unit.time,
            end: unit.time,
            group: "S" + unit.site.id
            + "D" + unit.department.id
            + "O" + unit.operatorstation.id
            + "Units" + unit.type,
            type: "point",
            eventType: unit.type,
            amount: unit.amount,
            tags: {
                orderId: 123,
                orderNumber: 'test',
                articleNumber: 'ddss'
            }
        });
    });
    return units;
}

function tooltip(tags) {
    var result = "<table>";
    if (tags != null) {
        for (var tag in tags) {
            result += '<tr><td>' + tag + '</td><td>' + ": <b>" + tags[tag] + '</b></td></tr>';
        }
    }
    result += '</table>';
    return result;
}
function format(value, length) {
    var x = value;
    for (var i = value.length; i < length; i++) {
        x += '_';
    }
    return x;
}