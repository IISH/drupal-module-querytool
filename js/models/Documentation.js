var Documentation = Backbone.Model.extend({

    files:[],

    url: function() {
        return querySettings.getDocumentationUrl()
    },


    processFiles: function(data){
        console.debug(data);

    }


});