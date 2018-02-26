var StatisticsWindow = function (container) {
    this.container = container;
}

StatisticsWindow.prototype.render = function (statistics) {
    this.renderTable();
    if (statistics != null) {
        this.renderTableContent(statistics);
    }
    return this;
}
StatisticsWindow.prototype.renderTableRow = function (caption, value) {
    var tr = document.createElement('tr');
    var tdCaption = document.createElement('td');
    var tdValue = document.createElement('td');

    tdCaption.innerHTML = caption;
    tdValue.innerHTML = value;

    tr.appendChild(tdCaption);
    tr.appendChild(tdValue);
    this.tbody.appendChild(tr);
}
StatisticsWindow.prototype.renderTableContent = function (statistics) {
    this.renderTableRow("Intersection time", statistics.getTotalInstersectionTime());
    this.renderTableRow("PUTimeEnd",statistics.getTotalPuTimeEnd());
}
StatisticsWindow.prototype.renderTable = function () {
    var table = document.createElement("table");
    this.tbody = document.createElement('tbody');
    table.appendChild(this.tbody);
    this.container.innerHTML = "";
    this.container.appendChild(table);
}