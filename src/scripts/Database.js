function Database(content){
    this.content=content;
}

Database.prototype.item=function(type,id){
    if(type=='factory'){
        return;
    }
    var result = null;
    if(type == "site"){
        this.content.sites.forEach(function(site){
            if(site.id == id){
                result = site;
                return;
            }
        });
    }
    

    if(type == "department"){
        this.content.sites.forEach(function(site){
            if(!site.departments){
                return;
            }
            site.departments.forEach(function(department){
                if(department.id == id){
                    result = department;
                return;
                }
            });
           
        });
    }
    if(type == "operatorStation"){
        this.content.sites.forEach(function(site){
            if(!site.departments){
                return;
            }
            site.departments.forEach(function(department){
                if(!department.operatorstations){
                    return;
                }
                department.operatorstations.forEach(function(operatorstation){
                    if(operatorstation.id == id){
                        result = operatorstation;
                return;
                    }
                });               
            });
           
        });
    }
    if(type == "prodplace"){
        this.content.sites.forEach(function(site){
            if(!site.departments){
                return;
            }
            site.departments.forEach(function(department){
                if(!department.operatorstations){
                    return;
                }
                department.operatorstations.forEach(function(operatorstation){
                    if(!operatorstation.prodplaces){
                        return;
                    }
                    operatorstation.prodplaces.forEach(function(prodplace){
                        if(prodplace.id == id){
                            result = prodplace;
                            return;
                        }
                    });                    
                });               
            });
           
        });
    }

    if(result){
        return result;
    }
    throw 'Item "' + type + ' ' + id + '" not found';
}
Database.properties=function(type){
    if(type=='factory'){
        return [];
    }
    if(type=='site'){
        return [
            {name : 'id', default:'-1', type:'number'},
            {name : 'name', default:'---',type:'text'},
            {name : 'sortorderno', default:'0',type:'number'}
        ];
    }
    if(type=='department'){
        return [
            {name : 'id', default:'-1', type:'number'},
            {name : 'name', default:'---',type:'text'},
            {name : 'sortorderno', default:'0',type:'number'}
        ];
    }
    if(type=='operatorStation'){
        return [
            {name : 'id', default:'-1', type:'number'},
            {name : 'name', default:'---',type:'text'},
            {name : 'sortorderno', default:'0',type:'number'}
        ];
    }
    if(type=='prodplace'){
        return [
            {name : 'id', default:'-1', type:'number'},
            {name : 'name', default:'---',type:'text'},
            {name : 'sortorderno', default:'0',type:'number'}
        ];
    }
    throw 'No properties for type "' + type + '"';
}
Database.prototype.actions = function(type, id){
    var db = this;
    if(type=='factory'){
        return [
            {
                'name' : 'Add site', 
                'action' : function(callback) {
                   
                    if(db.content.sites==null){
                        db.content.sites=[];
                    }

                    var item = {
                        'id' : 1,
                        'name' : "site1",
                        'sortorderno' : '0'
                    };

                    db.content.sites.push(item);

                    if(callback){
                        callback(item, db.content);
                    }
                }
            }
        ];
    }
    if(type=='site'){
        return [
            {
                'name' : 'Add department', 
                'action' : function(callback) {
                    var site = db.item(type, id);
                    if(site.departments==null){
                        site.departments=[];
                    }

                    var item = {
                        'id' : 1,
                        'name' : "department1",
                        'sortorderno' : '0'
                    };

                    site.departments.push(item);

                    if(callback){
                        callback(item, site);
                    }
                }
            }
        ];
    }
    if(type == 'department'){
        return [
            {
                'name' : 'Add operator station', 
                'action' : function(callback) {
                    var department = db.item(type, id);
                    if(department.operatorstations==null){
                        department.operatorstations=[];
                    }

                    var item = {
                        'id' : 1,
                        'name' : "operatorstation1",
                        'sortorderno' : '0'
                    };

                    department.operatorstations.push(item);

                    if(callback){
                        callback(item, department);
                    }
                }
            }
        ];
    }
    if(type == 'operatorStation'){
        return [
            {
                'name' : 'Add prodplace', 
                'action' : function(callback) {
                    var operatorstation = db.item(type, id);
                    if(operatorstation.prodplaces==null){
                        operatorstation.prodplaces=[];
                    }

                    var item = {
                        'id' : 1,
                        'name' : "prodplace1",
                        'sortorderno' : '0'
                    };

                    operatorstation.prodplaces.push(item);

                    if(callback){
                        callback(item, operatorstation);
                    }
                }
            }
        ];
    }
    return [];
}