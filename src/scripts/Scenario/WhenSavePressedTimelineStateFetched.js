var WhenSavePressedTimelineStateFetched = function(){

}
WhenSavePressedTimelineStateFetched.prototype.register = function(app, logger){
    (function(scenario){
        scenario.OnSavePressed(scenario, function(prodplaceId){
            scenario.FetchTimelineState(scenario, app, logger);
        }, logger)
    })(this);
    return this;
}

WhenSavePressedTimelineStateFetched.prototype.OnSavePressed = function(scenario, callback, logger){
    document.getElementById('save').onclick = function(){      
        if(logger){
            logger.debug('Saving...');
         }
         callback()
    }
}
WhenSavePressedTimelineStateFetched.prototype.FetchTimelineState = function(scenario, app, logger){
    try{       
        if(!window.selectedProdplace){
            return;
        }
        var prodplace = window.selectedProdplace;
        app.database().set(
            prodplace.id, 
            new ModifiedHistory(
                app.database().prodplace(window.selectedProdplace.id),
                window.timeline.timeLine.itemsData                               
            )
        );
        app.app.setContext('content', app.database().content);
        logger.log('saved');
    }
    catch(e){
        logger.error(e);
    }
}