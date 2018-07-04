var FactoryForm = function(siteInfo, database){
    this.info = database.content;
    this.database = database;
}
FactoryForm.prototype = Object.create(BaseForm.prototype);

FactoryForm.prototype.show = function(container){
    this.container = container;
    this.removeAllProperties(container);
    var self = this;
   
    this.database.actions('factory', this.info.id).forEach(function(action){
        self.showAction(
            action.name,
            function(){
                action.action(function(){
                    window.dispatchEvent(new CustomEvent('contentmodified', { 'detail': {'type':'Factory'} })); 
                });
            }
        );
    });
}
if(window.editforms==null){
    window.editforms = {};
}

window.editforms['factory'] = FactoryForm;