var Documentation = Backbone.Model.extend({

    files:[],

    url: function() {
        return querySettings.getDocumentationUrl()
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

    getLinks: function(match){

        match = match.toLowerCase();

        var matched_files = "";

        $.each(this.files,function(key, file){

            filename = file.name.toLowerCase();
            if(filename.indexOf(match) > 0){
                //matched_files += "<a href='"+file.url+"' target='_blank'>"+polyglot.t("documentation")+"</a> ("+ file.name.substr(file.name.indexOf(".")+1)  +")<br>";\
                matched_files += "<a href='"+file.url+"' target='_blank'>"+file.name+"</a><br>";
            }
        });

        return matched_files
    }

});