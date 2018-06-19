var ModifiedHistory = function(dataset){
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
}
ModifiedHistory.prototype.addOrderBatch = function(result , item){
    if(!result.orderbatches){ result.orderbatches = [];}
    result.orderbatches.push(this.normalizeOrderBatch(item));
    return result;
}
ModifiedHistory.prototype.normalizeOrderBatch = function(item){
    return item.source;
}
ModifiedHistory.prototype.addOrder = function(result , item){
    if(!result.orders){ result.orders = [];}
    result.orders.push(this.normalizeOrder(item));
    return result;
}
ModifiedHistory.prototype.normalizeOrder = function(item){
    return item.source;
}
ModifiedHistory.prototype.addStop = function(result , item){
    if(!result.stops){ result.stops = [];}
    result.stops.push(this.normalizeStop(item));
    return result;
}
ModifiedHistory.prototype.normalizeStop = function(item){
    var stop = item.source;
    stop.from = item.start.yyyymmddhhmmss();
    stop.to = item.end.yyyymmddhhmmss();
    return stop;
}
ModifiedHistory.prototype.addShift = function(result , item){
    if(!result.shifts){ result.shifts = [];}
    result.shifts.push(this.normalizeShift(item));
    return result;
}
ModifiedHistory.prototype.normalizeShift = function(item){
    var shift = item.source;
    shift.start = item.start.yyyymmddhhmmss();
    shift.end = item.end.yyyymmddhhmmss();
    return shift;
}
