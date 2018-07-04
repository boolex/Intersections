var WhenFactoryDivisionSelectedFormIsDisplayedScenario = function(factoryStructure){
    this.factoryStructure = factoryStructure;
}

WhenFactoryDivisionSelectedFormIsDisplayedScenario.prototype.register = function(app, logger){
    (function(scenario){
        scenario.OnFactoryDivisionSelected(scenario, function(factoryDivision, item){
            window.dispatchEvent(new CustomEvent('eventSelected', { 'detail': item })); 
            //showFactoryDivisionProperties(item.type, factoryDivision, app.database(), app);         
        }, logger, app);
    })(this);
    return this;
}
WhenFactoryDivisionSelectedFormIsDisplayedScenario.prototype.OnFactoryDivisionSelected = function(scenario, callback, logger, app){
    this.factoryStructure.bind(
        "select_node.jstree", function(evt, data){                       
           (function(item){
                item = copy(item);
                item.className = item.type;
                if(logger){                
                    logger.debug('Facotry division selected: ' + item.id);
                }
                try{
                   // window.dispatchEvent(new CustomEvent('eventSelected', { 'detail': item }));  //?????
                    callback(app.database().item(item.type, item.id), item);
                }
                catch(e){
                    logger.error('Error at WhenProdplaceSelectedItDisplayedInTitleScenario');
                    if(!window.hideErrors){throw e;}
                }                 
           })(getSelectedItem(data.node.id))                                     
        }
   );
}