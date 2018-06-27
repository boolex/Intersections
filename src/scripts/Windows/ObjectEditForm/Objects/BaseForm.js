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