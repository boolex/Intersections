var App = function (config) {
    this.config = config;
    this.config.app = this;

}
App.prototype.start = function () {
    if (this.Configured()) {
        this.RegisterEvents();
    }
    return this;
}
App.prototype.Configured = function () {
    return this.config != null;
}
App.prototype.RegisterEvents = function () {
    if (this.config.initialization != null) {
        this.config.initialization(this);
    }
    if (this.config.load != null) {
        this.config.loading(this);
    }
    if (this.config.display != null) {
        this.config.display(this);
    }
    if (this.config.registerScenarios != null) {
        this.config.registerScenarios();
    }
}
App.prototype.log = function (message) {
    document.getElementById("log").innerHTML += message;
}
App.prototype.getContextOption = function (name) {
    return this.config.context[name];
}
App.prototype.setContext = function (name, value) {
    this.config.context[name] = value;
}
App.prototype.update = function (options) {
    if (this.config != null && this.config.update != null) {
        this.config.update(options);
    }
}