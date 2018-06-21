var File = function (path) {
    this.path = path;
}
File.prototype.getPath = function () {
    return this.path;
}
File.prototype.load = function (callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", this.path +"?time=" + new Date().yyyymmddhhmmss(), false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                var value = JSON.parse(rawFile.responseText);
                callback(value);
            }
        }
    }
    rawFile.send(null);
}