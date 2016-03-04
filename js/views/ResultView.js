var ResultView = Backbone.Model.extend({

    el:"#regioncontainer",

    render:function(){
        var url = querySettings.getPreviewUrl();
       $('#preview_url').val(url);

        $('#preview').attr("src",url);
    }
});