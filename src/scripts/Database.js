function Database(content){
    this.content=content;
}

Database.prototype.item=function(type,id){
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
            site.departments.forEach(function(department){
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
            site.departments.forEach(function(department){
                department.operatorstations.forEach(function(operatorstation){
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
Database.actions=function(type){
    
}