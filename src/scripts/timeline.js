var Timeline = function (history, groups) {
    this.history = history;
    this.groups = groups;
}
Timeline.prototype.draw = function (container) {
    container.innerHTML = "";
    this.timeLine = new vis.Timeline(
        container,
        new vis.DataSet(this.history.get()),
					/*options*/{
            showTooltips: true
        }
    );

    this.timeLine.setGroups(new Filter(this.history).get());
    return this;
}
Timeline.prototype.updateGroups = function (history, groups) {
    this.history = history;
    if (groups != null) {
        this.timeLine.setData({
            groups: new Filter(history.get()).get(),
            items: history.get()
        });
    } else {
        this.timeLine.setData({
            items: history.get()
        });
    }
}
Timeline.prototype.getGroups = function (items) {
    var itemGroups = [];
    items.forEach(function (item) {
        if (itemGroups.indexOf(item.group) == -1) {
            itemGroups.push(item.group);
        }
    });

    var groups = [];
    itemGroups.forEach(function (group, index, array) {
        groups.push({ id: group, content: group, subgroupStack: true });
    });

    return groups;
}
TimeLine.dependencies = [];
TimeLine.push("vis.TimeLine");
TimeLine.push("vis.DataSet");
TimeLine.push("Filter");