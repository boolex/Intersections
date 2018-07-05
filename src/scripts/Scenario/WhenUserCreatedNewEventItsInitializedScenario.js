var WhenUserCreatedNewEventItsInitializedScenario = function(){
}
WhenUserCreatedNewEventItsInitializedScenario.prototype.register = function(app, logger){
    var database = app.database();
    window.addEventListener('eventCreated', function(data){
        if(data.detail){
            //data.detail.on(function(item, callback){ timeline.itemUpdated(item, callback, timeline.logger); });
            window.timeline.timeLine.itemsData.update(new ManualItem(data.detail.group, data.detail, app.database()).get());    
            
            // data.detail.on('click', function (properties) {
            //     window.timeline.logger.log('click');
            //     var item = window.timeline.timeLine.itemsData._data[properties.item];
            //     window.dispatchEvent(new CustomEvent('eventSelected', { 'detail': item }));            
            // });
        }
    });       
}

var ManualItem = function(type, props, database){
    this.type = type;
    this.item = props;
    this.database = database;
}
ManualItem.prototype.get = function(){
    this.initialize();
    return this.item;
}
ManualItem.prototype.content = function(){
    return new EventContent(this.itemType(this.type), this.item, this.database).get();
}
ManualItem.prototype.groupToClass = function(group){
    switch(group){
        case 'orders':
            return 'order';
        case 'orderbatches':
            return 'orderbatch';
        case 'stops':
            return 'stop';
        case 'shifts':
            return 'shift';
        case 'putimeend':
            return 'putimeend';
        case 'putimestart':
            return 'putimestart';
        case 'putimescrapped':
            return 'putimescrapped';
        default:
            return 'unknown';
    }    
}
ManualItem.prototype.itemType =function(group){
    switch(group){
        case 'orders':
            return 'order';
        case 'orderbatches':
            return 'orderbatch';
        case 'stops':
            return 'stop';
        case 'shifts':
            return 'shift';
        case 'putimeend':
            return 'putime';
        case 'putimestart':
            return 'putime';
        case 'putimescrapped':
            return 'putime';
        default:
            return 'unknown';
    }    
}
ManualItem.prototype.initialize = function(){
    this.item.className = this.groupToClass(this.type);
    var self = this;
    ({
        'order' : function(){ self.initializeOrder(); },
        'orderbatch' : function(){ self.initializeOrderbatch(); },
        'stop' : function(){ self.initializeStop(); },
        'shift' : function(){ self.initializeShift(); },
        'putimeend': function(){ self.initializePuTimeEnd(); },
        'putimestart': function(){ self.initializePuTimeStart(); },
        'putimescrapped': function(){ self.initializePuTimeScrapped(); },
        'unknown' : function(){throw {item:self.item, message:'Unknown item'};}     
    }[this.item.className])();
    this.item.content = this.content();    
}
ManualItem.prototype.initializeOrder = function(){
    var orderid = this.database.getId('order');
    this.item.source = {id : orderid};
}
ManualItem.prototype.initializeOrderbatch = function(){
    var orderbatchid = this.database.getId('orderbatch');
    this.item.source = {id : orderbatchid};
}
ManualItem.prototype.initializeStop = function(){
    this.item.source = {id:this.database.getId('stop')};
}
ManualItem.prototype.initializeShift = function(){
    this.item.source = {id:this.database.getId('shift')};
}
ManualItem.prototype.initializePuTimeEnd = function(){
    this.item.source = {
        time:this.item.start,
        amount:1,
        orderid:0
    };
}
ManualItem.prototype.initializePuTimeStart = function(){
    this.item.source = {
        time:this.item.start,
        amount:1,
        orderid:0
    };
}
ManualItem.prototype.initializePuTimeScrapped = function(){
    this.item.source = {
        time:this.item.start,
        amount:1,
        orderid:0
    };
}