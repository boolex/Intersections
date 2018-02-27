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
    entries = entries.concat(buildOrders(content));
    entries = entries.concat(buildOrderBatches(content));
    entries = entries.concat(buildStops(content));
    entries = entries.concat(buildShifts(content));
    entries = entries.concat(buildProducedUnits(content));
    return entries;
}
function getTypeName(content, id) {
    if (content != null && content["dttypes"] != null) {
        for (var i = 0; i < content["dttypes"].length; i++) {
            if (content["dttypes"][i].id == id) {
                return content["dttypes"][i].name;
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
            end: order.end,
            group: "S" + order.site.id
            + "D" + order.department.id
            + "O" + order.operatorstation.id
            + "Orders",
            tags: {
                orderNumber: 'test',
                articleNumber: order.articleNumber
            },
            className: 'order'
        });
    });
    return orders;
};
function buildOrderBatches(content) {
    var orderBatches = [];
    getOrderBatches(content).forEach(function (orderBatch, index, array) {
        orderBatches.push({
            id: orderBatch.id,
            title: "<b>Order_Id:</b> " + orderBatch.order.id + "<br/><b>Start:</b> " + orderBatch.start + "<br/><b>End:</b> " + orderBatch.end + "<br/><b>Duration: </b>" + (Date.parse(orderBatch.end) - Date.parse(orderBatch.start)) / 1000 + " <b>s</b>",
            content: "orderbatch",
            start: orderBatch.start,
            end: orderBatch.end,
            group: "S" + orderBatch.site.id
            + "D" + orderBatch.department.id
            + "O" + orderBatch.operatorstation.id
            + "OrderBatches",
            tags: {
                orderId: 123,
                orderNumber: 'test',
                articleNumber: orderBatch.order.articleNumber
            },
            className: 'orderbatch'
        });
    });
    return orderBatches;
}
function buildStops(content) {
    var stops = [];
    getStops(content).forEach(function (stop, index, array) {
        stops.push({
            id: "stop_" + stop.id,
            content: "[" + stop.from + "]  -  [" + stop.to + "] " + (stop.dttype == null ? "uncoded" : stop.dttype.name),
            title: "<b>" + (stop.dttype == null ? "uncoded" : stop.dttype.name) + "</b><br/><b>Start:</b> " + stop.from + "<br/><b>End:</b> " + stop.to + "<br/><b>Duration: </b>" + (Date.parse(stop.to) - Date.parse(stop.from)) / 1000 + " <b>s</b>",
            start: stop.from,
            end: stop.to,
            group: "S" + stop.site.id
            + "D" + stop.department.id
            + "O" + stop.operatorstation.id
            + "P" + stop.prodplace.id
            + "Stops",
            tags: {
                type: getTypeName(content, stop.type)
            },
            className: 'stop'
        });
    });
    return stops;
}
function buildShifts(content) {
    var shifts = [];
    getShiftPeriods(content).forEach(function (shift, index, array) {
        shifts.push({
            id: "shift_" + shift.start,
            title: "<b>" + (shift.changeType > 0 ? ("Team_" + shift.changeType) : "Not plan prod") + "</b><br/><b>Start:</b> " + shift.start + "<br/><b>End:</b> " + shift.end + "<br/><b>Duration: </b>" + (Date.parse(shift.end) - Date.parse(shift.end) / 1000) + " <b>s</b>",
            content: ((shift.changeType > 0) ? ("Team_" + shift.changeType) : "Not plan prod"),
            start: shift.start,
            end: shift.end,
            group: "S" + shift.site.id
            + "D" + shift.department.id
            + "O" + shift.operatorstation.id
            + "Shifts",
            tags: {
                name : getTeamName(content,shift.changeType)
            },
            className: 'shift'
        });
    });
    return shifts;
}
function getTeamName(content, number){
	if(content!=null && content.teams!=null){
		for(var i = 0;i<content.teams.length;i++){
			if(content.teams[i].number == number){
				return content.teams[i].name;
			}
		}
		return 'unknown';
	}
	else{
		return "unknown";
	}
}
function buildProducedUnits(content) {
    var units = [];
    getProducedUnits(content).forEach(function (unit, index, array) {
        units.push({
            id: unit.type + "_" + unit.time,
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