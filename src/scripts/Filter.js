var Filter = function (history) {
    this.history = history;
}

Filter.prototype.get = function () {
    var itemGroups = [];
    this.history.Items().forEach(function (item) {
        if (itemGroups.indexOf(item.group) == -1) {
            itemGroups.push(item.group);
        }
    });


    var groups = [];
    var self = this;
    itemGroups.forEach(function (group) {
        var groupDef = { id: group, content: group, subgroupStack: true };
        groups.push(groupDef);
        groupDef.children = {};
        self.history.Items().forEach(function (item) {
            if (item.group == group && item.tags != null) {
                
                for (var tag in item.tags) {
                    if (groupDef.children[tag] == null) {
                        groupDef.children[tag] = { id: tag, content: name };
                    }
                    if (groupDef.children[tag].children == null) {
                        groupDef.children[tag].children = {};
                    }
                    if (groupDef.children[tag].children[item.tags[tag]] == null) {
                        groupDef.children[tag].children[item.tags[tag]] = { id: item.tags[tag], content: item.tags[tag] };
                    }
                }
            }
        });
    });

    for (var j = 0; j < groups.length; j++) {
        var tagGroupCollection = [];
        if (groups[j].children != null) {
            for (var tagGroupName in groups[j].children) {
                var tagCollection = [];
                if (groups[j].children[tagGroupName].children != null) {
                    for (var tagValue in groups[j].children[tagGroupName].children) {
                        tagCollection.push(groups[j].children[tagGroupName].children[tagValue]);
                    }
                    groups[j].children[tagGroupName].children = tagCollection;
                }
                tagGroupCollection.push({ id: tagGroupName, content: tagGroupName, type: "group", children: tagCollection });
            }
            groups[j].children = tagGroupCollection;
        }
    }

    return groups;
}

function getGroups(o) {
    var res = [];
    for (var key in o) {
        if (o.hasOwnProperty(key)) {
            var item = { id: o[key].name, content: o[key].name };
            res.push(item);
            if (item != null && typeof item == 'object' && item.hasOwnProperty("children")) {
                item.children = getGroups(o[key]["children"]);
            }
        }
    }
    return res;
}