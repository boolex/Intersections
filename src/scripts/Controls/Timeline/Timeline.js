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
    this.timeLine = new vis.Timeline(
        container,
        new vis.DataSet(this.history.get()),
        this.timeLineOptions(this, onReady)        
    );
    if (this.now != null) {
        this.timeLine.addCustomTime(this.now, "now");
    }

    this.timeLine.setGroups(new Filter(this.history).get());   

    return this;
}
Timeline.prototype.registerSystemEvents = function(timeline, logger){
    
    timeline.itemsData.on('*', function (event, properties) {
        logger.system("event : " + toString(event) + "; Properties : " + toString(properties));
      });     
}
Timeline.prototype.timeLineOptions = function(timeline, onReady){
    return {
        showTooltips: true,
        editable: true,
        onUpdate: function(item, callback){ timeline.itemUpdated(item, callback, timeline.logger); },
        onMove: function(item, callback){ timeline.itemMoved(item, callback, timeline.logger); },
        onInitialDrawComplete: onReady      
    };
}
Timeline.prototype.itemUpdated = function(item, callback, logger){
    logger.log('item updated');
    callback(item);
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
Timeline.dependencies = [];
Timeline.dependencies.push("vis.TimeLine");
Timeline.dependencies.push("vis.DataSet");
Timeline.dependencies.push("Filter");

