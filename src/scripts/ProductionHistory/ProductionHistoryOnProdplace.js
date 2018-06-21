var ProductionHistoryOnProdplace = function(content, prodplaceid){
    this.content = content;
    this.prodplaceid = prodplaceid;
}
ProductionHistoryOnProdplace.prototype = Object.create(ProductionHistory.prototype);

ProductionHistoryOnProdplace.prototype.forEach = function (callback) {
    this.get().forEach(callback);
}
ProductionHistoryOnProdplace.prototype.get = function () {
    return (this.items = this.items || this.buildItems(this.content));
}

ProductionHistoryOnProdplace.prototype.buildItems =function(content){
    var items = new ProductionHistory(content) .get();
    var prodplaceid = this.prodplaceid;
    return items.filter(function(item){ 
        return item.source.prodplace.id == prodplaceid
    });
}