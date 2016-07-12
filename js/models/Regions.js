var Regions = Backbone.Model.extend({
    url: function() {
        return querySettings.getRegionsUrl()
    }
});