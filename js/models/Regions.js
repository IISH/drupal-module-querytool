var Regions = Backbone.Model.extend({
   // url:"regions.json"
   // url: '/sites/all/modules/custom/querytool/json/regions.json',
    //url: querySettings.getRegionsUrl()
    url: function() {
        // var urlTail = "datatype="+ querySettings.get("datatype");
        // urlTail += "year="+querySettings.get("year");
        return querySettings.getRegionsUrl()
    }
});