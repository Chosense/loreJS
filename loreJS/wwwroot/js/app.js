var filterBuilder = lorejs.odata.filterBuilder();
var op = lorejs.odata.ComparisonOperator.equals;
var filter1 = filterBuilder.stringFilter("Name", lorejs.odata.ComparisonOperator.contains, "Buddy");
if (filter1) {
}
//# sourceMappingURL=app.js.map