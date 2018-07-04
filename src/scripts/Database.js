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
        return this.prodplaces().find(function(prodplace){
            return prodplace.id == id;
        })
    }

    if(result){
        return result;
    }
    throw 'Item "' + type + ' ' + id + '" not found';
}
Database.prototype.prodplace = function(id){
    return this.item('prodplace', id);
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

                    var newItemId = db.getId('site');
                    var item = {
                        'id' : newItemId,
                        'name' : 'site_' + newItemId,
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

                    var newItemId = db.getId('department');
                    var item = {
                        'id' : newItemId,
                        'name' : 'department_' + newItemId,
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
                    var newItemId = db.getId('operatorStation');
                    var item = {
                        'id' : newItemId,
                        'name' : "operatorstation_"+newItemId,
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

                    var newItemId = db.getId('prodplace');
                    var item = {
                        'id' : newItemId,
                        'name' : 'prodplace_'+newItemId,
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
Database.prototype.getId = function(type){
    if(type == 'site'){
        return (this._sid =(this._sid || Math.max.apply(
            null, 
            this.content.sites.map(function(x){ return x.id;})
        ))+1);
    }
    else if(type == 'department'){   
        return (this._did =(this._did || Math.max.apply(
            null,
            this.departments().map(function(x){return x.id})
        ))+1);
    }
    else if(type == 'operatorStation'){
        return (this._osid = (this._osid || Math.max.apply(
            null,
            this.operatorstations().map(function(x){return x.id})
        )) + 1);
    }
    else if(type == 'prodplace'){
        return (this._ppid = (this._ppid || Math.max.apply(
            null,
            this.prodplaces().map(function(x){return x.id})
        ))+1);
    }
    else if(type == 'stop'){
        return (this._stopid = (this._stopid || Math.max.apply(
            null,
            this.stops().map(function(x){return x.id ? x.id : 0})
        )) + 1);
    }
    else if(type == 'order'){
        return (this._oid =(this._oid ||  Math.max.apply(
            null,
            this.orders().map(function(x){return x.id ? x.id : 0})
        )) + 1);   
    }
    else if(type == 'orderbatch'){
        return (this._obid = (this._obid || Math.max.apply(
            null,
            this.orderbatches().map(function(x){return x.id ? x.id : 0})
        )) + 1);        
    }
}
Database.prototype.order = function(id){
    return this.orders().find(function(x){return x.id == id});
}
Database.prototype.orderbatches = function(id){
    return this.orders()
        .map(function(order){
            return order.batches ?
            order.batches.map(function(orderbatch){var x = orderbatch;x.order=order;return x;}):
                []; 
        })
        .reduce(function(a, b){ return a.concat(b); }, []);
}
Database.prototype.ordersOnOs = function(operatorStationId){
    return this.orders().filter(function(x){return x.operatorstartion.id == operatorStationId;});
}
Database.prototype.teams = function(){
    return this.content.teams.map(function(team){
        return {key : team.name, value : team.number};
    });
}
Database.prototype.downtimeTypes = function(){
    return this.content.dttypes;
}
Database.prototype.sites = function(){
    return this.content.sites;
}
Database.prototype.departments = function(){
    return this.sites()
        .map(function(site){return site.departments?site.departments:[]; })
        .reduce(function(a, b){ return a.concat(b); }, []);
}
Database.prototype.operatorstations=function(){
    return this.departments()
        .map(function(department){return department.operatorstations?department.operatorstations:[]; })
        .reduce(function(a, b){ return a.concat(b); }, []);
}
Database.prototype.prodplaces = function(){
    return this.operatorstations()
        .map(function(operatorstation){
            return operatorstation.prodplaces ?
                operatorstation.prodplaces.map(function(prodplace){var x = prodplace;x.operatorstartion=operatorstation;return x;}):
                []; 
        })
        .reduce(function(a, b){ return a.concat(b); }, []);
}
Database.prototype.orders = function(){
    return this.operatorstations().map(function(operatorstartion){
        return operatorstartion.orders ? operatorstartion.orders.map(function(order){var x = order; x.operatorstartion = operatorstartion; return x;}):[]
    }).reduce(function(a, b){ return a.concat(b); }, []);
}
Database.prototype.stops = function(){
    return this.prodplaces()
    .map(function(prodplace){
        return prodplace.stops ? prodplace.stops.map(function(stop){var x = stop; x.prodplace = prodplace; return x;}):[]
    }).reduce(function(a, b){ return a.concat(b); }, []);
}
Database.prototype.set = function(prodplaceId, data){
    data = data.JSON();
    var prodplace = this.item('prodplace', prodplaceId);
    prodplace.operatorstartion.orders = data.orders || [];
    var orderId = this.getId('order') || 1;
    prodplace.operatorstartion.orders.forEach(function(order){
        if(!order.id){
            order.id = ++orderId;
        }
    });

    var anyOrderId;
    if(prodplace.operatorstartion.orders && prodplace.operatorstartion.orders.length > 0){
        anyOrderId = prodplace.operatorstartion.orders [0].id;
    }
    prodplace.operatorstartion.orders.forEach(function(order){
        order.producedUnits = (data.putimeends ? data.putimeends.filter(function(unit){
            return unit.order.id == order.id;
        }).map(function(unit){
            return {time:unit.time, amount:unit.amount};
        }) : []) ;

        order.startedUnits = (data.putimestarts ? data.putimestarts.filter(function(unit){
            return unit.order.id == order.id;
        }).map(function(unit){
            return {time:unit.time, amount:unit.amount};
        }) : []) ;

        order.scrappedUnits = (data.putimescrappeds ? data.putimescrappeds.filter(function(unit){
            return unit.order.id == order.id;
        }).map(function(unit){
            return {time:unit.time, amount:unit.amount};
        }) : []) ;
    });
    
    (data.orderbatches || []).filter(function(x){return x.order == null || x.order.id == null}).forEach(function(orderbatch){
        orderbatch.order = {id :  anyOrderId}
    });

    var orderbatchId = this.getId('orderbatch') || 1;
    (data.orderbatches || []).filter(function(x){return x.id == null}).forEach(function(orderbatch){
        orderbatch.id = ++orderbatchId;
    });

    var orderbatches = (data.orderbatches || []).map(
        function(ob){ob.orderId = ob.order.id;
            return ob;}).groupBy('orderId');
 
    var orderbatches = (data.orderbatches || []).map(function(ob){ob.orderId = ob.order.id;return ob;}).groupBy('orderId');

    for (var orderId in orderbatches) {
        if (orderbatches.hasOwnProperty(orderId)) {
            var order =  prodplace.operatorstartion.orders.find(function(x){return x.id == parseInt(orderId)});
            if(order){
                order.batches = orderbatches[orderId];
            }
        }
    }   

    prodplace.stops = (data.stops || []);
    var stopId = this.getId('stop');
    
    (prodplace.stops || []).forEach(function(stop){
        if(!stop.id){
            stop.id = ++stopId;
        }
    });
    data.shifts = (data.shifts || []).sort(function(a, b){
        return new Date(Date.parse(a.start)) > new Date(Date.parse(b.start));
    });
    var noProdPeriods = [];
    for(var i = 0; i < data.shifts.length; i++){
        if(i > 0 && data.shifts[i].start > data.shifts[i-1].end){
            noProdPeriods.push({changeType:-1,start:data.shifts[i-1].end, end:data.shifts[i].start});
        }
    }
    data.shifts = data.shifts.concat(noProdPeriods);
    prodplace.operatorstartion.shifts = data.shifts.map(function(shift){return calendarHistory(shift); });
    
    prodplace.operatorstartion.shifts.push({
        changeType: -1,
        changeDate : data.shifts.reduce(function(min, current){
            return min < new Date(Date.parse(current.start))? min : new Date(Date.parse(data.shifts[0].start))
        }, new Date(1000000*10000000)).yyyymmddhhmmss()
    });
    
    prodplace.operatorstartion.shifts = prodplace.operatorstartion.shifts.sort(function(a, b){
        return new Date(Date.parse(a.changeDate)) > new Date(Date.parse(b.changeDate));
    }); 
    prodplace.operatorstartion.orders = data.orders || [];
}
function calendarHistory(shift){
    return {
        changeType : shift.changeType,
        changeDate : shift.end
    };
}