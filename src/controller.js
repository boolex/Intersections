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
            }
            if (actions['file']) {
                app.getContextOption('file').load(function (content) {
                    app.update({ content: content });
                });                
            }
            if (actions['history'] != null) {
                app.history =
                    new FilteredProducitonHistoryWithinPeriodWithIntersections(
                        app.getContextOption('content'),
                        app.getContextOption('range'),
                        app.getContextOption('selectedGroups') || (window.page.getParameter('groups') || '').split(';')
                    );
            }
            if (actions['statistics']) {
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
                window.timeline =
                    new Timeline(
                        app.history,
                        null,
                        app.getContextOption('content').now
                    ).draw(document.getElementById('visualization'));
            }
            if (actions['draw_filter_tree']) {
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
                        "three_state":false
                    },
                    'contextmenu':{
                        'items':{
                            'AddSubdivision':{
                                title:"Add",
                                label :"Add subdivision",
                                action:function(obj){
                                   var item = getSelectedItem(obj);
                                   var dbObject = new Database(content).item(item.type,item.id);
                                }
                            }
                        }
                    },
                    
                }).on('loaded.jstree', function() {
                    $('#system-structure').jstree('open_all');
                });
                $("#system-structure").bind(
                     "select_node.jstree", function(evt, data){
                         var item = getSelectedItem(data.node.id);
                         var db = new Database(content);
                         var dbObject = db.item(item.type, item.id);
                         showFactoryDivisionProperties(item.type, dbObject, db, app);                         
                     }
                );

                var showFactoryDivisionProperties=function(type, division, db,app){
                    
                    var tbody =document.getElementById('factoryDivisionProperties').querySelector('tbody');
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