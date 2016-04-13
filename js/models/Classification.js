var Classification = Backbone.Model.extend({

    classListCollection:null,
    indexedClasses:[],


    defaults: {
        selectedClasses:[]
    },


    url: function() {
        return querySettings.getClassUrl();
    },

    initialize:function(){

    },

    getClasses:function(){
        this.clear();
        var that = this;

        $("#topic-lists").html("<img src='"+querySettings.get("moduleUrl")+"/img/loader.gif'>");
        this.fetch({
            success:function(r){
                that.structure(r);
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

        var classMode = querySettings.get("classmode");


        _.each(indexes, function(index) {
            var selectedClass =  that.indexedClasses[index];
            var sClass = {};

            if(classMode == "historical"){
                sClass.histclass1 = selectedClass.c1;
                if(selectedClass.level>=2) sClass.histclass2 = selectedClass.c2;
                if(selectedClass.level>=3) sClass.histclass3 = selectedClass.c3;
                if(selectedClass.level>=4) sClass.histclass4 = selectedClass.c4;

            }else{
                sClass.class1 = selectedClass.c1;
                if(selectedClass.level>=2) sClass.class2 = selectedClass.c2;
                if(selectedClass.level>=3) sClass.class3 = selectedClass.c3;
                if(selectedClass.level>=4) sClass.class4 = selectedClass.c4;

            }
            selectedClasses.push(sClass);
        });

        this.set({selectedClasses:selectedClasses});
    },

    structure :function(r){

        var that= this;

        // assign every new class and 'subclasses' an unique index to identify.
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
        var classMode = querySettings.get("classmode");


        //console.log(classMode);
        var class1,class2,class3,class4;

        _.each(classes, function(hclass) {
            if(classMode == "modern"){
                class1  = hclass.class1;
                class2  = hclass.class2;
                class3  = hclass.class3;
                class4  = hclass.class4;

            }else{
                class1  = hclass.histclass1;
                class2  = hclass.histclass2;
                class3  = hclass.histclass3;
                class4  = hclass.histclass4;
            }

            var tid = "";

            // redefine level
            hclass.level = parseInt(hclass.levels);

            newClass = {};

            if(!Tree.children[class1]){
                newClass = {"name": class1, "parent":"null", children:{}, class_id: classIndex,  level:1, parent_id: null, c1:class1};
                Tree.children[class1] = newClass;
                indexedClasses[classIndex] = newClass
                classIndex++;
            }

            if(class2 && !Tree.children[class1].children[class2]){
                newClass = {"name": class2, "parent":"null", children:{}, class_id: classIndex,  level:2, parent_id: Tree.children[class1].class_id, c1:class1, c2:class2};
                Tree.children[class1].children[class2] = newClass;
                indexedClasses[classIndex] = newClass
                classIndex++;
            }

            if(class3 && !Tree.children[class1].children[class2].children[class3]){
                newClass = {"name": class3, "parent":"null", children:{}, class_id: classIndex, level:3, parent_id: Tree.children[class1].children[class2].class_id, c1:class1, c2:class2, c3:class3, c4:class4};
                Tree.children[class1].children[class2].children[class3] = newClass;
                indexedClasses[classIndex] = newClass
                classIndex++;
            }

            if(class4 && !Tree.children[class1].children[class2].children[class3].children[class4]){
                newClass = {"name": class4, "parent":"null", children:{}, class_id: classIndex, level:4, parent_id: Tree.children[class1].children[class2].children[class3].class_id, c1:class1, c2:class2, c3:class3, c4:class4};
                Tree.children[class1].children[class2].children[class3].children[class4] = newClass;
                indexedClasses[classIndex] = newClass
                classIndex++;
            }
        });


        function loopChildren(obj,depth,parent_id) {
            var result = "";
            var childs = new Array();
            depth++;

            $.each(obj, function(k, v) {

                v.parent_id = parent_id;

                childs.push(v);
                if(v.children){
                    // converts object structure to array (for tree)
                    v.children = loopChildren(v.children,depth,v.class_id);
                    v.childCount =  Object.keys(v.children).length;

                }else{
                    v.childCount = 0;
                }
                levelData[depth-1].push(v);
            });
            return childs;
        }

        Tree.children = loopChildren(Tree.children,0,0);

        //console.debug(levelData);

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