var ResultView = Backbone.Model.extend({

    el:"#preview",

    render:function(){
        $("#result").show();
        $("html, body").animate({ scrollTop: $("#result").offset().top + 100  }, 1000);

        var that = this;
        var postUrl = querySettings.get("baseUrl")+"aggregation";
        var postData = {"classification":   querySettings.get("classmode"),
                        "datatype":         querySettings.get("datatype"),
                        "language":         querySettings.get("lang"),
                        "path":             classification.getSelection()};

        // add year
        if( querySettings.get("classmode") == "historical"){

            if( querySettings.get("base_year") !== ""){
                postData.base_year = querySettings.get("base_year");
            }

            // add regions
            var regions = querySettings.get("regions");
            if(regions !== null && regions.length >0){
                postData.ter_code = regions;
            }
        }


        // reset
        $("#preview-message").html("<img src='"+querySettings.get("moduleUrl")+"/img/loader.gif'>");
        $("#preview .zui-scroller").html("");
        $("#preview .zui-scroller").hide();

        // send request
        $.post({
            url: postUrl,
            type: 'post',
            data: JSON.stringify(postData),
            dataType: 'json',
            contentType: "application/json",
            // beforeSend: function (request) {
            //     request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            // },
            success: function (response) {

                if(querySettings.get("classmode") == "historical"){
                    that.structuringData(response.data);
                }else{
                    $("#preview-message").html(polyglot.t("nopreview"));
                }
                $("#preview").show();

                //get only filename or key to pass to license page
                var aUrl = response.url.split("=");
                var url = "/download/download/key/"+aUrl[1];

                if(querySettings.get("lang") == "ru"){
                    url ="/ru"+ url;
                }

                that.setDownloadBtn(url);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#preview-message").html("Sorry, something went wrong, please try again or contact us.");
            }
        });
    },


    structuringData: function(data){

        var sData = {};
        var key;
        var newRecord;
        var regions = [];
        var region;
        var maxDepth = 1;
        var that = this;

        _.each(data, function(record) {

            // key
            path = "";
            for (var property in record.path) {
                if (record.path ) {
                    path += record.path[property];
                }
            }
            var depth = Object.keys(record.path).length;
            if(depth > maxDepth) maxDepth = depth;

            key = "class"+that.hashCode(path);

            if(!sData[key]){
                newRecord = record;
                newRecord.territories = [];
                sData[key] = newRecord;
            }

            if(record.ter_code !== ""){
                region = {ter_code:record.ter_code, territory:record.territory, value:  record.total};
                sData[key].territories.push(region);
            }

            var fw = _.findWhere(regions, {ter_code:record.ter_code});

            if(fw  == undefined ){
                regions.push(region);
            }

        });

        //regions = _.sortBy(regions, function(o) { return o.ter_code; })

        this.buildTable(sData, maxDepth);
    },


    hashCode: function(s){
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    },


    /**
     *  Builds preview table
     */
    buildTable:function(data, maxDepth){

        // getting all selected regions
        var regions = regionSelector.getSelectedRegions();

        var hHeadingWidth = 800;
        var levels = maxDepth;
        var classWidth = (hHeadingWidth-150)/levels;
        var table = "";
        var regionScrollerWidth = $(window).width() *.95-hHeadingWidth;
        var dataWidth = $(window).width() -hHeadingWidth;
        $("#preview .zui-scroller").css("width",dataWidth);
        if(regions.length<=6){
            var regionWidth = (regionScrollerWidth-80)/regions.length;
        }else{
            var regionWidth = 100;
        }

        table += "<table class='zui-table'>";
        table += "<thead><tr>"

        // adding levels
        for(var l = 1; l <= levels; l++){
            table += "<th class='zui-sticky-col' style='width: "+classWidth+"px; left:"+((l-1)*classWidth)+"px'>"+ polyglot.t("level")+ " "  + l + "</th>";
        }

        table += "<th class='zui-sticky-col' style='width: 80px; left:650px;'>"+ polyglot.t("unit")+ "</th>";
        table += "<th class='zui-sticky-col' style='width: 70px; left:730px;'>"+ polyglot.t("count")+ "</th>";

        // adding regions
        _.each(regions, function(region) {
            table += "<th class='region'><div class='region-holder' style='width: "+regionWidth+"px;'><span data-toggle='tooltip' title='"+region.label+"'>"+region.label  + "</span></div></th>";
        });
        if(regions.length == 0){
            table += "<th class='region'><div class='region-holder' style='width: "+regionWidth+"px;'><span data-toggle='tooltip' title=''>You haven't selected any regions.</span></div></th>";
        }

        table += "</tr></thead><tbody>";

        // displaying data
        _.each(data, function(item) {

            table += "<tr>"

            for(var l = 1; l <= levels; l++){

                if(item.path["histclass"+l]){
                   var classname = strEscape(item.path["histclass"+l]);
                }else{
                    var classname = "&nbsp;";
                }
                table += "<td class='zui-sticky-col' style='width: "+classWidth+"px; left:"+((l-1)*classWidth)+"px;'> <span data-toggle='tooltip' title='"+classname+"'>"+classname  + "</span></td>";
            }

            if(item.value_unit){
                unit = item.value_unit;
            }else{
                unit = "&nbsp;";
            }

            var not_na = 0;
            $.each(item.territories,function(index){
              if(item.territories[index].value !== 'na') not_na++;
            })

            table += "<td class='zui-sticky-col'  style='width: 80px; left:650px;'>" + unit +  " </td>";
            table += "<td class='zui-sticky-col' style='width: 70px; left:730px;'>" + not_na +  " / " +regions.length+ "</td>";

            // output regions
            _.each(regions, function(region) {

                var item_region = _.findWhere(item.territories, {ter_code:region.region_code})

                if(item_region  == undefined || item_region.value=="."){
                    table += "<td> "+polyglot.t("na")+" </td>";
                }else{
                    table += "<td>" + item_region.value +  "</td>";
                }
            });
            if(regions.length == 0){
                table += "<td>no data.</td>";
            }

            table += "</tr>"
        });

        table += "</tbody></table>"
        $("#preview-message").html("");
        $("#preview .zui-scroller").html(table);

        $('[data-toggle="tooltip"]').tooltip({
            container: '#preview'
        });

        $("#preview .zui-scroller").css("width",regionScrollerWidth);
        $("#preview .zui-scroller").show();
    },

    /**
     *  Sets download url for button
     */
    setDownloadBtn:function(url){
        if(url){
            $('#btn-download').unbind("click");
            $('#btn-download').show();
            $('#btn-download').click(function(){
                window.open(url);
            });
        }else{
            $('#btn-download').hide();
        }
    }
});