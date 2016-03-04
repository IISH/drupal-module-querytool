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
    },

    events:{
        'change input':'onModeSelect'
    },

    onModeSelect:function(e){

        var val = $('input[name=classmode]:checked').val();
        this.model.updateMode(val);

        /*
        var r = true;

        // only ask when not empty
        if(this.model.get('classmode') !=="") r = confirm("Switching mode will reset the screen and all custom selections, are you sure?");

        if(r){


            if(val == "modern"){
                $("#yearselection").hide();
                querySettings.resetYear();
            }else{
                $("#yearselection").show();
            }



        }else{
            // reset to current value
            $('input[value='+this.model.get('classmode')).prop('checked', true);
        }
*/
    },

    selectMode:function(mode){
        $('input[value='+mode+']').prop("checked", true);
    }

});