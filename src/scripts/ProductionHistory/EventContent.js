var EventContent = function(type, event, database){
    this.type = type;
    this.event = event;
    this.database = database;
}
EventContent.prototype.get = function(){
    var self = this;
    if(this.type == 'order'){
        if(this.event.source ){
            return '#' + this.event.source.id;
        }
        else{
            return '#' + this.event.id;
        }        
    }
    else if(this.type == 'orderbatch'){
        if(this.event.source && this.event.source.order){
            return 'order#' + (this.event.source.order && this.event.source.order.id);
        }
        else{
            return 'order#' + (this.event.order && this.event.order.id);
        }
    }
    else if(this.type == 'stop'){
        var dtType = (this.event.source && this.event.source.type) || this.event.type;
        if(dtType=='range'){dtType=null;}
        return (dtType ? (this.database.downtimeTypes().find(function(x){return x.id == dtType; }).name) : 'not coded');
    }
    else if(this.type == 'shift'){
        if(this.event.changeType || this.event.source.changeType){
            var changeType = this.event.changeType || this.event.source.changeType;
            return this.database.teams().filter(function(x){return x.value == changeType;})[0]['key'];
        }
        else{
            'unknown';
        }        
    }
    else if(this.type == 'putime'){
        if(this.event.source && this.event.source.order){
            return 'order#' + this.event.source.order.id + ':' + this.event.source.amount;
        }
        else{
            return 'order#' + (this.event.order && this.event.order.id) + ':' + this.event.amount;
        }        
    }
    return '???';
}