var ObjectEditForm = function(target, type, app, logger){
    this.target = target;
    this.type = type;
    this.app = app;
    this.logger = logger;
}
ObjectEditForm.prototype.database = function(){
    return this.app.database();
}
ObjectEditForm.prototype.show = function(container){
    if(window.editforms.hasOwnProperty(this.type)){
        var Form = window.editforms[this.type];
        new Form(
            this.target,
            this.database()
        ).show(container);
    }
}