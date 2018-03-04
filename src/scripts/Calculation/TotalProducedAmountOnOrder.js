var TotalProducedAmountOnOrder = function (order, producedAmounts, startedAmounts) {
    this.order = order;
    this.producedAmounts = producedAmounts;
    this.startedAmounts = startedAmounts;
}

TotalProducedAmountOnOrder.prototype.compute = function () {
    return this.startedAmount() > this.producedAmount() ?
        this.startedAmount() : this.producedAmount();
}

TotalProducedAmountOnOrder.prototype.startedAmount = function () {
    if (this.pra === undefined) {
        this.pra = 0;
        if (this.producedAmounts != null) {
            this.producedAmounts.forEach(function (unit) {
                this.pra += unit.amount;
            }, this);
        }
    }
    return this.pra;
}
TotalProducedAmountOnOrder.prototype.producedAmount = function () {
    if (this.sta === undefined) {
        this.sta = 0;
        if (this.startedAmounts != null) {
            this.startedAmounts.forEach(function (unit) {
                this.sta += unit.amount;
            }, this);
        }
    }
    return this.sta;
}