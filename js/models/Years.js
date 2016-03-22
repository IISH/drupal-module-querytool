var Years = Backbone.Model.extend({

    years:[],

    url: function() {
        return querySettings.get("baseUrl")+'/years'
    }

});