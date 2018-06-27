var OperatorStationForm = function(osInfo, database){
    this.osInfo = database.operatorstations().filter(function(x){return x.id == osInfo.id;})[0];
    this.database = database;
}
OperatorStationForm.prototype = Object.create(BaseForm.prototype);

OperatorStationForm.prototype.show = function(container){
    this.container = container;
    this.removeAllProperties(container);
    var self = this;
    this.showProperty(
        'id', 
        this.osInfo.id,
        function(item, newValue){
            self.osInfo.id = parseInt(newValue);
        },
        'number'
    );
    this.showProperty(
        'name', 
        this.osInfo.name,
        function(item, newValue){
            self.osInfo.name = newValue;
        }
    );
    this.showProperty(
        'sortorderno', 
        this.osInfo.sortorderno || 0,
        function(item, newValue){
            self.osInfo.sortorderno = parseInt(newValue);
        },
        'number'
    );
    this.showProperty(
        'Quality Goal', 
        this.osInfo.qualityGoal || 80,
        function(item, newValue){
            self.osInfo.qualityGoal = parseFloat(newValue);
        },
        'number'
    );
    this.showProperty(
        'Performance Goal', 
        this.osInfo.performanceGoal || 80,
        function(item, newValue){
            self.osInfo.performanceGoal = parseFloat(newValue);
        },
        'number'
    );
}
if(window.editforms==null){
    window.editforms = {};
}

window.editforms['operatorStation'] = OperatorStationForm;