/// <reference path="lorejs.d.ts" />

String.prototype.toDate = function (): Date
{
	var d = new Date(this);
	if (!isNaN(d.valueOf())) return d;
	return undefined;
};

String.prototype.format = function (...args: any[]): string
{
	return this.replace(/{(\d+)}/g, function (match, num)
	{
		var retVal = "";
		if (args.length > num && args[num])
		{
			retVal = args[num] + "";
		}

		return retVal;
	});
};

String.prototype.left = function (count: number): string
{
	var s: string = this;
	var output: string;

	if (s && s.length >= count)
	{
		output = s.substr(0, count);
	}
	else
	{
		output = s;
	}

	return output;
}

String.prototype.right = function (count: number): string
{
	var s: string = this;
	var output: string;

	if (s && s.length >= count)
	{
		output = s.substr(s.length - count);
	}
	else
	{
		output = s;
	}

	return output;
}

String.prototype.toNumber = function (): number
{
	var s: string = this;

	if (s && s.length)
	{
		var sAny: any = s;

		return 1 * sAny;
	}

	return NaN;
}

String.prototype.truncate = function (length: number, appendEllipsis?: boolean): string
{
	var output: string;
	if (this && this.length && this.length > length)
	{
		output = this.left(length);
		if (appendEllipsis) output = output + "...";
	}
	else
	{
		output = this + "";
	}

	return output;
}

String.prototype.toTimeSpan = function (): lorejs.ITimeSpan
{
	var s: string = this;
	if (!s || !s.length) return undefined;

	var ts = lorejs.timeSpan();

	var arr1 = s.match(/^\d+\./);
	if (arr1 && arr1.length)
	{
		ts.days = arr1[0].substring(0, arr1[0].length - 1).toNumber();
	}

	var arr2 = s.match(/\d{1,2}\:\d{2}(\:\d{2})*/);
	if (arr2 && arr2.length)
	{
		var arr = arr2[0].split(":");
		if (arr && arr.length)
		{
			ts.hours = arr[0].toNumber();

			if (arr.length > 1) ts.minutes = arr[1].toNumber();
			if (arr.length > 2) ts.seconds = arr[2].toNumber();
		}
	}

	var arr3 = s.match(/\.\d{3}$/);
	if (arr3 && arr3.length)
	{
		ts.milliseconds = arr3[0].substring(1).toNumber();
	}

	return ts;
}




Date.prototype.addDays = function (days: number): Date
{
	var dt: Date = this;
	dt.setDate(dt.getDate() + days);
	return dt;
};

Date.prototype.addHours = function (hours: number): Date
{
	var dt: Date = this;
	dt.setHours(dt.getHours() + hours);
	return dt;
};

Date.prototype.addMinutes = function (minutes: number): Date
{
	var dt: Date = this;
	dt.setMinutes(dt.getMinutes() + minutes);
	return dt;
};

Date.prototype.addSeconds = function (seconds: number): Date
{
	var dt: Date = this;
	dt.setSeconds(dt.getSeconds() + seconds);
	return dt;
};

Date.prototype.addMilliseconds = function (milliseconds: number): Date
{
	var dt: Date = this;
	dt.setMilliseconds(dt.getMilliseconds() + milliseconds);
	return dt;
};

Date.prototype.addTimeSpan = function (timeSpan: lorejs.ITimeSpan): Date
{
	var dt: Date = this;

	if (dt && timeSpan)
	{
		if (timeSpan.days) dt.addDays(timeSpan.days);
		if (timeSpan.hours) dt.addHours(timeSpan.hours);
		if (timeSpan.minutes) dt.addMinutes(timeSpan.minutes);
		if (timeSpan.seconds) dt.addSeconds(timeSpan.seconds);
		if (timeSpan.milliseconds) dt.addMilliseconds(timeSpan.milliseconds);
	}

	return dt;
}

Date.prototype.clone = function (): Date
{
	var dt: Date = this;
	var val = dt.valueOf();

	if (!isNaN(val)) return new Date(val);
	return null;
};

Date.prototype.toLocalISOString = function(): string
{
	var dt: Date = this;
	var output: string;

	if (dt)
	{
		var yy = ("0000" + dt.getFullYear()).right(4);
		var MM = ("00" + (dt.getMonth() + 1)).right(2);
		var dd = ("00" + dt.getDate()).right(2);

		output = yy + "-" + MM + "-" + dd + "T" + (dt.toLocalISOTimeString() || "") + (dt.toOffsetString() || "");
	}

	return output;
}

Date.prototype.toLocalISOTimeString = function (): string
{
	var dt: Date = this;
	var output: string;

	if (dt)
	{
		var HH = ("00" + dt.getHours()).right(2);
		var mm = ("00" + dt.getMinutes()).right(2);
		var ss = ("00" + dt.getSeconds()).right(2);
		var nn = ("000" + dt.getMilliseconds()).right(3);

		output = HH + ":" + mm + ":" + ss + "." + nn;
	}

	return output;
}

Date.prototype.toOffsetString = function (): string
{
	var dt: Date = this;
	var output: string;

	if (dt)
	{
		var o = dt.getTimezoneOffset() * -1; // Positive offset is returned as a negative number, so we need to inverse it.
		var s: string = o >= 0 ? "+" : "-";
		var hh = ("00" + (o / 60)).right(2);
		var mm = ("00" + (o % 60)).right(2);

		output = s + hh + ":" + mm;
	}

	return output;
}

Date.prototype.toLocalTime = function (): lorejs.ITimeSpan
{
	var dt: Date = this;
	if (!dt) return undefined;

	var ts = lorejs.timeSpan();

	ts.hours = dt.getHours();
	ts.minutes = dt.getMinutes();
	ts.seconds = dt.getSeconds();
	ts.milliseconds = dt.getMilliseconds();

	return ts;
}

Date.prototype.toUTCTime = function (): lorejs.ITimeSpan
{
	var dt: Date = this;
	if (!dt) return undefined;

	var ts = lorejs.timeSpan();

	ts.hours = dt.getUTCHours();
	ts.minutes = dt.getUTCMinutes();
	ts.seconds = dt.getUTCMinutes();
	ts.milliseconds = dt.getUTCMilliseconds();

	return ts;
}
