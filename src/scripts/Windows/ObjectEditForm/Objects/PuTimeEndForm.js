var PuTimeEndForm = function(info, database, prodplace){
    this.prodplace = prodplace;
    this.info = info;
    this.database = database;
}

PuTimeEndForm.prototype = Object.create(BaseForm.prototype);

PuTimeEndForm.prototype.ordersOnOs = function(){
    return this.database.ordersOnOs(this.prodplace.operatorstartion.id).map(function(o){
        return {key : o.id, value: o.id};
    });
}

PuTimeEndForm.prototype.show = function(container){
    this.container = container;
    this.removeAllProperties(container);
    var self = this;
    this.showProperty(
        'amount', 
        this.info.source.amount,
        function(item, newValue){
            self.info.source.amount = parsefloat(newValue);
        },
        'number'
    ); 
    this.showProperty(
        "order",
        (this.info && this.info.source.order && this.info.source.order.id) || '???',
        function(item, newValue){
            var order = self.database.order(newValue);
            self.info.source.order = order;
            self.info.orderId = order.id;
            window.timeline.timeLine.itemsData.update(self.info)
        },
        'select',
        this.ordersOnOs()
    );
    this.showDateProperty(
        "time",
        this.info.start,
        function(item, newValue){
            self.info.source.time = newValue;
            self.info.start = newValue;
            window.timeline.timeLine.itemsData.update(self.info)
        }
    );   
}
if(window.editforms==null){
    window.editforms = {};
}

window.editforms['putimeend'] = PuTimeEndForm;
window.editforms['putimestart'] = PuTimeEndForm;
window.editforms['putimescrapped'] = PuTimeEndForm;