function loadApp(file) {
    window.page =
        new Page(window);
    window.header = new HeaderPanel(
        document.getElementById("header"),
        null
    ).render();
    // window.fileExplorer = new FileExplorerWindow(
    //     document.getElementById("fileExplorer"),
    //     new FileExplorer(),
    //     function (file) {
    //         app.update({ file: file });
    //     }
    // ).render();
    window.statisticsWindow = new StatisticsWindow(
        document.getElementById("statisticsWindow")
    ).render();
    window.logsWindow = new LogsWindow(
        document.getElementById("logsWindow")
    ).render();
    window.loglevel = 2; /*0 - exceptions, 1 - warnings, 2 - debug */
    window.hideErrors = false;
    window.logger = new Logger(window.logsWindow);

    window.app = new App({
        context: {
            range: {
                from: new Date(
                    Date.parse(
                        window.page.getParameter('from') || '2017-01-01T12:24:00'
                    )
                ),
                to: new Date(
                    Date.parse(
                        window.page.getParameter('to') || '2017-01-01T17:30:00'
                    )
                )
            }
        },
        initialize: function () {
        },
        loading: function () {
        },
        render: function () {
        },
        database : function(){
            return window._db || (window._db = new Database(this.app.getContextOption('content')));
        },        
        registerEventHandlers : function(){
            (function(app){
                window.addEventListener("contentmodified", function(){app.update({contentModified:true});}, false);
            })(this);            
        },
        registerScenarios : function(){
            var drawSelectedProdplaceScenario = new WhenProdplaceSelectedThenTimelineDrawnScenario(                                
                /*factoryStructure*/$('#system-structure')
            ).register(
                /*app*/this.app.config,
                /*logger*/window.logger
            );
            var savePressedTimelineStateFetched = new WhenSavePressedTimelineStateFetched(

            ).register(
                 /*app*/this.app.config,
                /*logger*/window.logger
            );
            var whenTimelineEventSelectedEditFormShown = new WhenTimelineEventSelectedEditFormShown(

            ).register(
                 /*app*/this.app.config,
                /*logger*/window.logger
            );
            var whenUserCreatedNewEventItsInitializedScenario = new WhenUserCreatedNewEventItsInitializedScenario(

            ).register(
                /*app*/this.app.config,
               /*logger*/window.logger
           );
           var whenProdplaceSelectedItDisplayedInTitleScenario = new WhenProdplaceSelectedItDisplayedInTitleScenario(
                /*factoryStructure*/$('#system-structure')
            ).register(
                /*app*/this.app.config,
                /*logger*/window.logger
            );
            var whenFactoryDivisionSelectedFormIsDisplayedScenario = new WhenFactoryDivisionSelectedFormIsDisplayedScenario(
                 /*factoryStructure*/$('#system-structure')
            ).register(
                /*app*/this.app.config,
                /*logger*/window.logger
            );
        },
        getNow: function(){
            return this.app.getContextOption('content').now;
        },
        getHistoryOnProdplace: function(id){
           // if(window.selectedProdplace){
                return new FilteredProducitonHistoryWithinPeriodWithIntersectionsOnProdplace(
                        this.app.getContextOption('content'),
                        this.app.getContextOption('range'),
                        this.app.getContextOption('selectedGroups') || (window.page.getParameter('groups') || '').split(';'),
                        id
                    );
           // }
        },
        update: function (options) {
            var actions = {};
            var app = this.app;
            if (options != null && options.contentModified != null) {
                actions['factory_structure_update'] = true;
            }
            if (options != null && options.file != null) {
                app.setContext('file', options.file);
                actions['file'] = true;
                actions['history'] = true;
                actions['statistics'] = true;
                actions['update_timeline'] = true;
                actions['update_header'] = true;
            }
            if (options != null && options.file != null) {
                app.setContext('file', options.file);
                actions['file'] = true;
                actions['history'] = true;
                actions['statistics'] = true;
                actions['update_timeline'] = true;
                actions['update_header'] = true;
            }
            if (options != null && options.range != null) {
                app.setContext('range', options.range);
                actions['history'] = true;
                actions['statistics'] = true;
                actions['update_timeline'] = true;
                actions['update_header'] = true;
                actions['draw_filter_tree'] = true;
            }
            if (options != null && options.selectedGroups != null) {
                app.setContext('selectedGroups', options.selectedGroups);
                actions['history'] = true;
                actions['statistics'] = true;
                actions['update_timeline'] = true;
                actions['update_header'] = true;
            }
            if (options != null && options.content != null) {
                app.setContext('content', options.content);
                actions['history'] = true;
                actions['statistics'] = true;
                actions['draw_timeline'] = true;
                actions['draw_filter_tree'] = true;
                actions['factory_structure'] = true;
                actions['update_header'] = true;      
                
                // document.getElementById('save').onclick = function(){
                //     try{
                //         if(!window.selectedProdplace){
                //             return;
                //         }
                //         var prodplace = window.selectedProdplace;

                //         app.config.database().set(
                //             prodplace.id, 
                //             new ModifiedHistory(
                //                 app.config.database().prodplace(window.selectedProdplace.id),
                //                 window.timeline.timeLine.itemsData                               
                //             )
                //         );

                //         app.setContext('content', app.config.database().content);
                //         window.logger.log('saved');
                //     }
                //     catch(e){
                //         window.logger.error(e);
                //     }

                // }
            }
            if(options != null && options.checkedFactoryDivision != null){
                if(options.checkedFactoryDivision.type == 'prodplace'){
                    actions['checked_prodplace'] = true;
                }
            }
            if(options != null && options.uncheckedFactoryDivision!= null){
                if(options.uncheckedFactoryDivision.type == 'prodplace'){
                    actions['unchecked_prodplace'] = true;
                }
            }
            if(options != null && options.selectedFactoryDivision != null){
                actions['selected_division'] = true;
                if(options.selectedItem.type=='prodplace'){
                    actions['selected_prodplace'] = true;
                    actions['history'] = true;
                    actions['draw_timeline'] = true;
                }
            }
            if(actions['selected_division']){                
                try{           
                    window.logger.debug('selected_division');

                    window.selectedFactoryItem = options.selectedFactoryDivision;
                    //showFactoryDivisionPropertiesshowFactoryDivisionProperties(options.selectedItem.type, options.selectedFactoryDivision, app.config.database(), app);   
                }
                catch(e){
                    window.logger.error(e);
                    if(!window.hideErrors){throw e;}
                }
            }
            if(actions['selected_prodplace']){             
                try{                                                                      
                    window.selectedProdplace = options.selectedFactoryDivision;               
                    
                    window.logger.debug('action: [selected_prodplace]. Prodplace: ' + window.selectedProdplace.id);   
                }
                catch(e){
                    window.logger.error(e);
                    if(!window.hideErrors){throw e;}
                }
            }
            if(actions['checked_prodplace']){
                try{                      
                    if(!window.checkedFactoryDivisions){
                        window.checkedFactoryDivisions = [];
                    }
                    if(window.checkedFactoryDivisions.indexOf(options.checkedFactoryDivision.id) == -1){
                        window.checkedFactoryDivisions.push(options.checkedFactoryDivision.id)
                    }
                    window.logger.debug('action: [checked_prodplace]. prodplaces: ' + window.checkedFactoryDivisions.join());   
                }
                catch(e){
                    window.logger.error(e);
                    if(!window.hideErrors){throw e;}
                }
            }            
            if(actions['unchecked_prodplace']){
                try{                      
                    if(!window.checkedFactoryDivisions){
                        window.checkedFactoryDivisions = [];
                    }
                    if(window.checkedFactoryDivisions.indexOf(options.uncheckedFactoryDivision.id) >= 0){
                        window.checkedFactoryDivisions.splice(
                            window.checkedFactoryDivisions.indexOf(options.uncheckedFactoryDivision.id),
                            1
                        );
                    }
                    window.logger.debug('action: [checked_prodplace]. prodplaces: ' + window.checkedFactoryDivisions.join());   
                }
                catch(e){
                    window.logger.error(e);
                    if(!window.hideErrors){throw e;}
                }
            }
            if (actions['file']) {                
                app.getContextOption('file').load(function (content) {
                    app.update({ content: content });
                });                
            }
            if (actions['history'] != null) {   
                if(window.selectedProdplace){
                    app.history =
                    //new FilteredProducitonHistoryWithinPeriodWithIntersections(
                        new FilteredProducitonHistoryWithinPeriodWithIntersectionsOnProdplace(
                            app.getContextOption('content'),
                            app.getContextOption('range'),
                            app.getContextOption('selectedGroups') || (window.page.getParameter('groups') || '').split(';'),
                            window.selectedProdplace.id
                        );
                }
            }
            if (actions['statistics'] && false) {
                window.statisticsWindow.render(
                    new ProductionStatistics(app.history, app.getContextOption('range'))
                );
            }
            if (actions['update_timeline']) {
                window.timeline.updateGroups(
                    app.history,
                    app.getContextOption('selectedGroups')
                );
            }
            if (actions['draw_timeline']) {
                
            //    try{
            //        if(window.selectedProdplace){
            //             window.logger.debug('action: [draw_timeline].');
            //             document.getElementById('loadingImage').classList.remove('hidden');
            //             window.timeline =
            //                 new Timeline(
            //                     app.history,
            //                     /*groups*/null,
            //                     app.getContextOption('content').now,                                
            //                     window.logger
            //                 ).draw(document.getElementById('visualization'),
            //             function(){
            //                 document.getElementById('loadingImage').classList.add('hidden');
            //                 //document.getElementById('visualization').classList.remove('hidden');
            //             });
            //         }
            //    }
            //    catch(e){
            //        window.logger.error(e);
            //        if(!window.hideErrors){throw e;}
            //    }
               
            }
            if (actions['draw_filter_tree'] && false) {
                document.getElementById("groups").innerHTML = "";
                window.filtersTree = new SelectableHtmlTree(
                    new Filter(app.history).get(),
                    "children",
                    function (selectedGroups) {
                        app.update({ selectedGroups: selectedGroups });
                    },
                    (window.page.getParameter('groups') || '').split(';')
                ).draw(
                    document.getElementById("groups"),
                    function (x) {
                        return x["content"]
                    });
            }
            if (actions['update_header']) {
                window.header.update(app);
            }
            if(actions['factory_structure_update']){
                $('#system-structure').jstree(true).settings.core.data =  this.jsTreeNodesFromFactoryStructure(app.getContextOption('content'));
                $('#system-structure').jstree(true).refresh();
            }
            if(actions['factory_structure']){
                var content = app.getContextOption('content');

                $('#system-structure').jstree({ 
                    'core' : {'data' : this.jsTreeNodesFromFactoryStructure(content)},
                    'plugins' : [ "wholerow", "checkbox","contextmenu" ],
                    "checkbox" : {
                        "keep_selected_style" : false,
                        "whole_node":false,
                        "cascade":"up",
                        "three_state":false,
                        "tie_selection":false
                    },
                    'contextmenu':{
                        'items':{
                            'AddSubdivision':{
                                title:"Add",
                                label :"Add subdivision",
                                action:function(obj){
                                   var item = getSelectedItem(obj);
                                   var dbObject = app.config.database().item(item.type,item.id);
                                }
                            }
                        }
                    },
                    
                }).on('loaded.jstree', function() {
                    $('#system-structure').jstree('open_all');
                });
                // $("#system-structure").bind(
                //      "select_node.jstree", function(evt, data){                       
                //         (function(item){
                //             item = copy(item);
                //             item.className = item.type;
                            
                //             window.dispatchEvent(new CustomEvent('eventSelected', { 'detail': item })); 
                //             app.update({
                //                 selectedFactoryDivision : app.config.database().item(item.type, item.id), 
                //                 selectedItem : item
                //             });         
                //         })(getSelectedItem(data.node.id))                                     
                //      }
                // );

            //     $("#system-structure").bind(
            //         "check_node.jstree", function(node, selected, event){                       
            //            (function(item){
            //                app.update({
            //                   checkedFactoryDivision : item
            //                });         
            //            })(getSelectedItem(selected.node.id))                                     
            //         }
            //    );
            //    $("#system-structure").bind(
            //     "uncheck_node.jstree", function(node, selected, event){                       
            //        (function(item){
            //            app.update({
            //               uncheckedFactoryDivision : item
            //            });         
            //        })(getSelectedItem(selected.node.id))                                     
                 
            // });

                var getSelectedItem = function(id){
                    var parts = id.split('#');
                    return { type : parts[0], id : parts[1]};
                }
            }
        },
        jsTreeNodesFromFactoryStructure:function(content){
            var nodes = [];
            nodes.push(
                { "id" : "factory", "parent" : "#", "text" : "Factory" }
            );

            var sites = content.sites;
            sites.forEach(function(site){
                nodes.push(
                    { "id" : "site#"+site.id, "parent" : "factory", "text" : site.name }
                );
                if(site.departments){
                    site.departments.forEach(function(department){
                        nodes.push(
                            { "id" : "department#"+department.id, "parent" : "site#"+site.id, "text" : department.name }
                        );

                        if(department.operatorstations){
                            department.operatorstations.forEach(function(operatorStation){
                                nodes.push(
                                    { 
                                        "id" : "operatorStation#"+operatorStation.id, 
                                        "parent" : "department#"+department.id, 
                                        "text" : (operatorStation.name!=null?operatorStation.name:"[OperatorStation#id="+operatorStation.id+"]")
                                    }
                                );

                                if(operatorStation.prodplaces){
                                    operatorStation.prodplaces.forEach(function(prodplace){
                                        nodes.push(
                                            { 
                                                "id" : "prodplace#"+prodplace.id, 
                                                "parent" : "operatorStation#"+operatorStation.id, 
                                                "text" : prodplace.name 
                                            }
                                        );
                                    });
                                }
                            });
                        }
                    });
                }
            });        
            return nodes;
        },
        display: function () {
            try {
                var app = this.app;
                var filePath = window.page.getParameter('file') || file;
                app.update({ file: new File(filePath) });
            }
            catch (e) {
                //log(e);
            }
        }
    }).start();
    window.rangePicker = new RangePickerOnDemand(
        document.getElementById("rangePicker"),
        window.app.getContextOption('range'),
        function (range) {
            window.app.update({ range: range });
        }
    ).render();    
}


