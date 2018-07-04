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
    else if(type == 'putimeend'){
        return this.addPuTimeEnd(result, item);
    }
    else if(type == 'putimestart'){
        return this.addPuTimeStart(result, item);
    }
    else if(type == 'putimescrapped'){
        return this.addPuTimeScrapped(result, item);
    }    
    else if(item.type == 'range'){       
        var newItem = JSON.parse(JSON.stringify(item));
        newItem.type = ({'orderbatches':'orderbatch', 'orders':'order', 'shifts':'shift', 'stops':'stop'})[item.group];
        newItem.start = item.start.yyyymmddhhmmss();
        newItem.end = item.end.yyyymmddhhmmss();
        if(newItem.type == 'shift'){
            newItem.source = {
                changeType : 1,
                start : item.start.yyyymmddhhmmss(),
                end : item.end.yyyymmddhhmmss(),
                prodplace:this.prodplace,
                operatorstation :this.prodplace.operatorstartion 
            }
        }
        else if(newItem.type == 'stop'){
            newItem.source = {
                from : item.start.yyyymmddhhmmss(),
                to : item.end.yyyymmddhhmmss(),
                prodplace:this.prodplace,
                operatorstation :this.prodplace.operatorstartion,
                type: 2
            }
        }
        else if(newItem.type == 'order'){
            newItem.source = {
                start : item.start.yyyymmddhhmmss(),
                end : item.end.yyyymmddhhmmss(),
                prodplace:this.prodplace,
                operatorstation :this.prodplace.operatorstartion
            }
        }
        else if(newItem.type == 'orderbatch'){
            newItem.source = {
                start : item.start.yyyymmddhhmmss(),
                end : item.end.yyyymmddhhmmss(),
                prodplace:this.prodplace,
                operatorstation :this.prodplace.operatorstartion
            }
        }
        
        return this.add(result, newItem.type, newItem);
    }
    else if(item.group == 'putimeend' || item.group == 'putimestart' || item.group == 'putimescrapped'){
        var newItem = JSON.parse(JSON.stringify(item));
        newItem.source = {
            time : item.start.yyyymmddhhmmss(),
            prodplace: this.prodplace,
            operatorstation : this.prodplace.operatorstartion
        }
        return this.add(result, newItem.group, newItem);
    }
    else{
        throw 'Unknown type of event';
    }
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
ModifiedHistory.prototype.addPuTimeEnd= function(result , item){
    if(!result.putimeends){ result.putimeends = [];}
    result.putimeends.push(this.normalizePuTimeEnd(item));
    return result;
}
ModifiedHistory.prototype.normalizePuTimeEnd = function(item){
    var putimeend = item.source;
    return putimeend;
}
ModifiedHistory.prototype.addPuTimeStart= function(result , item){
    if(!result.putimestarts){ result.putimestarts = [];}
    result.putimestarts.push(this.normalizePuTimeStart(item));
    return result;
}
ModifiedHistory.prototype.normalizePuTimeStart = function(item){
    var putimestart = item.source;
    return putimestart;
}
ModifiedHistory.prototype.addPuTimeScrapped= function(result , item){
    if(!result.putimescrappeds){ result.putimescrappeds = [];}
    result.putimescrappeds.push(this.normalizePuTimeScrapped(item));
    return result;
}
ModifiedHistory.prototype.normalizePuTimeScrapped = function(item){
    var putimescrapped = item.source;
    return putimescrapped;
}
