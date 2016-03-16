/**
 *   The ClassBoxView generates a list of topics for a specific level
 */


var ClassBoxView = Backbone.View.extend({

    connector:      null,
    currentFocussed:null,
    useSwitch:      false,

    render:function(level,topics){

        var that = this;
        var template;
        var html;
        var vars;
        var topics;

        that.level = level;

        // set up template and fill
        vars = {title:'Level '+level, topics:topics,level:level};
        tp = $('#topic-list-template').html();
        template = _.template(tp);
        html = template(vars);
        that.$el.append(html);

        // add tooltips for long titles
        var listWidth = $("#topic-list-1").width()-80;
        $.each($(".topic"),function(i,val){
            if($(this).find("span").width()>listWidth){
                $(this).attr("data-toggle","tooltip");
            }else{
                $(this).attr("title","");
            }
        });

        // Addding tooltip for explenation
        $('[data-toggle="tooltip"]').tooltip({
            container: '#main'
        });
        $(".checkbox").on('show.bs.tooltip', function() {
            $('.tooltip').not(this).hide();
        });
        $(".checkbox-depth").on('show.bs.tooltip', function() {
            $('.tooltip').not(this).hide();
        });

        // Set connector shape to right side of box
        var connector = new Connector({el:$("#connector"+level)});
        that.connector = connector;
        this.$el.find(".topic-list").scroll(function(){
            that.connector.render();
        });
        return this;
    },

    events:{
        'mouseenter .topic'         :'omeTopicLink',
        'mouseenter  .topic-list'   :'disableWindowScroll',
        'mouseleave .topic-list'    :'enableWindowScroll',
        'click .checkbox'           :'toggleCheckbox',
        'click .checkbox-depth'     :'toggleCheckboxDepth',
        'click .switch'             :'ocSwitch'
    },

    omeTopicLink: function(e){

        var topic = e.currentTarget;
        if($(topic).hasClass("focus") == false){

            // reset
            $(topic).closest(".ts-box").find(".topic.focus").removeClass('focus');
            $(topic).closest(".ts-box").nextAll().find(".topic").css("display","none");
            $(topic).closest(".ts-box").nextAll().find(".focus").removeClass('focus');
            $(topic).closest(".ts-box").nextAll().find(".connector").html("");
            $(topic).closest(".ts-box").nextAll().find(".nosubitems").css("display","none");

            // find childs
            var id = $(topic).closest(".topic").attr("id");
            var childs =  $(".topic[data-parent='"+id+"']");
            var that = this;

            // show childs or no childs-message
            $(childs).fadeTo(200,1);
            if($(childs).length == 0) $(topic).closest(".ts-box").next().find(".nosubitems").fadeTo(200,1);

            $(topic).closest(".ts-box").next().find(".switch").attr("data-parent",id);
            $(topic).addClass("focus");

            that.updateCouter();
            that.connector.render(topic);
            currentFocussed = topic;
        }
    },

    // disables window scroll when reaching scroll-end of scrollable div (topic lists)
    disableWindowScroll: function(e){
        $('html, body').css({
            'overflow': 'hidden'
        });
    },
    enableWindowScroll: function(e){
        $('html, body').css({
            'overflow': 'auto',
            'overflow-x': 'hidden'
        });
    },

    toggleCheckbox: function(e){

        var cb = e.currentTarget;
        var topicId = $(cb).closest(".topic").attr("id");

        if($(cb).hasClass('checked')){
            $(cb).removeClass('checked');
        }else{
            this.selectParent(topicId);
            $(cb).addClass('checked');
        }

        var tsboxId = $(cb).closest(".ts-box").attr("id");
        var that = this;

        if($(cb).hasClass("all")){
            if($(cb).hasClass("checked")){
                $("#"+ tsboxId +"  .checkbox:visible").addClass("checked");
            }else{
                $("#"+ tsboxId +"  .checkbox:visible").removeClass("checked");
            }
        }
        that.updateCouter();
        classification.updateSelection();
    },


    selectParent:function(topicId){
        var parentId = $("#"+ topicId).attr("data-parent");
        $("#"+parentId).find(".checkbox").addClass("checked");
        if(parentId !== undefined && parentId !== "null") this.selectParent(parentId);
    },

    toggleCheckboxDepth: function(e){

        var cb = e.currentTarget;
        $(cb).toggleClass('checked-depth');
        var tsboxId = $(cb).closest(".ts-box").attr("id");
        var topicId = $(cb).closest(".topic").attr("id");

        var that = this;
        if($(cb).hasClass("checked-depth")){
            $("#"+topicId).find(".checkbox").addClass("checked");
            that.selectNextDepth(topicId);
        }else{
            that.deselectNextDepth(topicId);
        }

        if($(cb).hasClass("all")){
            if($(cb).hasClass("checked-depth")){
                $("#"+ tsboxId +" .topic-list .checkbox-depth:visible").removeClass("checked-depth"); //remove all existing selections to prevent invert selections
                $("#"+ tsboxId +" .topic-list .checkbox-depth:visible").click();
                $("#"+ tsboxId +" .topic-list .checkbox:visible").addClass('checked');
            }else{
                $("#"+ tsboxId +" .topic-list .checkbox-depth:visible").addClass("checked-depth"); // select all first to prevent invert selections
                $("#"+ tsboxId +" .topic-list .checkbox-depth:visible").click();
            }
        }

        that.updateCouter();
        classification.updateSelection();
    },

    selectNextDepth:function(topicId){
        var that = this;
        $(".topic[data-parent='"+topicId+"'] .checkbox").addClass("checked");
        $(".topic[data-parent='"+topicId+"'] .checkbox-depth").addClass("checked-depth");

        $.each($(".topic[data-parent='"+topicId+"']"),function(e,topic){
            that.selectNextDepth($(topic).attr("id"));
        });
    },
    deselectNextDepth:function(topicId){
        var that = this;
        $(".topic[data-parent='"+topicId+"'] .checkbox").removeClass("checked");
        $(".topic[data-parent='"+topicId+"'] .checkbox-depth").removeClass("checked-depth");

        $.each($(".topic[data-parent='"+topicId+"']"),function(e,topic){
            that.deselectNextDepth($(topic).attr("id"));
        });
    },


    ocSwitch:function(e){
        var switchBtn = $(e.currentTarget);
        var parent_id = $(switchBtn).attr("data-parent");
        var list = $(switchBtn).closest(".ts-box").find(".topic-list");

        // check if number of visible items is equal to num of children of parent (singel parent only; default state)
        if($(list).find(".topic:visible").length == $(list).find(".topic[data-parent='"+parent_id+"']:visible").length ){
            $(switchBtn).attr("data-state","all");
            $(list).find(".checked").closest(".topic").show();
            $(list).find(".checked").closest(".topic[data-parent!='"+parent_id+"']").fadeTo(0,.5);
        }else{
            $(switchBtn).attr("data-state","single");
            $(list).find(".checked").closest(".topic[data-parent!='"+parent_id+"']").hide();
        }
        var that = this;
        that.updateCouter();
    },


    updateCouter:function(){

        var useSwitch = this.useSwitch;
        $.each($(".ts-box"),function(e){
            var count = 0;
            var countSingle = 0;
            var countDepth = 0;
            var total = $(this).find(".topic:visible").length;
            var totalWithDepth =  $(this).find(".topic:visible .checked-depth").length;
            var overallTotal = $(this).find(".topic .checked").length;

            $.each($(this).find(".topic:visible"),function(e){
                if($(this).find(".checked").length >0 || $(this).find(" .checked-all").length >0 ) count++;
                if($(this).find(".checked").length >0) countSingle++;
                if($(this).find(".checked-depth").length >0) countDepth++;
            });

            $(this).find(".selected").html(count);
            $(this).find(".total").html(total);

            // handle visability of 'all' checkboxes
            if($(this).find(".topic .checkbox:visible").length>0){
                $(this).find(".checkbox.all").parent().show();
            }else{
                $(this).find(".checkbox.all").parent().hide();
            }

            if($(this).find(".topic .checkbox-depth:visible").length>0){
                $(this).find(".checkbox-depth.all").parent().show();
            }else{
                $(this).find(".checkbox-depth.all").parent().hide();
            }

            // handle accurate state of 'all' checkboxes
            if(countSingle > total/2){
                $(this).find(".checkbox.all").addClass("checked");
            }else{
                $(this).find(".checkbox.all").removeClass("checked");
            }

            if(countDepth > totalWithDepth/2){
                $(this).find(".checkbox-depth.all").addClass("checked-depth");
            }else{
                $(this).find(".checkbox-depth.all").removeClass("checked-depth");
            }

            if(useSwitch){
                var modeSwitch = $(this).find(".switch");

                if(modeSwitch.attr("data-state") == "all"){
                    modeSwitch.html('hide other parents children');
                }else{
                    modeSwitch.html('show all '+overallTotal+' selected items');
                }

                if(overallTotal>0){
                    modeSwitch.show();
                }else{
                    modeSwitch.hide();
                }
            }

        });

        topicSelector.update();
    }

});