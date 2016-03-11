var Classification = Backbone.Model.extend({

    classListCollection:null,

    url: function() {
       // var urlTail = "datatype="+ querySettings.get("datatype");
       // urlTail += "year="+querySettings.get("year");
        return querySettings.getClassUrl();
    },

    initialize:function(){
        this.getClasses();
    },

    getClasses:function(){
        var that = this;
        this.fetch({
            success:function(r){
                that.structurize(r);
            }
        });
    },

    updateSelection:function(){
        var selection = new Array();
            $.each($(".topic"),function(e){
            if($(this).find(".checked").length >0 ){  //|| $(this).find(" .checked-all").length >0
                selection.push($(this).attr("id"));
            }
        });
        querySettings.updateClasses(selection);
    },

    structurize :function(r){
        /*
         JSON requirements: parent values have to be given prior to childs in order to get parent ids
         */
        var TreeData = new Array();
        TreeData.push({
            "name": "Start",
            "parent": "null",
            "children": new Array()
        });

        var i = 0;

        TreeData[0].children.testkey = { name: "test", "parent":"null" };

        // init data
        var levelData = new Array();
        for(var j =0;j<5;j++){
            levelData[j] = new Array();
        }

        // set up object for indexing by name (or id) instead of arrays
        var Tree = {children:{}};
        var newClass;

        // sort classes to be sure 'higher' level classes wil be addded first prior to subclasses
// var classes = _.sortBy(r.attributes.data, 'class_id');
        var classes = r.attributes.data;//_.sortBy(r.attributes.data, 'level');

        _.each(classes, function(hclass) {

            i++;
            // if(i<999){
            console.debug(hclass.histclass_id);
            var hc1  = hclass.histclass1;
            var hc2  = hclass.histclass2;
            var hc3  = hclass.histclass3;
            var hc4  = hclass.histclass4;
           // var hcfull = hc1+hc2+hc3;

 //temp
hclass.class_id = hclass.histclass_id;

            newClass = {};

            //add to tree if not exists
            if(!Tree.children[hc1]){
                // if it is 1st level, add as complete and new object
                if(hclass.level==1){
                    newClass = {"name": hc1, "parent":"null", children:{}, histclass_id: hclass.class_id, level:hclass.level, parent_id: null};
                    Tree.children[hc1] = newClass;
                }else{
                    // or add string only to create
                    console.log("ERROR: class level doesn't match with Tree level 1; created temp one for: ",hclass.histclass_id);
                    // add without id
                    newClass = {"name": hc1, "parent":"null", children:{}, histclass_id: -1, level:1, parent_id: null};
                    Tree.children[hc1] = newClass;
                }
            }else{
                // if string is present check if it has an id, if not, add the id
                if(Tree.children[hc1].histclass_id == -1 && hclass.level==1){
                    Tree.children[hc1].histclass_id = hclass.class_id;
                }

            }

            if(hc2 !== "0" && !Tree.children[hc1].children[hc2]){
                if(hclass.level==2){
                    newClass = {"name": hc2, "parent":"null", children:{}, histclass_id: hclass.class_id, level:hclass.level, parent_id: Tree.children[hc1].histclass_id};
                    Tree.children[hc1].children[hc2] = newClass;
                    // levelData[1].push(newClass);
                }else{
                    console.log("ERROR: class level doesn't match with Tree level 2; created temp one for: ",hclass.class_id);
                    // add without id
                    newClass = {"name": hc2, "parent":"null", children:{}, histclass_id: -1, level:hclass.level, parent_id: Tree.children[hc1].histclass_id};
                    Tree.children[hc1].children[hc2] = newClass;
                   // return;
                }
            }else{
                // if string is present check if it has an id, if not, add the id
                if(Tree.children[hc1].children[hc2].histclass_id == -1 && hclass.level==2){
                    Tree.children[hc1].children[hc2].histclass_id = hclass.class_id;
                }

            }

            if(hc3 !== "0" && !Tree.children[hc1].children[hc2].children[hc3]){
                if(hclass.level==3){
                    newClass = {"name": hc3, "parent":"null", hc1:hc1, hc2:hc2, hc3:hc3, histclass_id: hclass.class_id, level:hclass.level, parent_id: Tree.children[hc1].children[hc2].histclass_id};
                    Tree.children[hc1].children[hc2].children[hc3] = newClass;
                    //levelData[2].push(newClass);
                }else{
                    console.log("ERROR: class level doesn't match with Tree level 3; parent item isn't added yet. ",hclass.class_id);
                    return;
                }
            }

            /*
            if(hc4 !== "0" && !Tree.children[hc1].children[hc2].children[hc3].children[hc4]){
                if(hclass.level==4){
                    newClass = {"name": hc4, "parent":"null", hc1:hc1, hc2:hc2, hc3:hc3, hc4:hc4, histclass_id: hclass.class_id, level:hclass.level, parent_id: Tree.children[hc1].children[hc2].children[hc3].histclass_id};
                    Tree.children[hc1].children[hc2].children[hc3].children[hc4] = newClass;
                    //levelData[2].push(newClass);
                }else{
                    console.log("ERROR: class level doesn't match with Tree level 4; parent item isn't added yet. ",hclass.class_id);
                    return;
                }
            }
            */
        });


        function loopChildren(obj,depth,parent_id) {

            console.debug(depth, obj);
            var result = "";
            depth++;

            var childs = new Array();

            $.each(obj, function(k, v) {
                console.debug("parent_id ",  v.parent_id);
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

console.debug("tree",Tree.children);
        Tree.children = loopChildren(Tree.children,0,0);

        this.classListCollection = new ClassListCollection();
        this.classListCollection.render(levelData);

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