var ProdplaceForm = function(prodplaceInfo, database){
    this.prodplaceInfo = database.prodplaces().filter(function(x){return x.id == prodplaceInfo.id;})[0];
    this.database = database;
}
ProdplaceForm.prototype = Object.create(BaseForm.prototype);

ProdplaceForm.prototype.show = function(container){
    this.container = container;
    this.removeAllProperties(container);
    var self = this;
    this.showProperty(
        'id', 
        this.prodplaceInfo.id,
        function(item, newValue){
            self.prodplaceInfo.id = parseInt(newValue);
        },
        'number'
    );
    this.showProperty(
        'name', 
        this.prodplaceInfo.name,
        function(item, newValue){
            self.prodplaceInfo.name = newValue;
        }
    );
    this.showProperty(
        'sortorderno', 
        this.prodplaceInfo.sortorderno || 0,
        function(item, newValue){
            self.prodplaceInfo.sortorderno = parseInt(newValue);
        },
        'number'
    );
    this.showProperty(
        'OEE Goal', 
        this.prodplaceInfo.oeeGoal || 80,
        function(item, newValue){
            self.prodplaceInfo.oeeGoal = parseFloat(newValue);
        },
        'number'
    );
    this.showProperty(
        'Availability Goal', 
        this.prodplaceInfo.oeeGoal || 80,
        function(item, newValue){
            self.prodplaceInfo.oeeGoal = parseFloat(newValue);
        },
        'number'
    );
}
if(window.editforms==null){
    window.editforms = {};
}

window.editforms['prodplace'] = ProdplaceForm;