var QuerySettings = Backbone.Model.extend({
    confirmation:false,
    defaults: {
        baseUrl:'http://ristat.sandbox.socialhistoryservices.org/service/',
        years:[],
        classModes:[],
        datatype:"",
        classmode: "historical",
        year:"",
        selectedclasses:[],
        regions:[]
    },

    initialize:function(){
    },

    getBaseUrl:function(){
        return this.baseUrl;
    },

    getClassUrl:function(){
        var urlTail = "datatype="+ this.get("datatype");
        if(this.get("year") !== "") urlTail += "&year="+this.get("year");
        if(this.get("mode") !== "") urlTail += "&classification="+this.get("classmode");
      //  return this.get("baseUrl") +'classes?'+urlTail;
        return this.get("baseUrl") +'classes?'+urlTail;
      //  return "/sites/all/modules/custom/querytool/json/testclasses.json";
    },

    getPreviewUrl:function(){

        url += "&regions="+this.get("regions").join(",");
        url += "&classes="+this.get("selectedclasses").join(",");
        url += "&year="+this.get("year");

        var url = "http://ristat.sandbox.socialhistoryservices.org/cgi-bin/rr/aggregate.cgi?guided=indicators";
        url += "&datatype="+this.get("datatype");
        url += "&regions="+this.get("regions").join(",");
        url += "&classes="+this.get("selectedclasses").join(",");
        url += "&year="+this.get("year");

        return url;
    },
    getRegionsUrl:function(){
        var url = this.get("baseUrl")+'regions';
        if(this.get("year") !== "")  url += "?basisyear="+this.get("year");
        return url;

    },
    updateMode:function(value){

        var r = true;

       ///if(this.confirmation && this.get('classmode') !=="") r = confirm("Switching mode will reset the screen and all custom selections, are you sure?");

        if(r){
            this.set({classmode: value, selectedclasses:[]});

            if(value == "modern"){
                this.set({year:''});
                $("#yearselection").hide();
                $("#regionselection").hide();
             }else{
                $("#yearselection").show();
                $("#regionselection").show();
            }

            querySettingsView.update();
            classification.getClasses();
        }else{
            //reset to current value
            classModeSelector.selectMode(this.get("classmode"));
        }

        queryModuleView.updateSteps();
    },

    updateYear:function(value){
      //   var  r = confirm("switching year will reset the screen and all your selections, are you sure?");
        var r = true;
        if(r){
            this.set({year: value});
            querySettingsView.update();
            regionSelector.render();
            classification.getClasses();
        }else{
            //reset to current value
            yearSelector.selectYear(this.get("year"));
        }
    },

    resetYear:function(){
        this.set({year: ""});
    },

    updateClasses:function(selection){
        this.set({selectedclasses:selection});
        querySettingsView.update();
    }



});