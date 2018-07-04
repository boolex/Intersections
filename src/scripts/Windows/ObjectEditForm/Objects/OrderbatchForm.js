var OrderbatchForm = function(orderbatchInfo, database, prodplace){
    this.prodplace = prodplace;
    this.orderbatchInfo = orderbatchInfo;
    this.database = database;
}

OrderbatchForm.prototype = Object.create(BaseForm.prototype);

OrderbatchForm.prototype.ordersOnOs = function(){
    return this.database.ordersOnOs(this.prodplace.operatorstartion.id).map(function(o){
        return {key : o.id, value: o.id};
    });
}

OrderbatchForm.prototype.show = function(container){
    this.container = container;
    this.removeAllProperties(container);
    var self = this;
    this.showProperty(
        'id', 
        this.orderbatchInfo.source.id,
        function(item, newValue){
            self.orderbatchInfo.source.id = parseInt(newValue);
        },
        'number'
    ); 
    this.showProperty(
        "order",
        (this.orderbatchInfo && this.orderbatchInfo.source.order && this.orderbatchInfo.source.order.id) || '???',
        function(item, newValue){
            var order = self.database.order(newValue);
            self.orderbatchInfo.source.order = order;
            self.orderbatchInfo.orderId = order.id;
            window.timeline.timeLine.itemsData.update(self.orderbatchInfo)
        },
        'select',
        this.ordersOnOs()
    );
    this.showDateProperty(
        "from",
        this.orderbatchInfo.start,
        function(item, newValue){
            self.orderbatchInfo.source.start = newValue;
            self.orderbatchInfo.start = newValue;
            window.timeline.timeLine.itemsData.update(self.orderbatchInfo)
        }
    );
    this.showDateProperty(
        "to",
        this.orderbatchInfo.end,
        function(item, newValue){
            self.orderbatchInfo.source.end = newValue;
            self.orderbatchInfo.end = newValue;
            window.timeline.timeLine.itemsData.update(self.orderbatchInfo)
        }
    );
}
if(window.editforms==null){
    window.editforms = {};
}

window.editforms['orderbatch'] = OrderbatchForm;