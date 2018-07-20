var BaseForm = function(){

}

BaseForm.prototype.removeAllProperties = function(container){
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
BaseForm.prototype.showProperty = function(name, value, onChange, type){
    if(type == 'select'){
        this.showSelectProperty.apply(this, arguments);
    }
    else if(type == 'number'){
        this.showNumberProperty.apply(this, arguments)
    }
    else{
        this.showTextProperty.apply(this, arguments);
    }
}

BaseForm.prototype.showTextProperty = function(name, value, onChange){
    var tr = document.createElement('tr');
    var captionColumn = document.createElement('td');
    var valueColumn = document.createElement('td');
    captionColumn.innerHTML = name;
    var inputElement = document.createElement("input");
    inputElement.type = 'text';
    inputElement.value = value;  
    var self = this;
    inputElement.onchange=function(){
        onChange(self.shiftInfo, inputElement.value);
    };
    valueColumn.appendChild(inputElement);
    tr.appendChild(captionColumn);
    tr.appendChild(valueColumn);
    this.container.appendChild(tr);
}
BaseForm.prototype.showNumberProperty = function(name, value, onChange){
    var tr = document.createElement('tr');
    var captionColumn = document.createElement('td');
    var valueColumn = document.createElement('td');
    captionColumn.innerHTML = name;
    var inputElement = document.createElement("input");
    inputElement.type = 'number';
    inputElement.value = value;  
    var self = this;
    inputElement.onchange=function(){
        onChange(self.shiftInfo, inputElement.value);
    };
    valueColumn.appendChild(inputElement);
    tr.appendChild(captionColumn);
    tr.appendChild(valueColumn);
    this.container.appendChild(tr);
}
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
BaseForm.prototype.showDateProperty = function(name, value, onChange){
    var tr = document.createElement('tr');
    var captionColumn = document.createElement('td');
    var valueColumn = document.createElement('td');
    captionColumn.innerHTML = name;

    var dateTime = new Date(Date.parse(value));
    var formattedDate = dateTime.getFullYear() + '-' + pad(dateTime.getMonth()+1, 2) + '-' + pad(dateTime.getDate(), 2);

    var inputDateElement = document.createElement("input");
    inputDateElement.type = 'date';
    inputDateElement.value = formattedDate;  
   
    var formattedTime = pad(dateTime.getHours(), 2) + ':' + pad(dateTime.getMinutes(), 2) + ':' + pad(dateTime.getSeconds(), 2);
    var inputTimeElement = document.createElement("input");
    inputTimeElement.type = 'time';
    inputTimeElement.setAttribute('step', '2');
    inputTimeElement.value = formattedTime; 

    valueColumn.appendChild(inputDateElement);
    valueColumn.appendChild(inputTimeElement);

    var self = this;
    var selectedTime = function(){
        return inputDateElement.value + " " + inputTimeElement.value;
    }
    inputDateElement.onchange = function(){
        onChange(self.shiftInfo, selectedTime());
    };
    inputTimeElement.onchange = function(){
        onChange(self.shiftInfo, selectedTime());
    }

    tr.appendChild(captionColumn);
    tr.appendChild(valueColumn);
    this.container.appendChild(tr);
}
BaseForm.prototype.showSelectProperty = function(name, value, onChange, type, options){
    var tr = document.createElement('tr');
    var captionColumn = document.createElement('td');
    var valueColumn = document.createElement('td');
    captionColumn.innerHTML = name;
    var inputElement = document.createElement("select");
    options.forEach(function(option){
        var optionElement = document.createElement("option");
        optionElement.text = option.key;
        optionElement.value = option.value;
        inputElement.add(optionElement)
    });     
    inputElement.value = value;
    var self = this;
    inputElement.onchange=function(){
        onChange(self.shiftInfo, inputElement.value);
    };
    valueColumn.appendChild(inputElement);
    tr.appendChild(captionColumn);
    tr.appendChild(valueColumn);
    this.container.appendChild(tr);
}

BaseForm.prototype.showAction = function(name, action){
    var tr = document.createElement('tr');
    var buttonColumn = document.createElement('td');
    var b = document.createElement('button');
    b.innerHTML = name;
    b.onclick = action;
    buttonColumn.appendChild(b);
    tr.appendChild(buttonColumn);
    this.container.appendChild(tr);
}