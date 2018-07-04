var StopForm = function(stopInfo, database){
    this.info = copy(stopInfo);
    this.stopInfo = database.stops().find(function(x){return x.id == stopInfo.source.id;});
    this.database = database;
}

StopForm.prototype = Object.create(BaseForm.prototype);

StopForm.prototype.downtimeTypes = function(){
    return [{key:'uncoded', value:0}].concat(this.database.downtimeTypes().map(function(type){
        return {
            key : ['id=', type.id, ';loss:', type.loss, ':', type.name, ';group:', type.group, ].join(''), 
            value : type.id
        };
    }));
}
StopForm.prototype.show = function(container){
    this.container = container;
    this.removeAllProperties(container);
    var self = this;
    this.showProperty(
        'id', 
        this.info.source.id,
        function(item, newValue){
            self.info.source.id = parseInt(newValue);
        },
        'number'
    );
    this.showProperty(
        'Type', 
        this.info.source.type,
        function(item, newValue){
             var typeId = parseInt(newValue);
             if(typeId == 0){
                typeId = null;
             }
             if(!self.info.source){
                self.info.source = {}
            }
             if(typeId > 0){
                var type = self.database.downtimeTypes().find(function(x){return x.id == typeId;});             
                self.info['content'] = type.name;
                self.info.source.type = typeId;
             }
             else{
                self.info['content'] = 'uncoded';
                self.info.source.type = null;
             }
            // item.tags.changeNumber = teamNumber;
            // item.tags.name = name;
           
            
             window.timeline.timeLine.itemsData.update(self.info)
        },
        "select",
        this.downtimeTypes()
    );   
    this.showDateProperty(
        "from",
        this.info.from || this.info.start,
        function(item, newValue){
            self.info.source.from = newValue;
            self.info.start = newValue;
            window.timeline.timeLine.itemsData.update(self.info)
        }
    );
    this.showDateProperty(
        "to",
        this.info.to || this.info.end,
        function(item, newValue){
            self.info.source.to = newValue;
            self.info.end = newValue;
            window.timeline.timeLine.itemsData.update(self.info)
        }
    );
}
if(window.editforms==null){
    window.editforms = {};
}

window.editforms['stop'] = StopForm;