function normalizeDateTime(source){
    var d = new Date(Date.parse(source));
    return d.yyyymmddhhmmss();
}