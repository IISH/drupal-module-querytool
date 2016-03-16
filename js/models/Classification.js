var Classification = Backbone.Model.extend({

    classListCollection:null,
    indexedClasses:[],

    url: function() {
       // var urlTail = "datatype="+ querySettings.get("datatype");
       // urlTail += "year="+querySettings.get("year");
        return querySettings.getClassUrl();
    },

    initialize:function(){
        this.getClasses();
    },

    getClasses:function(){
        this.clear();
        var that = this;

        this.fetch({
            success:function(r){
                that.structurize(r);
            }
        });
    },

    updateSelection:function(){
        var indexes = new Array();
        var path = "";
        var that = this;
        $.each($(".topic"),function(e){
            if($(this).find(".checked").length >0 ){  //|| $(this).find(" .checked-all").length >0
                indexes.push($(this).attr("id"));
            }
        });



        querySettings.updateClasses(indexes);
        this.getClassesByIndex(indexes);
    },

    getTopicPath:function(id,path){
        path +=  ">"+id;

        var parent_id = $('#'+id).attr('data-parent');
        if(parent_id !== "0"){
            path += this.getTopicPath(parent_id, path);
        }

        return path;
    },

    getClassesByIndex:function(indexes){

        var selectedClasses = new Array();
        var that = this;

        _.each(indexes, function(index) {
            var selectedClass =  that.indexedClasses[index];
            selectedClasses.push({histclass1:selectedClass.name});
        });

        console.debug(selectedClasses);

    },


    structurize :function(r){

        //assign every new class and 'subclasses' an unique index to identify.
        var classIndex = 1;

        // init data
        var indexedClasses = new Array();
        var levelData = new Array();
        for(var j =0;j<5;j++){
            levelData[j] = new Array();
        }

        // set up object for indexing by name instead of arrays
        var Tree = {children:{}};
        var newClass;

        var classes = r.attributes;

        _.each(classes, function(hclass) {

            var hc1  = hclass.histclass1;
            var hc2  = hclass.histclass2;
            var hc3  = hclass.histclass3;
            var hc4  = hclass.histclass4;
            var tid = "";

            // redefine level
            hclass.level = parseInt(hclass.levels);

            newClass = {};

            if(!Tree.children[hc1]){
                newClass = {"name": hc1, "parent":"null", children:{}, histclass_id: classIndex,  level:1, parent_id: null};
                Tree.children[hc1] = newClass;
                indexedClasses[classIndex] = newClass
                classIndex++;
            }

            if(hc2 && !Tree.children[hc1].children[hc2]){
                newClass = {"name": hc2, "parent":"null", children:{}, histclass_id: classIndex,  level:2, parent_id: Tree.children[hc1].histclass_id};
                Tree.children[hc1].children[hc2] = newClass;
                indexedClasses[classIndex] = newClass
                classIndex++;
            }

            if(hc3 && !Tree.children[hc1].children[hc2].children[hc3]){
                newClass = {"name": hc3, "parent":"null", children:{}, histclass_id: classIndex, level:3, parent_id: Tree.children[hc1].children[hc2].histclass_id};
                Tree.children[hc1].children[hc2].children[hc3] = newClass;
                indexedClasses[classIndex] = newClass
                classIndex++;
            }

            if(hc4 && !Tree.children[hc1].children[hc2].children[hc3].children[hc4]){
                newClass = {"name": hc4, "parent":"null", children:{}, histclass_id: classIndex, level:4, parent_id: Tree.children[hc1].children[hc2].children[hc3].histclass_id};
                Tree.children[hc1].children[hc2].children[hc3] = newClass;
                indexedClasses[classIndex] = newClass
                classIndex++;
            }
        });


        function loopChildren(obj,depth,parent_id) {
            var result = "";
            var childs = new Array();
            depth++;

            $.each(obj, function(k, v) {
                //console.debug("parent_id ",  v.parent_id);
                v.parent_id = parent_id;

                childs.push(v);
                if(v.children){
                    // converts object structure to array (for tree)
                    v.children = loopChildren(v.children,depth,v.histclass_id);
                    v.childCount =  Object.keys(v.children).length;

                }else{
                    v.childCount = 0;
                }
                levelData[depth-1].push(v);
            });
            return childs;
        }

        Tree.children = loopChildren(Tree.children,0,0);

        this.indexedClasses = indexedClasses;
        this.classListCollection = new ClassListCollection();
        this.classListCollection.render(levelData);


        /*
         var TreeData = new Array();
         TreeData.push({
         "name": "Start",
         "parent": "null",
         "children": new Array()
         });

         TreeData[0].children.testkey = { name: "test", "parent":"null" };
         */

        // TEMP FOR TEST
/*
        $("#ts-box-1 .topic:nth-child(-n+10)").hide();
        $("#2980 .checkbox-depth").click();
        $("#2993 .checkbox-depth").click();
*/
        var datatreeview = new DataTreeView();
        datatreeview.render(Tree);
    }

});