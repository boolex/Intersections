var HtmlTree = function (data, nodesPropertyName) {
    Tree.apply(this, arguments);
};
HtmlTree.prototype = Object.create(Tree.prototype);

HtmlTree.prototype.draw = function (container, contentGet) {
    this.container = container;
    this.forEach(function (node, parent, level) {
        var element = document.createElement("div");
        element.classList.add("node");
        if (this.node2ElementMap == null) {
            this.node2ElementMap = {};
        }

        var nodeLabel = node
        if (contentGet != null) {
            nodeLabel = contentGet(node);
        }

        this.node2ElementMap[node.getHashCode()] = element;

        element.appendChild(this.drawNode(node, nodeLabel));
        if (this.node2ElementMap != null && parent != null) {
            this.node2ElementMap[parent.getHashCode()].appendChild(element);
        }
        else {
            container.appendChild(element);
        }
    }, this);
    return this;
}
HtmlTree.prototype.drawNode = function (node, label) {
    var e = document.createElement("label");
    e.innerHTML = label;
    return e;
}
HtmlTree.prototype.getContainer = function () {
    return this.container;
}