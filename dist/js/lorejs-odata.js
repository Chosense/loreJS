/// <reference path="lorejs.d.ts" />
var lorejs;
(function (lorejs) {
    var odata;
    (function (odata) {
        lorejs.odata.filterBuilder = function () {
            return new FilterBuilder();
        };
        lorejs.odata.queryOptions = function (options) {
            return new QueryOptions(options);
        };
        var QueryOptions = (function () {
            function QueryOptions(options) {
                this.defaultTop = 20;
                if (options) {
                    this.expand = options.expand;
                    this.filter = options.filter;
                    this.inlineTotalCount = options.inlineTotalCount;
                    this.orderBy = options.orderBy;
                    this.select = options.select;
                    this.skip = options.skip;
                    this.top = options.top;
                }
                else {
                    this.skip = 0;
                    this.top = this.defaultTop;
                }
            }
            QueryOptions.prototype.buildUrl = function (baseUrl) {
                var s = baseUrl != null ? baseUrl : "";
                if (s.indexOf("?") < 0) {
                    s = s.concat("?");
                }
                else if (s.substring(s.length - 1, 1) != "?") {
                    s = s.concat("&");
                }
                s = s.concat("$skip=").concat(this.skip ? this.skip + "" : "0");
                if (this.top && this.top > 0) {
                    s = s.concat("&$top=" + this.top);
                }
                if (this.inlineTotalCount) {
                    s = s.concat("&$inlinecount=allpages");
                }
                if (this.filter && this.filter.length > 0) {
                    s = s.concat("&$filter=").concat(encodeURIComponent(this.filter));
                }
                if (this.orderBy && this.orderBy.length > 0) {
                    s = s.concat("&$orderby=").concat(encodeURIComponent(this.orderBy));
                }
                if (this.expand && this.expand.length > 0) {
                    s = s.concat("&$expand=").concat(encodeURIComponent(this.expand));
                }
                if (this.select && this.select.length > 0) {
                    s = s.concat("&$select=").concat(encodeURIComponent(this.select));
                }
                return s;
            };
            return QueryOptions;
        })();
        var FilterBuilder = (function () {
            function FilterBuilder() {
            }
            FilterBuilder.prototype.dateTimeOffsetFilter = function (arg, operator, val) {
                return this.dateFilter(arg, "datetimeoffset", operator, val);
            };
            FilterBuilder.prototype.dateTimeFilter = function (arg, operator, val) {
                return this.dateFilter(arg, "datetime", operator, val);
            };
            FilterBuilder.prototype.stringFilter = function (arg, operator, val) {
                if (operator == odata.ComparisonOperator.contains) {
                    return "substringof('{1}', {0})".format(arg, val);
                }
                else {
                    return "{0} {2} '{1}'".format(arg, val, comparisonOperatorToString(operator));
                }
            };
            FilterBuilder.prototype.numberFilter = function (arg, operator, val) {
                return "{0} {2} {1}".format(arg, val, comparisonOperatorToString(operator));
            };
            FilterBuilder.prototype.dateFilter = function (arg, type, operator, val) {
                var dt;
                if (typeof val === "string") {
                    dt = new Date(val);
                }
                else {
                    dt = val;
                }
                return "{0} {1} {3}'{2}'".format(arg, comparisonOperatorToString(operator), dt.toJSON(), type);
            };
            return FilterBuilder;
        })();
        function comparisonOperatorToString(operator) {
            var s;
            switch (operator) {
                case odata.ComparisonOperator.equals:
                    s = "eq";
                    break;
                case odata.ComparisonOperator.greaterThan:
                    s = "gt";
                    break;
                case odata.ComparisonOperator.greaterThanOrEquals:
                    s = "ge";
                    break;
                case odata.ComparisonOperator.lessThan:
                    s = "lt";
                    break;
                case odata.ComparisonOperator.lessThanOrEquals:
                    s = "le";
                    break;
                case odata.ComparisonOperator.notEquals:
                    s = "ne";
                    break;
                default:
                    throw "Unrecognized operator: " + operator;
            }
            return s;
        }
    })(odata = lorejs.odata || (lorejs.odata = {}));
})(lorejs || (lorejs = {}));
//# sourceMappingURL=lorejs-odata.js.map