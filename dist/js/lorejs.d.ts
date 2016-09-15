

interface String
{
	/**  */
	format(...args: any[]): string;

	/** Returns the specified amount of chars from the left of the string. */
	left(count: number): string;

	/** Returns the specified amount of chars from the right of the string. */
	right(count: number): string;

	/** Takes a string that contains a date and converts it to a Date object. Returns undefined if the string does not contain a valid date. */
	toDate(): Date;

	/** Takes a string that contains a numeric value, and converts it to a number object. Returns NaN if the string does not contain a valid number. */
	toNumber(): number;

	/**
	Takes a string that contains a time span formatted as <D>.<HH>:<mm>:<ss>.<nnn> where <D> represents days, <HH> hours, <mm> minutes, <ss> seconds and <nnn> fractions of a second.
	The following strings are valid for parsing into a time span object.
	- "5" -> % days.
	- "6:45" -> 6 hours 45 minutes.
	- "5.10:20:30" -> 5 days, 10 hours, 20 minutes and 30 seconds.
	- "0:10:30.450" -> 10 minutes, 30 seconds and 450 milliseconds.
	*/
	toTimeSpan(): lorejs.ITimeSpan;

	/** Truncates the string to the given length, and appends an ellipsis to the end, if the given lenght is shorter than the length of the string. */
	truncate(length: number, appendEllipsis?: boolean): string;
}

interface Date
{
	/** Adds the specified number of days to the current Date object, and returns the current Date object. */
	addDays(days: number): Date;

	/** Adds the specified number of hours to the current Date object, and returns the current Date object. */
	addHours(hours: number): Date;

	/** Adds the specified number of minutes to the current Date object, and returns the current Date object. */
	addMinutes(minutes: number): Date;

	/** Adds the specified number of seconds to the current Date object, and returns the current Date object. */
	addSeconds(seconds: number): Date;

	/** Adds the specified number of milliseconds to the current Date object, and returns the current Date object. */
	addMilliseconds(milliseconds: number): Date;

	/** Adds the given time span to the current Date object, and returns the current Date object. */
	addTimeSpan(timeSpan: lorejs.ITimeSpan): Date;

	/** Clones the current Date object. */
	clone(): Date;

	/** Formats the current date object to an ISO string with the local time zone. */
	toLocalISOString(): string;

	/** Formats the current date object to a time string using the local time zone offset. */
	toLocalISOTimeString(): string;

	/** Returns the time zone offset for the current Date object as a string. */
	toOffsetString(): string;

	/** Returns the time part extracted from the current date in local time. */
	toLocalTime(): lorejs.ITimeSpan;

	/** Returns the time part extracted from the current date in UTC time. */
	toUTCTime(): lorejs.ITimeSpan;
}

declare module lorejs
{
	/** Defines an interface for managing a time span. */
	interface ITimeSpan
	{
		/** The number of days. */
		days: number;

		/** The number of hours. */
		hours: number;

		/** The number of minutes. */
		minutes: number;

		/** The number of seconds. */
		seconds: number;

		/** The numbef of milliseconds. */
		milliseconds: number;

		/** Returns the total number of days that the time span object represents including fractions. */
		totalDays(): number;

		/** Returns the total number of hours that the time span object represents including fractions. */
		totalHours(): number;

		/** Returns the total number of minutes that the time span object represents including fractions. */
		totalMinutes(): number;

		/** Returns the total number of seconds that the time span object represents including fractions. */
		totalSeconds(): number;

		/** Returns the total number of milliseconds that the time span object represents including fractions. */
		totalMilliseconds(): number;

		/** Returns the string representation of the time span object. */
		toString(): string;
	}

	/** Represents a URI. */
	interface IUri
	{
		source?: string;

		protocol?: string;

		authority?: string;

		userInfo?: string;

		user?: string;

		password?: string;

		host?: string;

		port?: string;

		relative?: string;

		path?: string;

		directory?: string;

		file?: string;

		query?: string;

		queryKey?: Object;

		anchor?: string;
	}


	/**
	Gets the given proeprty from the given source object. This method recognizes any dots ('.') in the name and traverses
	the given object's child properties to find the value. For instance, if the property name is 'employee.firstName', then
	this method looks for a property called 'employee' on the given source. If such a property exists, then that child
	object is search to find a property called 'firstName'.
	*/
    function getProperty(source: any, propertyName: string): any;

	/**
	Sets the property with the given name on the given target object. If the name contains dots ('.'), then the name is 
	considered to refer to a child object of the target instead of a property directly on the target with just a dot in 
	its name.
	*/
    function setProperty(target: any, propertyName: string, value: any): void;

	/** Parses the given input string into a IUri object. */
    function parseUri(input?: string): lorejs.IUri;

    /** Creates a time span object from the input string. The input should be formatted as the string returned by the 'lorejs.ITimeSpan.toString()' method. */
    function timeSpan(input?: string): lorejs.ITimeSpan;

    /** Creates a time span object from the given parameters. */
    function timeSpan(days?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): ITimeSpan;

}

declare module lorejs.odata
{
	/** Defines the interface for an OData query options object that contains OData query options. */
	interface IQueryOptions
	{
		expand?: string;
		filter?: string;
		orderBy?: string;
		select?: string;
		skip?: number;
		top?: number;
		inlineTotalCount?: boolean;

		buildUrl?(baseUrl?: string): string;
    }

    /** Defines the interface for an OData query object. */
    interface IQuery {
        url?: string;
        options?: IQueryOptions;

        buildUrl?(): string;
    }

    /** An enumeration used when specifying filter options with an IFilterBuilder implementation. */
    enum ComparisonOperator {
        equals = 0,
        greaterThan = 1,
        greaterThanOrEquals = 2,
        lessThan = 3,
        lessThanOrEquals = 4,
        notEquals = 5,
        contains = 6
    }

	/** Defines the interface for the data structure that is returned from an API controller when it returns an instance of the 'System.Web.Http.OData.PageResult<T>' class. */
	interface IQueryResult
	{
		Count?: number;
		Items?: any[];
		NextPageLink?: string;
	}

    /** Defines the interface for a OData filter builder. */
	interface IFilterBuilder
	{
		dateTimeOffsetFilter(arg: string, operator: ComparisonOperator, val: string): string;

		dateTimeOffsetFilter(arg: string, operator: ComparisonOperator, val: Date): string;

		dateTimeFilter(arg: string, operator: ComparisonOperator, val: string): string;

		dateTimeFilter(arg: string, operator: ComparisonOperator, val: Date): string;

		numberFilter(arg: string, operator: ComparisonOperator, val: number): string;

		stringFilter(arg: string, operator: ComparisonOperator, val: string): string;
    }


	/** Returns a new instance of the 'IFilterBuilder' interface. */
    function filterBuilder(): IFilterBuilder;

	/** Returns a new instance of the 'IQueryOptions' interface. Use the 'options' argument to specify arguments for the returned instance. */
    function queryOptions(options?: IQueryOptions): IQueryOptions;

    /** Returns a new instance of the 'IQuery' interface. */
    function query(url?: string, options?: IQueryOptions): IQuery;

}