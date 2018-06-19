var Logger = function(logsWindow){
    this.logsWindow = logsWindow;
}
Logger.prototype.log = function(message){
   this.output(message, 'white');
}
Logger.prototype.system = function(message){
    this.output(message, 'grey');
}
Logger.prototype.output = function(message, textcolor){
    var tr = document.createElement('tr');
    document.getElementById('logs').querySelector('tbody').appendChild(tr);
  
    var m = document.createElement('div');
    m.innerHTML = message;
    m.style.color=textcolor;

    var timeColumn = document.createElement('td');
    var time = new Date();
    timeColumn.innerHTML = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "." + time.getMilliseconds();
    timeColumn.style.verticalAlign="top";
    
    var messageColumn = document.createElement('td');
    messageColumn.appendChild(m);

    tr.appendChild(timeColumn);
    tr.appendChild(messageColumn);

    this.logsWindow.container.scrollTop = this.logsWindow.container.scrollHeight;
}