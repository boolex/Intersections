var HeaderPanel = function (container, app) {
    this.container = container;
    this.app = app;
}
HeaderPanel.prototype.update = function (app) {
    this.app = app;
    this.render();
}
HeaderPanel.prototype.render = function () {
    this.container.innerHTML = "";
    var caption = document.createElement("div");
    caption.innerHTML = "File: <b>" + this.getLoadedFileName() + "</b>";
    this.container.appendChild(caption);
    return this;
}
HeaderPanel.prototype.getLoadedFileName = function () {
    if (this.app && this.app.getContextOption('file')) {
        return this.app.getContextOption('file').getPath();
    }
    else {
        return "file isn't loaded";
    }
};