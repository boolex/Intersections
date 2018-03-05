var TotalProducedAmount = function (producedAmounts, startedAmounts) {
    this.producedAmounts = producedAmounts;
    this.startedAmounts = startedAmounts;
}
TotalProducedAmount.prototype.compute = function () {
    var amount = 0;
    Object.values(this.orders()).forEach(function (unit) {
        amount +=
            new TotalProducedAmountOnOrder(
                unit.orderId,
                unit.producedAmounts,
                unit.startedAmounts
            ).compute();
    }, this);
    return amount;
}
TotalProducedAmount.prototype.orders = function () {
    var units = {};
    if (this.producedAmounts) {
        this.producedAmounts.forEach(function (unit) {
            if (units[unit.orderId] == null) {
                units[unit.orderId] = {
                    orderId: unit.orderId,
                    producedAmounts: [],
                    startedAmounts: []
                }
            }
            units[unit.orderId].producedAmounts.push(unit)
        });
    }
    if (this.startedAmounts) {
        this.startedAmounts.forEach(function (unit) {
            if (units[unit.orderId] == null) {
                units[unit.orderId] = {
                    orderId: unit.orderId,
                    producedAmounts: [],
                    startedAmounts: []
                }
            }
            units[unit.orderId].startedAmounts.push(unit)
        });
    }
    return units;
}