var Documentation = Backbone.Model.extend({

    files:[],

    url: function() {
        return querySettings.getDocumentationUrl();
    },

    getFiles: function(){
        var me = this;
        this.fetch({
            success: function(r){
                me.processFiles(r.attributes);

            }
        });
    },

    processFiles: function(data){
        this.files = data

        build(); // in App.js
    },

    getLinks: function(match, matchDatatype){

        if (typeof matchDatatype === 'undefined') { matchDatatype = false; }

        match = match.toLowerCase();

        var matched_files = "";
        var datatype = querySettings.getDataType();// eg 1.01;
        var datatypeArray = datatype.split(".");
        var mainDatatype = datatypeArray[0];
        var filename;

        $.each(this.files,function(key, file){

            filename = file.name.toLowerCase();

            if(filename.indexOf(match) > 0){

                if(!matchDatatype || (matchDatatype && filename.indexOf("_"+mainDatatype+"_") > 0)){
                    matched_files += "<a href='"+file.url+"' target='_blank'>"+file.name+"</a><br>";
                }
            }
        });

        return matched_files;
    }

});