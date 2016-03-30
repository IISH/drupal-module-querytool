var ResultView = Backbone.Model.extend({

    el:"#regioncontainer",

    render:function(){

        var that = this;
        var postUrl = querySettings.get("baseUrl")+"aggregate";
        var postData = {"classification":   querySettings.get("classmode"),
                        "datatype":         querySettings.get("datatype"),
                        "language":         querySettings.get("lang"),
                        "path":             classification.get("selectedClasses")};

        // add year
        if( querySettings.get("classmode") == "historical" && querySettings.get("base_year") !== ""){
            postData.year = querySettings.get("base_year");
        }

        // add regions
        var regions = querySettings.get("regions");
        if(regions !== null && regions.length >0){
            postData.ter_code = regions;
        }

        // testing:
        // postData = {"classification":"historical","datatype":"1.01","language":"en","path":[{"histclass1":"душ женского пола"},{"histclass1":"душ мужского пола"},{"histclass1":"женщины"},{"histclass1":"мужчины"}],"ter_code":["1858_01","1897_01","1959_23_01","2002_80","1959_75_80","1897_02","2002_04","2002_22","1959_22","1858_100","1858_02","1897_03","1959_28","2002_28","1858_03","1897_04","1795_01","1959_29","2002_29","1858_90","1897_05","1858_04","1959_30","2002_30","1858_98","1897_06","1959_02","1858_87","1959_31","2002_31","1858_05","1897_07","1858_85","1897_93","1795_02","1959_32","2002_32","1959_03","1858_86","1795_14","2002_20","1959_06","2002_74","1959_74","1795_49","1858_78","1897_92","1959_75","2002_75","2002_87","1959_49_87","1959_21","2002_21","1959_05","1897_20","1858_17","1795_12","1858_84","1897_13","1897_21","1897_22","1858_19","1897_23","1858_80","1897_94","1858_81","1897_95","2002_88","1959_24_88","1897_89","1959_52","1959_22_04","1858_101","1858_102","1858_99","1858_16","1897_19","1795_13","1858_21","1897_26","1959_38","2002_38","2002_37","1959_37","2002_79","1959_27_79","1959_07","2002_07","1959_69","1959_39","2002_39","1858_23","1897_28","1959_08","1795_16","1858_24","1897_29","1959_40","2002_40","1959_41","2002_41","2002_09","1959_26_09","1959_10","1897_30","1795_15","1858_22","1897_27","1959_42","2002_42","2002_27","1959_27","1959_24_19","2002_86","1959_72_86","1897_90","1795_48","1858_76","1858_77","1897_91","1858_25","1897_31","1795_17","1858_26","1897_32","1959_43","2002_43","1795_18","1959_11","2002_11","2002_81","1959_59_81","2002_82","1959_41_82","1795_19","1858_28","1897_34","1959_44","2002_44","1858_27","1897_33","2002_23","1959_23","2002_24","1959_24","1897_35","1858_29","1897_36","1959_45","2002_45","1795_51","1858_30","1897_37","1795_21","1858_31","1897_38","1959_46","2002_46","1858_32","1897_39a","1897_39","1959_63","1959_47","2002_47","1858_33","1959_48","2002_48","1897_40","1858_35","1897_42","2002_49","1959_49","1959_12","2002_12","1897_65","1858_58","1795_22","1858_36","1897_43","1897_44","1795_23","1858_37","1959_13","2002_77","1795_24","1858_38","1897_45","1959_50","2002_50","1959_51","2002_51","2002_83","1959_29_83","1795_25","1858_39","1897_46","2002_52","1959_15","1795_27","1858_40","1897_47","1959_53","2002_53","1795_26","1858_88","1959_54","2002_54","1858_41","1897_48","1795_28","1858_44","1897_49","1959_55","2002_55","1795_29","1858_46","1897_51","1959_57","2002_57","1858_89","1858_42","1858_45","1897_50","1959_56","2002_56","1858_75","1897_86","1858_47","1897_53","1795_30","1959_58","2002_58","1795_31","1858_48","1897_54","1959_59","2002_59","1858_49","1897_55","1795_32","1897_57","1858_51","1795_33","1858_52","1897_58","1858_53","1897_59","1959_25","2002_25","1795_34","1858_54","1897_60","1959_60","2002_60","1858_50","1897_56","1858_55","1897_61","2002_01","2002_02","2002_03","2002_05","2002_06","2002_08","2002_10","2002_19","2002_13","2002_15","2002_16","1795_35","1795_36","1959_61","2002_61","1858_56","1897_62","1795_37","1959_62","2002_62","2002_14","1897_52","1959_65","2002_65","1858_57","1897_64","2002_63","1897_63","1795_39","1858_60","1897_67","1959_64","2002_64","1858_62","1897_69","1897_70","1858_79","1858_43","1858_91","1858_61","1897_68","1795_40","1858_63","1897_71","1795_41","1795_42","1858_64","1897_72","1959_67","2002_67","2002_78","1795_38","1858_59","1897_66","1959_34","1897_73","1858_65","2002_26","1959_26","1897_39b","1858_66","1897_74","2002_66","1959_66","1897_75","1795_43","1858_93","1858_94","1858_95","1858_96","1858_69","1897_78","1959_68","2002_68","1959_16","1795_20","1858_68","1897_77","1858_67","1897_76","2002_84","1959_24_84","1897_80","1858_71","1897_81a","1897_81","1858_72","1897_82","1795_45","1858_73","1897_83","1959_70","2002_70","1858_92","1897_24","1858_20","1897_25","1795_46","1858_74","1897_84","1959_71","2002_71","1897_85","1959_17","1795_44","1858_70","1897_79","2002_69","1959_72","2002_72","2002_17","1959_18","2002_18","1897_88","1795_47","1959_73","2002_73","1858_97","1897_87","2002_85","1959_38_85","1858_06","1897_08","1795_10","1858_15","1897_18","1795_03","1897_10","1858_08","1858_09","1897_11","1795_04","1858_10","1897_12","1959_33","2002_33","2002_34","1858_12","1897_15","1795_07","1795_06","1858_11","1897_14","1959_35","2002_35","1795_08","1897_16","1858_13","1959_36","2002_36","1795_05","1795_09","1858_14","1897_17","1858_07","1897_09","1959_14","1858_82","1897_96","2002_89","1959_72_89","1795_50","1897_97","1858_83","1959_76","2002_76","1858_18","1795_11","1897_81b","1858_34","1897_41"]};

        // reset
        $("#preview-message").html("<img src='"+querySettings.get("moduleUrl")+"/img/loader.gif'>");
        $("#preview .zui-scroller").html("");
        $("#preview .zui-scroller").hide();

        // send request
        $.ajax({
            url: postUrl,
            method: 'post',

            data: JSON.stringify(postData),

            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            },

            dataType: 'json',
            success: function (response) {

                $("#preview-message").html("");
                if(querySettings.get("classmode") == "historical"){
                    that.structuringData(response.data);
                }else{
                    $("#preview-message").html(polyglot.t("nopreview"));

                }
                $("#preview").show();
                that.setDownloadBtn(response.url);
            }
        });
    },


    structuringData: function(data){

        var sData = {};
        var key;
        var newRecord;

        var regions = [];
        var region;

        var that = this;
        _.each(data, function(record) {

            // key
            path = "";
            for (var property in record.histclases) {
                if (record.histclases ) {
                    path += record.histclases[property];
                }
            }

            key = "class"+that.hashCode(path);

            region = {ter_code:record.ter_code, territory:record.territory, value:record.value};

            if(sData[key]){
                sData[key].territories.push(region);
            }else{
                newRecord = record;
                newRecord.territories = [region];
                sData[key] = newRecord;
            }

            var fw = _.findWhere(regions, {ter_code:record.ter_code});

            if(fw  == undefined ){
                regions.push(region);
            }

        });

        regions = _.sortBy(regions, function(o) { return o.ter_code; })

        this.buildTable(sData, regions);
    },


    hashCode: function(s){
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    },

    /**
     *  Builds preview table
     */
    buildTable:function(data, regions){

       // var regions = querySettings.get("regions");
        var table = "";

        table += "<table class='zui-table'>";
        table += "<thead><tr>"

        // adding levels
        for(var l = 1; l <= 4; l++){
            table += "<th class='zui-sticky-col'>"+ polyglot.t("level")+ " "  + l + "</th>";
        }

        table += "<th class='zui-sticky-col'>Unit</th>";
        table += "<th class='zui-sticky-col'>Count</th>";

        // adding regions
        _.each(regions, function(region) {
            table += "<th>" + region.territory +  "</th>";
        });

        table += "</tr></thead><tbody>";


        // displaying data
        _.each(data, function(item) {


            table += "<tr>"

            for(var l = 1; l <= 4; l++){

                if(item.histclases["histclass"+l]){
                   var classname = item.histclases["histclass"+l];
                }else{
                    var classname = "&nbsp;";
                }
                table += "<td class='zui-sticky-col'> <span data-toggle='tooltip' title='"+classname+"'>"+classname  + "</span></td>";
            }

            table += "<td class='zui-sticky-col'>" + item.value_unit +  "</td>";
            table += "<td class='zui-sticky-col'>" + item.territories.length +  "</td>";

            // output regions
            _.each(regions, function(region) {

                var item_region = _.findWhere(item.territories, {ter_code:region.ter_code})

                if(item_region  == undefined ){
                    table += "<td> &nbsp; </td>";
                }else{

                    table += "<td>" + item_region.value +  "</td>";
                }

            });

            table += "</tr>"
        });




        table += "</tbody></table>"


        $("#preview .zui-scroller").html(table);

        $('[data-toggle="tooltip"]').tooltip({
            container: '#preview'
        });


        $("#preview .zui-scroller").css("width",$(window).width() *.95-760);
        $("#preview .zui-scroller").show();

    },

    /**
     *  Sets download url for button
     */
    setDownloadBtn:function(url){
        if(url){
            $('#btn-download').show();
            $('#btn-download').click(function(){
                window.open(url);
            });
        }else{
            $('#btn-download').hide();
        }
    }

});