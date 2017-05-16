/**
 *   The ClassBoxView generates a list of topics for a specific level
 */
var ClassBoxView = Backbone.View.extend({

    connector:      null,
    currentFocussed:null,
    useSwitch:      false,
    level:null,

    render:function(level,topics){

        var that = this;
        var template;
        var html;
        var vars;
        var topics;

        this.level = level;
        that.level = level;

        // set up template and fill
        vars = {title: polyglot.t("level")+' '+level, topics:topics,level:level};
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

        // Adding tooltip for explanation
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

        this.updateCouter();
        return this;
    },

    events:{
        'mouseenter .topic'         :'omeTopicLink',
        'mouseenter .topic-list'    :'disableWindowScroll',
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

            if(childs.length > 0 || this.level < 4){
                that.connector.render(topic);
                $("#connector"+ this.level).show();
            }else{
                $("#connector"+ this.level).hide();
            }

            currentFocussed = topic;
        }
        this.updateCouter();

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
            this.checkParentDepthBox(topicId);
        }else{
            this.deselectParent(topicId);
            this.deselectNextDepth(topicId);
            $(cb).addClass('checked');
        }

        var tsboxId = $(cb).closest(".ts-box").attr("id");
        var that = this;

        if($(cb).hasClass("all")){

            if($(cb).hasClass("checked")){
                $("#"+ tsboxId +" .topic-list  .checkbox:visible").not(".checked").click();
                var totalVisible = $("#"+ tsboxId +" .topic-list .topic:visible").length;

                // Show a warning when not all items have a single checkbox (happens when indicator is a dot, see template)
                if($("#"+ tsboxId +" .topic-list  .checkbox:visible").length < totalVisible) {
                    alert("some indicator(s) cannot be aggregated at this level");
                }
            }else{
                $("#"+ tsboxId +" .topic-list  .checkbox.checked:visible").click();
            }

        }
        that.updateCouter();
        classification.updateSelection();
    },

    /**
     * called when single box is being unchecked, checks if depth-box of parent still has to in selected state
     *
     * @param topicId
     */
    checkParentDepthBox:function(topicId){
        var singleChecked = $("#"+topicId).closest(".ts-box").find(".topic-list .checked").length;
        var depthChecked = $("#"+topicId).closest(".ts-box").find(".topic-list .checked-depth").length;

        if(singleChecked+depthChecked == 0){
            var parentId = $("#"+ topicId).attr("data-parent");
            $("#"+parentId).find(".checkbox-depth").removeClass("checked-depth");
        }
    },

    /**
     * deselects single checkbox of parent item, because aggregation is only possible on lowest selected level
     * thereby it selects the depth checkbox to indicate a selection is made
     * @param topicId
     */
    deselectParent:function(topicId){
        var parentId = $("#"+ topicId).attr("data-parent");
        $("#"+parentId).find(".checkbox").removeClass("checked");
        $("#"+parentId).find(".checkbox-depth").addClass("checked-depth");
        if(parentId !== undefined && parentId !== "null") this.deselectParent(parentId);
    },

    toggleCheckboxDepth: function(e){

        var cb = e.currentTarget;
        $(cb).toggleClass('checked-depth');
        var tsboxId = $(cb).closest(".ts-box").attr("id");
        var topicId = $(cb).closest(".topic").attr("id");

        var that = this;
        if($(cb).hasClass("checked-depth")){
            that.selectNextDepth(topicId);
            that.deselectParent(topicId);
        }else{
            that.deselectNextDepth(topicId);
        }

        if($(cb).hasClass("all")){
            if($(cb).hasClass("checked-depth")){
                $("#"+ tsboxId +" .topic-list .checkbox-depth:visible").not(".checked-depth").click();
            }else{
                $("#"+ tsboxId +" .topic-list .checkbox-depth:visible.checked-depth").click();
            }
        }

        that.updateCouter();
        classification.updateSelection();
        that.checkParentDepthBox(topicId);
    },

    /**
     *
     * Select items at the next depth. Single checkbox if on lowest level, otherwise depth checkbox to select further down
     * @param topicId
     */
    selectNextDepth:function(topicId){
        var that = this;

        $("#"+topicId+" .checkbox").removeClass("checked");

        $.each($(".topic[data-parent='"+topicId+"']"),function(e,topic){
            if($(topic).find(".checkbox-depth").length == 0){
                $(topic).find(".checkbox").addClass("checked");
            }else{
                $(topic).find(".checkbox-depth").addClass("checked-depth");
                that.selectNextDepth($(topic).attr("id"));
            }
        });
    },

    deselectNextDepth:function(topicId){
        var that = this;
        $(".topic[data-parent='"+topicId+"'] .checkbox").removeClass("checked");
        $(".topic[data-parent='"+topicId+"'] .checkbox-depth").removeClass("checked-depth");
        $("#"+topicId+" .checkbox-depth").removeClass("checked-depth");

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