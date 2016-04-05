/**
 *   Provides radio buttons for modes and saves selection to querysettings
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

        var matched_files = "";
        $("#classmodeselection .documentation").html("");

        var modes = [];
        $.each(this.model.get("classModes"), function( index, value ){
            modes.push(value.name);
        });

        $.each( querySettings.get("files"), function( index, value ){
            $.each(modes,function(i,v){
                if(index.toLocaleLowerCase().indexOf(v) > 0){
                    matched_files += "- <a href='"+value+"' target='_blank'>"+index+"</a><br>";
                }
            });
        });

        if(matched_files !== "") matched_files = "<br><b>"+polyglot.t("documentation")+"</b><br>"+ matched_files;
        $("#classmodeselection .documentation").html(matched_files);
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