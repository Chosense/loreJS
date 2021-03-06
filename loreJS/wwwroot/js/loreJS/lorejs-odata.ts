/// <reference path="lorejs.d.ts" />

module lorejs.odata
{
    lorejs.odata.ComparisonOperator = {
        equals: 0,
        "0": "equals",
        greaterThan: 1,
        "1": "greaterThan",
        greaterThanOrEquals: 2,
        "2": "greaterThanOrEquals",
        lessThan: 3,
        "3": "lessThan",
        lessThanOrEquals: 4,
        "4": "lessThanOrEquals",
        notEquals: 5,
        "5": "notEquals",
        contains: 6,
        "6": "contains"
    };
    
    lorejs.odata.filterBuilder = function (): IFilterBuilder {
        return new FilterBuilder();
    }

    lorejs.odata.queryOptions = function (options?: IQueryOptions): IQueryOptions {
        return new QueryOptions(options);
    }

    lorejs.odata.query = function (url?: string, options?: IQueryOptions): IQuery {
        var q: IQuery = {
            url: url,
            options: queryOptions(options),
            buildUrl: function (): string {
                return q.options.buildUrl(this.url);
            }
        }
        return q;
    }


	class QueryOptions implements IQueryOptions
	{
		constructor(options?: IQueryOptions)
		{
			if (options)
			{
				this.expand = options.expand;
				this.filter = options.filter;
				this.inlineTotalCount = options.inlineTotalCount;
				this.orderBy = options.orderBy;
				this.select = options.select;
				this.skip = options.skip;
				this.top = options.top;
			}
			else
			{
				this.skip = 0;
				this.top = this.defaultTop;
			}
		}

		private defaultTop: number = 20;


		expand: string;
		filter: string;
		orderBy: string;
		select: string;
		skip: number;
		top: number;
		inlineTotalCount: boolean;


		buildUrl(baseUrl?: string): string
		{
			var s: string = baseUrl != null ? baseUrl : "";
			if (s.indexOf("?") < 0)
			{
				s = s.concat("?");
			}
			else if (s.substring(s.length - 1, 1) != "?")
			{
				s = s.concat("&");
			}

			s = s.concat("$skip=").concat(this.skip ? this.skip + "" : "0");
			if (this.top && this.top > 0)
			{
				s = s.concat("&$top=" + this.top);
			}
			if (this.inlineTotalCount)
			{
				s = s.concat("&$inlinecount=allpages");
			}
			if (this.filter && this.filter.length > 0)
			{
				s = s.concat("&$filter=").concat(encodeURIComponent(this.filter));
			}
			if (this.orderBy && this.orderBy.length > 0)
			{
				s = s.concat("&$orderby=").concat(encodeURIComponent(this.orderBy));
			}
			if (this.expand && this.expand.length > 0)
			{
				s = s.concat("&$expand=").concat(encodeURIComponent(this.expand));
			}
			if (this.select && this.select.length > 0)
			{
				s = s.concat("&$select=").concat(encodeURIComponent(this.select));
			}

			return s;
		}

	}

	class FilterBuilder implements IFilterBuilder
	{
		dateTimeOffsetFilter(arg: string, operator: ComparisonOperator, val: any): string
		{
			return this.dateFilter(arg, "datetimeoffset", operator, val);
		}

		dateTimeFilter(arg: string, operator: ComparisonOperator, val: any): string
		{
			return this.dateFilter(arg, "datetime", operator, val);
		}

		stringFilter(arg: string, operator: ComparisonOperator, val: string): string
		{
			if (operator == ComparisonOperator.contains)
			{
				return "substringof('{1}', {0})".format(arg, val);
			}
			else
			{
				return "{0} {2} '{1}'".format(arg, val, comparisonOperatorToString(operator));
			}
		}

		numberFilter(arg: string, operator: ComparisonOperator, val: number): string
		{
			return "{0} {2} {1}".format(arg, val, comparisonOperatorToString(operator));
		}

		private dateFilter(arg: string, type: string, operator: ComparisonOperator, val: any): string
		{
			var dt: Date;
			if (typeof val === "string")
			{
				dt = new Date(val);
			}
			else
			{
				dt = val;
			}

			return "{0} {1} {3}'{2}'".format(arg, comparisonOperatorToString(operator), dt.toJSON(), type);
		}

	}


	function comparisonOperatorToString(operator: ComparisonOperator): string
	{
		var s: string;

		switch (operator)
		{
			case ComparisonOperator.equals:
				s = "eq";
				break;

			case ComparisonOperator.greaterThan:
				s = "gt";
				break;
			case ComparisonOperator.greaterThanOrEquals:
				s = "ge";
				break;
			case ComparisonOperator.lessThan:
				s = "lt";
				break;
			case ComparisonOperator.lessThanOrEquals:
				s = "le";
				break;
			case ComparisonOperator.notEquals:
				s = "ne";
				break;
			default:
				throw "Unrecognized operator: " + operator;
		}

		return s;
	}

}