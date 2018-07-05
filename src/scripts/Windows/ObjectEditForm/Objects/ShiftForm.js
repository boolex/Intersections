var ShiftForm = function(shiftInfo, database){
    this.shiftInfo = shiftInfo;
    this.database = database;
}
ShiftForm.prototype = Object.create(BaseForm.prototype);
ShiftForm.prototype.teams =  function(){
    return this.database.teams();
}
ShiftForm.prototype.show = function(container){
    this.container = container;
    this.removeAllProperties(container);
    var self = this;
    this.showProperty(
        'name', 
        this.shiftInfo.source.changeType,
        function(item, newValue){
            var teamNumber = parseInt(newValue);
            /*var name = self.teams().filter(function(x){return x.value == teamNumber;})[0]['key'];
            item['content'] = name;
           
            item.tags.name = name;*/
            if(!item.tags){
                item.tags = {};
            }
            item.tags.changeNumber = teamNumber;           
            item.source.changeType = teamNumber;

            item.content = new EventContent('shift', item, self.database).get();
            window.timeline.timeLine.itemsData.update(item);
        },
        "select",
        this.teams()
    );
    this.showDateProperty(
        "from",
        this.shiftInfo.start,
        function(item, newValue){
            newValue = normalizeDateTime(newValue);
            self.shiftInfo.source.start = newValue;
            self.shiftInfo.start = newValue;

            self.shiftInfo.content = new EventContent('shift', self.shiftInfo, self.database).get();
            window.timeline.timeLine.itemsData.update(self.shiftInfo);
        }
    );
    this.showDateProperty(
        "to",
        this.shiftInfo.end,
        function(item, newValue){
            newValue = normalizeDateTime(newValue);
            
            self.shiftInfo.source.end = newValue;
            self.shiftInfo.end = newValue;
            self.shiftInfo.content = new EventContent('shift', self.shiftInfo, self.database).get();
            window.timeline.timeLine.itemsData.update(self.shiftInfo);
        }
    );
}
if(window.editforms==null){
    window.editforms = {};
}

window.editforms['shift'] = ShiftForm;

