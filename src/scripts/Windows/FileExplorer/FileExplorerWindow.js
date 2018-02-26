var FileExplorerWindow = function (container, explorer, onchange) {
    this.container = container;
    this.explorer = explorer;
    this.onchange = onchange;
}

FileExplorerWindow.prototype.render = function () {
    this.container.innerHTML = "";
    var selectElement = document.createElement('select');
    this.container.appendChild(selectElement);

    selectElement.size = 25;
    this.explorer.list().forEach(function (file) {
        var option = document.createElement('option');
        option.innerHTML = file.getPath();
        option.value = file.getPath();
        selectElement.appendChild(option);
    });

    var self = this;
    selectElement.onchange = function () {
        self.selectedChanged();
    }
}
FileExplorerWindow.prototype.getSelected = function () {
    var select = this.container.querySelector('select');
    return select.options[select.selectedIndex].value;
}
FileExplorerWindow.prototype.selectedChanged = function () {
    if (this.onchange != null) {
        this.onchange(new File(this.getSelected()));
    }
}