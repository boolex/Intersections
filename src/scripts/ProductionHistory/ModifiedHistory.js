var ModifiedHistory = function(prodplace, dataset){
    this.prodplace=prodplace;
    this.dataset = dataset;
}

ModifiedHistory.prototype.JSON = function(){
    var result = {};
    for(var key in this.dataset._data){
        if(this.dataset._data.hasOwnProperty(key)){
            result = this.add(result, this.dataset._data[key].className, this.dataset._data[key]);
        }
    }
    return result;
}
ModifiedHistory.prototype.add = function(result, type, item){
    if(type == 'orderbatch'){
        return this.addOrderBatch(result, item);
    }
    else if(type == 'order'){
        return this.addOrder(result, item);
    }
    else if(type == 'stop'){
        return this.addStop(result, item);
    }
    else if(type == 'shift'){
        return this.addShift(result, item);
    }
    else if(item.type == 'range'){       
        var newItem = JSON.parse(JSON.stringify(item));
        newItem.type = ({'orderbatches':'orderbatch', 'orders':'order', 'shifts':'shift', 'stops':'stop'})[item.group];
        newItem.start = item.start.yyyymmddhhmmss();
        newItem.end = item.end.yyyymmddhhmmss();
       // newItem.className = 'shift';
        newItem.source = {
            changeType : 1,
            start : item.start.yyyymmddhhmmss(),
            end : item.end.yyyymmddhhmmss(),
            prodplace:this.prodplace,
            operatorstation :this.prodplace.operatorstartion 
        };
        return this.add(result, newItem.type, newItem);
    }
    throw 'Unknown type of event';
}
ModifiedHistory.prototype.addOrderBatch = function(result , item){
    if(!result.orderbatches){ result.orderbatches = [];}
    result.orderbatches.push(this.normalizeOrderBatch(item));
    return result;
}
ModifiedHistory.prototype.normalizeOrderBatch = function(item){
    var orderbatch = item.source;
    if(typeof item.start != 'string'){
        orderbatch.start = item.start.yyyymmddhhmmss();
    }
    if(typeof item.end != 'string'){
        orderbatch.end = item.end.yyyymmddhhmmss();
    }
    return orderbatch;
}
ModifiedHistory.prototype.addOrder = function(result , item){
    if(!result.orders){ result.orders = [];}
    result.orders.push(this.normalizeOrder(item));
    return result;
}
ModifiedHistory.prototype.normalizeOrder = function(item){
    var order = item.source;
    if(typeof item.start != 'string'){
        order.start = item.start.yyyymmddhhmmss();
    }
    if(typeof item.end != 'string'){
        order.end = item.end.yyyymmddhhmmss();
    }
    return order;
}
ModifiedHistory.prototype.addStop = function(result , item){
    if(!result.stops){ result.stops = [];}
    result.stops.push(this.normalizeStop(item));
    return result;
}
ModifiedHistory.prototype.normalizeStop = function(item){
    var stop = item.source;
    if(typeof item.start != 'string'){
        stop.from = item.start.yyyymmddhhmmss();
    }
    if(typeof item.end != 'string'){
        stop.to = item.end.yyyymmddhhmmss();
    }
    return stop;
}
ModifiedHistory.prototype.addShift = function(result , item){
    if(!result.shifts){ result.shifts = [];}
    result.shifts.push(this.normalizeShift(item));
    return result;
}
ModifiedHistory.prototype.normalizeShift = function(item){
    var shift = item.source;
    if(typeof item.start != 'string'){
        shift.start = item.start.yyyymmddhhmmss();
    }
    if(typeof item.end != 'string'){
        shift.end = item.end.yyyymmddhhmmss();
    }
    return shift;
}
