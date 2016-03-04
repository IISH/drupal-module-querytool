/**
 *   A general view
 */

var QueryModuleView = Backbone.View.extend({

    initialize:function(){
    },


    updateSteps:function(){
        var step = 1;

        $.each($(".stepnum:visible"),function(e){
            $(this).html(step+". ");
            step++;
        });
    }





});



