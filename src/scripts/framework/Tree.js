var Tree = function (data, nodesPropertyName) {
    this.data = data;
    this.nodesPropertyName = nodesPropertyName || "nodes";
};
Tree.prototype.forEach = function (callback, thisPointer) {
    for (var i = 0; i < this.data.length; i++) {
        this.data[i].getHashCode = function () {
            return i.toString();
        }
        callback.call(thisPointer || this, this.data[i], null, 0);
        this.iterateNode(thisPointer, this.data[i], callback, 1);
    }
}
Tree.prototype.iterateNode = function (thisPointer, node, callback, level) {
    if (!node.hasOwnProperty(this.nodesPropertyName)) {
        return;
    }
    else {
        for (var i = 0; i < node[this.nodesPropertyName].length; i++) {
            node[this.nodesPropertyName][i].getHashCode = function () {
                return node.getHashCode() + "_" + i.toString();
            }
            callback.call(thisPointer || this, node[this.nodesPropertyName][i], node, level);
            this.iterateNode(thisPointer, node[this.nodesPropertyName][i], callback, level + 1);
        }
    }
}
Tree.prototype.getItemByHashCode = function (hashCode) {
    var path = hashCode.split('_');
    var x = this.data[parseInt(path[0])]

    for (var i = 1; i < path.length; i++) {
        x = x[this.nodesPropertyName][parseInt(path[i])];
    }
    return x;
}
Tree.prototype.getItemFullPathByHashCode=function(hashCode){
    var path = hashCode.split('_');
    var x = this.data[parseInt(path[0])]
    var result = x["content"];
    for (var i = 1; i < path.length; i++) {
        x = x[this.nodesPropertyName][parseInt(path[i])];
        result+="," + x["content"];
    }
    return result;
}
