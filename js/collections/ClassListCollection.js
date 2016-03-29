
var ClassListCollection = Backbone.Collection.extend({

    render: function(tree){

        var levels = new Array(1,2,3,4);
        var classBox;


        $("#topic-lists").html("");
        var that = this;

        _.each(levels,function(level){
            // create div for holding the views
            $("#topic-lists").append('<div class="ts-box" id="ts-box-'+level+'"></div>');
            classBox = new ClassBoxView({el:$("#ts-box-"+level)});
            classBox.render(level,tree[level-1]);

            that.add(classBox);
        });
        return this;
    },
    destroyModels:function(){

        this.each(function(model) {

            model.destroy();
        });
    }


});
