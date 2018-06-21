var FilteredProducitonHistoryWithinPeriodWithIntersectionsOnProdplace = function(content, range, groups, prodplaceid){
    FilteredProducitonHistoryWithinPeriodWithIntersections.apply(this, arguments);
    this.prodplaceid = prodplaceid;
}

FilteredProducitonHistoryWithinPeriodWithIntersectionsOnProdplace.prototype = Object.create(FilteredProducitonHistoryWithinPeriodWithIntersections.prototype);

FilteredProducitonHistoryWithinPeriodWithIntersectionsOnProdplace.prototype.get = function(){
    return (this.filteredItems = this.filteredItems || this.getFilteredItems());
}

FilteredProducitonHistoryWithinPeriodWithIntersectionsOnProdplace.prototype.Items = function(){
    return new ProductionHistoryOnProdplace(this.content, this.prodplaceid).get();    
}