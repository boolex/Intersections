/*
responsible for managing control flow for one scenario
    1.awaits prodplace selection
    2.builds timeline parameters
    3.draws timeline
*/
var WhenProdplaceSelectedThenTimelineDrawnScenario = function(factoryStructure){
    this.factoryStructure = factoryStructure;
}
WhenProdplaceSelectedThenTimelineDrawnScenario.prototype.register = function(app, logger){
    (function(scenario){
        scenario.OnProdplaceSelected(scenario, function(prodplaceId){
            scenario.DrawTimeline(scenario, app, prodplaceId, logger);
        }, logger)
    })(this);
    return this;
}
WhenProdplaceSelectedThenTimelineDrawnScenario.prototype.OnProdplaceSelected = function(scenario, callback, logger){
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
                        logger.error('Error at WhenProdplaceSelectedThenTimelineDrawnScenario');
                        if(!window.hideErrors){throw e;}
                     }
                 }
           })(getSelectedItem(data.node.id))                                     
        }
   );
}
WhenProdplaceSelectedThenTimelineDrawnScenario.prototype.DrawTimeline = function(scenario, app, prodplaceId, logger){
    scenario.showLoading(true);
    window.timeline =
        new Timeline(
            app.getHistoryOnProdplace(prodplaceId),
            /*groups*/null,
            app.getNow(),                                
            logger
        ).draw(
            document.getElementById('visualization'),
            function(){
                scenario.showLoading(false);
            }
        );
}
WhenProdplaceSelectedThenTimelineDrawnScenario.prototype.showLoading = function(visible){
    if(visible){
        document.getElementById('loadingImage').classList.remove('hidden');
    }
    else{
        document.getElementById('loadingImage').classList.add('hidden');
    }    
}
var getSelectedItem = function(id){
    var parts = id.split('#');
    return { type : parts[0], id : parts[1]};
}