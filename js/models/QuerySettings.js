var QuerySettings = Backbone.Model.extend({

    defaults: {
        moduleUrl:"",
        baseUrl:"",
        years:[],
        classModes:[],
        datatype:"",
        classmode: "",
        base_year:"",
        selectedclasses:[],
        regions:[],
        lang:""
    },

    getBaseUrl:function(){
        return this.baseUrl;
    },

    getClassUrl:function(){
        var urlTail = "datatype="+ this.get("datatype");
        if(this.get("base_year") !== "" && this.get("classmode") == "historical") urlTail += "&base_year="+this.get("base_year");
        if(this.get("classmode") !== "") urlTail += "&classification="+this.get("classmode");
        urlTail += "&language="+this.get("lang");
        return this.get("baseUrl") +'classes?'+urlTail;
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

        if(this.get("confirmmode") && this.get('classmode') !=="") r = confirm("Switching mode will reset the screen and all custom selections, are you sure?");

        if(r){
            this.set({classmode: value, selectedclasses:[]});

            if(value == "modern"){
                this.set({base_year:''});
                $("#yearselection").hide();
                $("#regionselection").hide();
                queryModuleView.showNextStep(4);
             }else{
                queryModuleView.showNextStep(2);
            }

            querySettingsView.update();
            classification.getClasses();
        }else{
            //reset to current value
            classModeSelector.selectMode(this.get("classmode"));
        }
    },

    updateYear:function(value){

        var r = true;

        if(this.get("confirmmode") && (this.get('base_year') !== ""))  var  r = confirm("switching year will reset the screen and all your selections, are you sure?");

        if(r){
            this.set({base_year: value});
            querySettingsView.update();
            regionSelector.render();
            classification.getClasses();
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