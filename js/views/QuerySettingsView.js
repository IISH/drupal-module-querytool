/**
 *   A debugging tool for displaying query parameters
 */

var QuerySettingsView = Backbone.View.extend({
    el:"#qsv",

    render:function(){
        var output = "<h5>Query parameters</h5>";
        object =this.model.attributes;
        var excludeProp = new Array("classModes","years");

        for (var property in object) {
            if (object.hasOwnProperty(property) && excludeProp.indexOf(property) == -1) {
                if(object[property] !== null && object[property].constructor === Array){
                    output += property + " : " + object[property].join(", ") + "<br>"
                }else{
                    output += property + " : " +object[property] + "<br>"
                }
            }
        }
        this.$el.html(output);
    },

    update: function(){
        this.render();
    }
});