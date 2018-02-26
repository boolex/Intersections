var SelectableHtmlTree = function (data, nodesPropertyName, onchange) {
    this.onchange = onchange;
    HtmlTree.apply(this, arguments);
}

SelectableHtmlTree.prototype = Object.create(HtmlTree.prototype);

SelectableHtmlTree.prototype.drawNode = function (node, text) {
    var container = document.createElement("div");
    var cb = document.createElement("input");
    cb.type = "checkbox";
    container.appendChild(cb);
    cb.classList.add("group");
    cb.setAttribute("group", node.getHashCode());
    var self = this;
    cb.onchange = function () {
        self.selectedGroupsChanged();
    };
    var label = document.createElement("label");
    label.innerHTML = text;

    container.appendChild(label);
    return container;
};
SelectableHtmlTree.prototype.getSelectedNodes = function () {
    var self = this;
    var selectedGroups = [];
    var groupElements = this.container.querySelectorAll('.group');
    groupElements.forEach(function (e) {
        if (e.checked) {
            selectedGroups.push(self.getItemFullPathByHashCode(e.getAttribute('group')));
        }
    });
    return selectedGroups;
}
SelectableHtmlTree.prototype.selectedGroupsChanged = function () {
    if (this.onchange != null) {
        this.onchange(this.getSelectedNodes());
    }
}
