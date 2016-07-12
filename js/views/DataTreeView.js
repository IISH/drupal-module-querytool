/**
 *   Prepares and starts build of the tree
 */

var DataTreeView =  Backbone.View.extend({
    render:function(data){

        $("#tree-container").html("");

        var TreeData = new Array();
        TreeData.push({
            "name": "Start",
            "parent": "null",
            "children": data.children
        });
        treeJSON(TreeData[0]);
    }
});