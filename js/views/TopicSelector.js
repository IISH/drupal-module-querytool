/**
 *   Main function for the topic selection
 */

var TopicSelector = Backbone.View.extend({

    el:"#topicselection",
    timerCount:0,
    mouseDirection:"v",

    initialize: function() {
        $(window).on("resize", this.setMainSize);
        this.setMainSize();

        var PrevX = 0;
        var PrevY = 0;
        var difX;
        var difY;

        var that = this;
        var tc = 0;

        $( "#topicselection" ).mousemove(function( event ) {

            if(that.timerCount > tc){

                difX = PrevX - event.pageX;
                difY = PrevY - event.pageY;
                difX = difX*difX;
                difY = difY*difY;

                if(difX <  difY){
                    that.mouseDirection = "v";
                }else{
                    that.mouseDirection = "h";
                }
                PrevX = event.pageX;
                PrevY = event.pageY;
                tc = that.timerCount
            }
        });

        setInterval(function(){
            that.timerCount++;
        }, 500);

    },

    setMainSize:function(){
        $("#main").width($(window).width()-70);
    },

    events:{
        'click #btn-generate':'generate'
    },

    update:function(){
        var checked =  $("#topicselection .checked").length;
        if(checked > 0){
            $("#btn-generate").show();

        }else{
            $("#btn-generate").hide();
        }
    },
    generate:function(e){
        resultView.render();
        queryModuleView.showNextStep(5);

        $("#result").show();
    }

});