var HeaderPanel = function (container, app) {
    this.container = container;
    this.app = app;
}
HeaderPanel.prototype.update = function (app) {
    this.app = app;
    this.render();
}
HeaderPanel.prototype.render = function () {
    this.container.querySelector('#fileName').innerHTML =  this.getLoadedFileName();
    this.container.querySelector('#scenario_now').innerHTML = this.getNow();
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
HeaderPanel.prototype.getNow = function () {
    if (this.app && this.app.getContextOption('content') && this.app.getContextOption('content').now) {
        return this.app.getContextOption('content').now;
    }
    return "Now isn't specified";
}