/**
 *   A general view
 */

var QueryModuleView = Backbone.View.extend({

    initialize:function(){

        if(querySettings.get("debugmode")){
            this.$el.show();
        }
    },

    updateSteps:function(){
        var step = 1;

        $.each($(".stepnum:visible"),function(e){
            $(this).html(step+". ");
            step++;
        });
    },

    showNextStep:function(stepnum){
        $(".step:nth-child("+stepnum+")").show();
        this.updateSteps();
    }
});