var showFactoryDivisionProperties=function(type, division, db,app){
                    
    var tbody = document.getElementById('factoryDivisionProperties').querySelector('tbody');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    Database.properties(type).forEach(function(property){
        var tr = document.createElement('tr');
        var captionColumn = document.createElement('td');
        var valueColumn = document.createElement('td');
        captionColumn.innerHTML = property.name;
        var inputElement = document.createElement("input");
        inputElement.type = property.type;
        if(division[property.name] == null) {
            inputElement.value = "";
        }
        else {
            inputElement.value = division[property.name];
        }
        inputElement.onchange=function(){
            division[property.name] = inputElement.value;
        };
        valueColumn.appendChild(inputElement);
        tr.appendChild(captionColumn);
        tr.appendChild(valueColumn);
        tbody.appendChild(tr);
    });
    db.actions(type, division? division.id:null).forEach(function(action){
        var tr = document.createElement('tr');
        var buttonColumn = document.createElement('td');
        var b = document.createElement('button');
        b.innerHTML = action.name;
        b.onclick = function(){
           return action.action(function(){
            app.update({contentModified:true});
           });
        };
        buttonColumn.appendChild(b);
        tr.appendChild(buttonColumn);
        tbody.appendChild(tr);
    });
}
// var showProdplaces = function(){
//      window.timeline =
//                     new Timeline(
//                         app.history,
//                         null,
//                         app.getContextOption('content').now,
//                         window.logger
//                     ).draw(document.getElementById('visualization'));
// }