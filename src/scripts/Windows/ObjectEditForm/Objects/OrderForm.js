var OrderForm = function(orderInfo, database){
    this.orderInfo = orderInfo;
    this.database = database;
}

OrderForm.prototype = Object.create(BaseForm.prototype);

OrderForm.prototype.show = function(container){
    this.container = container;
    this.removeAllProperties(container);
    var self = this;
    this.showProperty(
        'id', 
        this.orderInfo.source.id,
        function(item, newValue){
            self.orderInfo.source.id = parseInt(newValue);
            self.orderInfo.content = new EventContent('order', self.orderInfo, self.database).get();
            window.timeline.timeLine.itemsData.update(self.orderInfo)
        },
        'number'
    ); 
    this.showDateProperty(
        "from",
        this.orderInfo.start,
        function(item, newValue){
            newValue = normalizeDateTime(newValue);
            
            self.orderInfo.source.start = newValue;
            self.orderInfo.start = newValue;

            self.orderInfo.content = new EventContent('order', self.orderInfo, self.database).get();
            window.timeline.timeLine.itemsData.update(self.orderInfo)
        }
    );
    this.showDateProperty(
        "to",
        this.orderInfo.end,
        function(item, newValue){
            newValue = normalizeDateTime(newValue);

            self.orderInfo.source.end = newValue;
            self.orderInfo.end = newValue;

            self.orderInfo.content = new EventContent('order', self.orderInfo, self.database).get();
            window.timeline.timeLine.itemsData.update(self.orderInfo)
        }
    );
}
if(window.editforms==null){
    window.editforms = {};
}

window.editforms['order'] = OrderForm;