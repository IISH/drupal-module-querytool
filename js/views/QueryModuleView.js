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

    hideNextSteps:function(stepnum){
        $("#main > div.step:nth-child(n+"+stepnum+")").hide();
    },
    showNextStep:function(stepnum){
        $("#main > div.step:nth-child("+stepnum+")").show();
        this.updateSteps();
    }
});



