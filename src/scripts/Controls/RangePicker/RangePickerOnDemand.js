var RangePickerOnDemand = function () {
    RangePicker.apply(this, arguments);
}

RangePickerOnDemand.prototype = Object.create(RangePicker.prototype);

RangePickerOnDemand.prototype.render = function () {
    RangePicker.prototype.render.apply(this, arguments);
    var self = this;

    self.element('#AnyTime--rangeFrom').classList.add('hidden');
    self.element('#AnyTime--rangeTo').classList.add('hidden');

    self.element('#rangeFrom').onmouseover = function () {
        clearTimeout(self.hidingFrom);
        self.element('#rangeFrom').setAttribute('mouseover', 'true');

        self.element('#AnyTime--rangeFrom').classList.remove('hidden');
        self.element('#AnyTime--rangeFrom').classList.add('visible');
    }
    self.element('#rangeFrom').onmouseout = function () {
        self.element('#rangeFrom').setAttribute('mouseover', 'false');
        if (self.element('#AnyTime--rangeFrom').getAttribute('mouseover') != 'true') {
            self.hidingFrom = setTimeout(
                function () { 
                    self.element('#AnyTime--rangeFrom').classList.remove('visible'); 
                    self.element('#AnyTime--rangeFrom').classList.add('hidden'); 
                },
                200);
        }
    }
    self.element('#AnyTime--rangeFrom').onmouseover = function () {
        self.element('#AnyTime--rangeFrom').setAttribute('mouseover', 'true');
        clearTimeout(self.hidingFrom);
    }
    self.element('#AnyTime--rangeFrom').onmouseout = function () {
        self.element('#AnyTime--rangeFrom').setAttribute('mouseover', 'false');
        if (self.element('#AnyTime--rangeFrom').getAttribute('mouseover') != 'true') {
            self.hidingFrom = setTimeout(
                function () {
                    self.element('#AnyTime--rangeFrom').classList.remove('visible'); 
                     self.element('#AnyTime--rangeFrom').classList.add('hidden'); 
            },
                200);
        }
    }


    self.element('#rangeTo').onmouseover = function () {
        clearTimeout(self.hidingTo);
        self.element('#rangeTo').setAttribute('mouseover', 'true');
        self.element('#AnyTime--rangeTo').classList.remove('hidden');
        self.element('#AnyTime--rangeTo').classList.add('visible');
    }
    self.element('#rangeTo').onmouseout = function () {
        self.element('#rangeTo').setAttribute('mouseover', 'false');
        if (self.element('#AnyTime--rangeTo').getAttribute('mouseover') != 'true') {
            self.hidingTo = setTimeout(
                function () { 
                    self.element('#AnyTime--rangeTo').classList.remove('visible');
                    self.element('#AnyTime--rangeTo').classList.add('hidden');
                },
                200);
        }
    }
    self.element('#AnyTime--rangeTo').onmouseover = function () {
        self.element('#AnyTime--rangeTo').setAttribute('mouseover', 'true');
        clearTimeout(self.hidingTo);
    }
    self.element('#AnyTime--rangeTo').onmouseout = function () {
        self.element('#AnyTime--rangeTo').setAttribute('mouseover', 'false');
        if (self.element('#AnyTime--rangeTo').getAttribute('mouseover') != 'true') {
            self.hidingTo = setTimeout(
                function () {
                    self.element('#AnyTime--rangeTo').classList.remove('visible');
                     self.element('#AnyTime--rangeTo').classList.add('hidden');                     
            },
                200);
        }
    }
}
RangePickerOnDemand.prototype.element = function (selector) {
    return this.container.querySelector(selector);
}
