var RangePicker = function (container, initial, onchange) {
    this.container = container;
    this.initial = initial;
    this.onchange = onchange;
}
RangePicker.prototype.get = function () {
    var container = this.container;
    return {
        from: Date.parse(container.querySelector("#rangeFrom").value),
        to: Date.parse(container.querySelector("#rangeTo").value),
    }
}
RangePicker.prototype.render = function () {
    this.container.innerHTML = "";
    var fromContainer = document.createElement('div');
    var toContainer = document.createElement('div');
    this.container.appendChild(fromContainer);
    this.container.appendChild(toContainer);
    fromContainer.id = 'fromContainer';
    toContainer.id = 'toContainer';
    this.renderTimePicker(fromContainer, 'rangeFrom', this.initial.from.yyyymmddThhmmss());
    this.renderTimePicker(toContainer, 'rangeTo', this.initial.to.yyyymmddThhmmss());
}
RangePicker.prototype.renderTimePicker = function (container, id, dateTimeStr) {
    var input = document.createElement("input");
    input.type = "text";
    input.value = this.initial.from;
    input.id = id;
    container.appendChild(input);

    $('#' + id).AnyTime_picker({
        format: "%Y-%m-%dT%H:%i:%s",
        formatUtcOffset: "%: (%@)",
        hideInput: false,
        placement: "inline"
    });
    AnyTime.setCurrent(id, dateTimeStr);

    var self = this;
    input.onchange = function () {
        self.selectionChanged();
    }
}
RangePicker.prototype.selectionChanged = function () {
    if (this.onchange != null) {
        this.onchange(this.get());
    }
}

RangePicker.dependencies = [];
RangePicker.dependencies.push("AnyTime_picker")