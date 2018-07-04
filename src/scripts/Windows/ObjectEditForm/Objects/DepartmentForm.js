var DepartmentForm = function(depInfo, database){
    this.info = database.departments().filter(function(x){return x.id == depInfo.id;})[0];
    this.database = database;
}
DepartmentForm.prototype = Object.create(BaseForm.prototype);

DepartmentForm.prototype.show = function(container){
    this.container = container;
    this.removeAllProperties(container);
    var self = this;
    this.showProperty(
        'id', 
        this.info.id,
        function(item, newValue){
            self.info.id = parseInt(newValue);
        },
        'number'
    );
    this.showProperty(
        'name', 
        this.info.name,
        function(item, newValue){
            self.info.name = newValue;
        }
    );
    this.showProperty(
        'sortorderno', 
        this.info.sortorderno || 0,
        function(item, newValue){
            self.info.sortorderno = parseInt(newValue);
        },
        'number'
    );

    this.database.actions('department', this.info.id).forEach(function(action){
        self.showAction(
            action.name,
            function(){
                action.action(function(){
                    window.dispatchEvent(new CustomEvent('contentmodified', { 'detail': {'type':'Departmnet'} })); 
                });
            }
        );
    });
}
if(window.editforms==null){
    window.editforms = {};
}

window.editforms['department'] = DepartmentForm;