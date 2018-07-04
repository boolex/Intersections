/*
    events:
        eventCreated
        eventSelected
*/
var Timeline = function (history, groups, now, logger) {
    this.history = history;
    this.groups = groups;
    this.now = now;
    this.logger = logger;
}
Timeline.prototype.draw = function (container, onReady) {
   this.visualize(container, onReady);
   this.registerEventHandlers();
   this.registerSystemEvents(this.timeLine, this.logger);
   return this;
}
Timeline.prototype.visualize=function(container, onReady){
    container.innerHTML = "";
    var items = this.history.Items();
    var emptyTimeline = items.length == 0;
    this.timeLine = new vis.Timeline(
        container,
        new vis.DataSet(this.history.Items()),
        this.timeLineOptions(this, onReady, emptyTimeline)        
    );
    if (this.now != null) {
        this.timeLine.addCustomTime(this.now, "now");
    }

    /*
    if(items.length == 0){
        var groups = new vis.DataSet();    
        groups.add({id:'orders',content:'orders'});
        groups.add({id:'orderbatches',content:'orderbatches'});
        groups.add({id:'shifts',content:'shifts'})
        groups.add({id:'stops',content:'stops'})
        this.timeLine.setGroups(groups);   
    }
    else{
        this.timeLine.setGroups(new Filter(this.history).get());   
    }*/
    var groups = new vis.DataSet();    
    groups.add({id:'orders',content:'orders'});
    groups.add({id:'orderbatches',content:'orderbatches'});
    groups.add({id:'shifts',content:'shifts'});
    groups.add({id:'stops',content:'stops'});
    groups.add({id:'putimeend',content:'Amount Produced'});
    groups.add({id:'putimestart',content:'Amount Started'});
    groups.add({id:'putimescrapped',content:'Amount Scrapped'});
    this.timeLine.setGroups(groups);   
 
    return this;
}
Timeline.prototype.registerSystemEvents = function(timeline, logger){    
    timeline.itemsData.on('*', function (event, properties) {
        logger.system("event : " + toString(event) + "; Properties : " + toString(properties));
    });     
}
Timeline.prototype.itemCreated = function(handler){
    (this.createdHandlers = this.createdHandlers || []).push(handler);
}
Timeline.prototype.timeLineOptions = function(timeline, onReady,emptyTimeline){
    var options = {
        showTooltips: true,
        editable: true,
        onUpdate: function(item, callback){ timeline.itemUpdated(item, callback, timeline.logger); },
        onMove: function(item, callback){ timeline.itemMoved(item, callback, timeline.logger); },
        onInitialDrawComplete: onReady,
        onAdd : function(item, callback){
            timeline.itemAdded(item, callback, timeline.logger);
        }
    };
    if(emptyTimeline){
        options['start'] = new Date('2017-05-23');
        options['end'] = new Date('2017-05-24');
    }
    return options;
}
Timeline.prototype.itemAdded = function(item, callback, logger){
    logger.log('item added');
    callback(item);
    window.dispatchEvent(new CustomEvent('eventCreated', { 'detail': item }));  
}
Timeline.prototype.itemUpdated = function(item, callback, logger){
    logger.log('item updated');
    callback(item);
   // window.dispatchEvent(new CustomEvent('eventCreated', { 'detail': item })); 
}
Timeline.prototype.itemMoved = function(item, callback, logger){
    logger.log('item moved');
    callback(item);
}
Timeline.prototype.registerEventHandlers = function(){
    //http://visjs.org/docs/timeline/#Events
      (function(timeline){
        timeline.timeLine.on('doubleClick', function (properties) {
            timeline.logger.log('doubleClick');
        });
      })(this);
      (function(timeline){
        timeline.timeLine.on('click', function (properties) {
            timeline.logger.log('click');
            var item = window.timeline.timeLine.itemsData._data[properties.item];
            window.dispatchEvent(new CustomEvent('eventSelected', { 'detail': item }));            
        });
      })(this);
}
Timeline.prototype.updateGroups = function (history, groups) {
    this.history = history;
    if (groups != null) {
        this.timeLine.setData({
            groups: new Filter(history.get()).get(),
            items: history.get()
        });
    } else {
        this.timeLine.setData({
            items: history.get()
        });
    }
}
Timeline.prototype.getGroups = function (items) {
    var itemGroups = [];
    items.forEach(function (item) {
        if (itemGroups.indexOf(item.group) == -1) {
            itemGroups.push(item.group);
        }
    });

    var groups = [];
    itemGroups.forEach(function (group, index, array) {
        groups.push({ id: group, content: group, subgroupStack: true });
    });

    return groups;
}

Timeline.prototype.template = function(){
    return [
        {
            className : 'order',
            content : 'order',
            group : 'orders'
        },
        {
            className : 'orderbatch',
            content : 'orderbatch',
            group : 'orderbatches'
        },
        {
            className : 'shift',
            content : 'shift',
            group : 'shifts'
        },
        {
            className : 'stop',
            content : 'stop',
            group : 'stops'
        }
    ];
}
Timeline.dependencies = [];
Timeline.dependencies.push("vis.TimeLine");
Timeline.dependencies.push("vis.DataSet");
Timeline.dependencies.push("Filter");

