function dateToString(dStr) {
    var d = new Date(dStr);
    var year = d.getFullYear().toString();

    var month = d.getMonth() + 1;
    if (month <= 9) {
        month = "0" + month.toString();
    }
    else {
        month = month.toString();
    }

    var date = d.getDate();
    if (date <= 9) {
        date = "0" + date.toString();
    }
    else {
        date = date.toString();
    }

    var hour = d.getHours();
    if (hour <= 9) {
        hour = "0" + hour.toString();
    }
    else {
        hour = hour.toString();
    }

    var minute = d.getMinutes();
    if (minute <= 9) {
        minute = "0" + minute.toString();
    }
    else {
        minute = minute.toString();
    }

    var second = d.getSeconds();
    if (second <= 9) {
        second = "0" + second.toString();
    }
    else {
        second = second.toString();
    }

    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

Date.prototype.yyyymmddhhmmss = function () {
	var yyyy = this.getFullYear();
	var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
	var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
	var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
	var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
	var ss = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
	return "".concat(yyyy)
		.concat('-')
		.concat(mm)
		.concat('-')
		.concat(dd)
		.concat(' ')
		.concat(hh)
		.concat(':')
		.concat(min)
		.concat(':')
		.concat(ss);
};

Date.prototype.yyyymmddThhmmss = function () {
	var yyyy = this.getFullYear();
	var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
	var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
	var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
	var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
	var ss = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
	return "".concat(yyyy)
		.concat('-')
		.concat(mm)
		.concat('-')
		.concat(dd)
		.concat('T')
		.concat(hh)
		.concat(':')
		.concat(min)
		.concat(':')
		.concat(ss);
};