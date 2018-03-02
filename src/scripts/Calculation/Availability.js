var Availability = function(range, shifts, plannedDowntimes, availLossDowntimes){
    this.range = range;
    this.shifts = shifts;
    this.plannedDowntimes = plannedDowntimes;
    this.availLossDowntimes = availLossDowntimes;
}
Availability.prototype.compute=function(){    
    if(this.plannedProductionTime()>0){
       return (100 * this.productionTime() / this.plannedProductionTime()).toFixed(5);
    }
    else{
        return 'undef';
    }
}
Availability.prototype.productionTime=function(){ 
    return new ProductionTime(
        this.range,
        this.shifts,
        this.plannedDowntimes,
        this.availLossDowntimes
    ).compute();
}
Availability.prototype.plannedProductionTime=function(){
    return new PlanTime(
        this.range,
        this.shifts,
        this.plannedDowntimes
    ).compute();
}