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
            var name = self.teams().filter(function(x){return x.value == teamNumber;})[0]['key'];
            item['content'] = name;
            item.tags.changeNumber = teamNumber;
            item.tags.name = name;
            item.source.changeType = teamNumber;
            window.timeline.timeLine.itemsData.update(item)
        },
        "select",
        this.teams()
    );
}
if(window.editforms==null){
    window.editforms = {};
}

window.editforms['shift'] = ShiftForm;

