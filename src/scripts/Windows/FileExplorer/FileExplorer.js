var FileExplorer = function () {

}
FileExplorer.prototype.list = function () {
    return [
        new File('tests/Stops/Production.json'),
        new File('tests/ProducedAmount/Production.json'),
        new File('tests/OEE/Production.json')
    ];
}