var WhenProdplaceSelectedItDisplayedInTitleScenario = function(factoryStructure){
    this.factoryStructure = factoryStructure;
}

WhenProdplaceSelectedItDisplayedInTitleScenario.prototype.register = function(app, logger){
    (function(scenario){
        scenario.OnProdplaceSelected(scenario, function(prodplaceId){
            window.SelectedProdplaceId = prodplaceId;//????
            document.getElementById('displayProdplace').innerHTML = '[' + window.SelectedProdplaceId + '] ' + app.database().prodplace(window.SelectedProdplaceId).name;           
        }, logger)
    })(this);
    return this;
}
WhenProdplaceSelectedItDisplayedInTitleScenario.prototype.OnProdplaceSelected = function(scenario, callback, logger){
    this.factoryStructure.bind(
        "select_node.jstree", function(evt, data){                       
           (function(item){
                 if(item.type == 'prodplace'){
                     if(logger){
                        logger.debug('Prodplace selected: ' + item.id);
                     }
                     try{
                        callback(parseInt(item.id));
                     }
                     catch(e){
                        logger.error('Error at WhenProdplaceSelectedItDisplayedInTitleScenario');
                        if(!window.hideErrors){throw e;}
                     }
                 }
           })(getSelectedItem(data.node.id))                                     
        }
   );
}
var getSelectedItem = function(id){
    var parts = id.split('#');
    return { type : parts[0], id : parts[1]};
}