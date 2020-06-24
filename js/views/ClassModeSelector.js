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
        var url = querySettings.getYearsUrl()+"&classification=modern";

        $.getJSON(url,function(data){

            var modernAvailable = false;

            $.each( data, function( key, val ) {
               if(val !== 0) modernAvailable = true;
            });

            if(!modernAvailable){
                $.each( modes, function( key, mode ) {
                    if(mode.name == 'modern'){
                        mode.label = polyglot.t("no-modern");
                        mode.description = '';
                        mode.enabled = false;
                    }
                });
            }

            var tp   = $('#classmode-template').html();
            var template = _.template(tp);
            var html = template(vars);
            that.$el.append(html);
            that.setDocumentationLink();

            // when modern is disabled, select historical
            if(!modernAvailable) {
                $("input#classmode:not([disabled])").first().attr('checked','checked');
                that.onModeSelect();
            }
        })
    },

    setDocumentationLink:function(){
        var matched_files_modern = documentation.getLinks("Modern_Classification");
        var matched_files_hist = documentation.getLinks("Historical_Classification");
        var docs = matched_files_modern.concat(matched_files_hist);
        $("#classmodeselection .documentation").html("<br>"+ docs);
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