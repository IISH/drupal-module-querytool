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
        build();
    },

    getLinks: function(match){
        //console.log("match on:"+ match);

        var matched_files = "";
       // console.debug(this.files);
        $.each(this.files,function(key, file){
            //console.log("-"+ file.name);
            if(file.name.indexOf(match) > 0){
                matched_files += "<a href='"+file.url+"' target='_blank'>"+polyglot.t("documentation")+"</a> ("+ file.name.substr(file.name.indexOf(".")+1)  +")<br>";
            }
        });

        return matched_files
    }

});