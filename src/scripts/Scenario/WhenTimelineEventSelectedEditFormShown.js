var WhenTimelineEventSelectedEditFormShown = function(){

}

WhenTimelineEventSelectedEditFormShown.prototype.register = function(app, logger){
    window.addEventListener('eventSelected', function(data){
        if(data.detail){            
            new ObjectEditForm(
                data.detail, 
                data.detail.className,
                app,
                logger
            ).show(
                document.getElementById('editForm').querySelector('tbody')
            );
        }
    });       
}