/**
 *   A general view
 */

var QueryModuleView = Backbone.View.extend({

    initialize:function(){
        if(querySettings.get("debugmode")){
          $(".step").show();
        }else{
            $(".step").first().show();
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
        $("#main > div.step:nth-child("+stepnum+")").show();
        this.updateSteps();
    }
});



