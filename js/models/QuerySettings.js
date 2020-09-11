var QuerySettings = Backbone.Model.extend({

    defaults: {
        moduleUrl:"",
        baseUrl:"",
        downloadUrl:"",
        years:[],
        classModes:[],
        datatype:"",
        classmode: "",
        base_year:"",
        selectedclasses:[],
        regions:[],
        lang:""
    },

    getDataType: function(){
        return this.get("datatype");
    },

    getBaseUrl:function(){
        return this.baseUrl;
    },

    getDownloadUrl:function(){
        return this.downloadUrl;
    },

    getClassUrl:function(){
        var urlTail = "";

        if(this.get("classmode") == "modern"){
            urlTail += "classes?";
        }else{
            urlTail += "histclasses?";
        }
        urlTail += "datatype="+ this.get("datatype");
        if(this.get("base_year") !== "" && this.get("classmode") == "historical") urlTail += "&base_year="+this.get("base_year");
        urlTail += "&language="+this.get("lang");
        return this.get("baseUrl") +urlTail;
    },

    getPreviewUrl:function(){
        var url = "http://ristat.sandbox.socialhistoryservices.org/cgi-bin/rr/aggregate.cgi?guided=indicators";
        url += "&datatype="+this.get("datatype");
        url += "&regions="+this.get("regions").join(",");
        url += "&classes="+this.get("selectedclasses").join(",");
        url += "&year="+this.get("year");
        return url;
    },
    getRegionsUrl:function(){
        var url = this.get("baseUrl")+'regions';
        if(this.get("base_year") !== "")  url += "?basisyear="+this.get("base_year");
        return url;
    },

    getYearsUrl:function(){
        var url = this.get("baseUrl")+"years?datatype="+this.get("datatype");
        return url;
    },

    getDocumentationUrl:function(){
        var url = this.get("baseUrl")+'documentation';
        var topic = this.get("datatype").split(".")[0];
        url += "?datatype="+topic;
        url += "&lang="+this.get("lang");
        return url;
    },

    updateMode:function(value){
        var r = true;

        if(this.get("confirmmode") && this.get('classmode') !=="") r = confirm(polyglot.t("switch-mode-confirm"));

        if(r){
            this.set({classmode: value, selectedclasses:[]});

            if(value == "modern"){
                this.set({base_year:''});
                $("#yearselection").hide();
                $("#regionselection").hide();
                $("#result").hide();
                queryModuleView.showNextStep(4);
                classification.getClasses();

             }else if(value == "historical"){
                $("#regionselection").hide();
                $("#topicselection").hide();
                $("#result").hide();
                queryModuleView.showNextStep(2);
                classification.reset();
            }
            querySettingsView.update();

        }else{
            //reset to current value
            classModeSelector.selectMode(this.get("classmode"));
        }
    },

    updateYear:function(value){

        var r = true;

        if(this.get("confirmmode") && (this.get('base_year') !== ""))  var  r = confirm(polyglot.t("switch-year-confirm"));

        if(r){
            this.set({base_year: value});
            querySettingsView.update();
            regionSelector.render();
            classification.getClasses();
            queryModuleView.hideNextSteps(3)
            queryModuleView.showNextStep(3);
            topicSelector.setDocumentationLink();
        }else{
            //reset to current value
            yearSelector.selectYear(this.get("base_year"));
        }
    },

    updateRegions:function(regions){
        this.set({"regions":regions});
        querySettingsView.update();
        queryModuleView.showNextStep(4);

    },

    resetYear:function(){
        this.set({year: ""});
    },

    updateClasses:function(selection){
        this.set({selectedclasses:selection});
        querySettingsView.update();
    }
});