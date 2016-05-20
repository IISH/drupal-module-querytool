/**
 *   ClassModeSelector; first step in interface
 *   Provides radio buttons for classification modes and saves selection to querysettings object
 */

var ClassModeSelector = Backbone.View.extend({

    el:"#classmodes",

    render:function(){
        var modes = this.model.get("classModes");
        var that = this;
        var vars = {modes:modes};
        var tp   = $('#classmode-template').html();
        var template = _.template(tp);
        var html = template(vars);
        that.$el.append(html);
        this.setDocumentationLink();
    },

    setDocumentationLink:function(){
        var matched_files = documentation.getLinks("Classification");
        $("#classmodeselection .documentation").html("<br>"+ matched_files);
    },

    events:{
        'change input':'onModeSelect'
    },

    onModeSelect:function(){
        var val = $('input[name=classmode]:checked').val();
        this.model.updateMode(val);
    },

    selectMode:function(mode){
        $('input[value='+mode+']').prop("checked", true);
    }

});