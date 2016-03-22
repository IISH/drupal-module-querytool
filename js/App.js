/**
 *
 *   Implement marionette radio
*/

console.log("app");
if(qtSettings.datatype == ""){
    jQuery("#mainmessage-container").html('<div class="alert alert-danger" role="alert">Oops! No topic given. Close window and reopen via link please.</div>');

}else{

    var modes = [{
        name:"historical",
        label: polyglot.t("historical"),
        description: polyglot.t("historical-description")
    },{
        name:"modern",
        label: polyglot.t("modern"),
        description: polyglot.t("modern-description")
    }];

    var querySettings = new QuerySettings();
    querySettings.set({baseUrl: qtSettings.baseurl});
    querySettings.set({moduleUrl: qtSettings.moduleurl});
    querySettings.set({classModes:modes});
    querySettings.set({datatype:qtSettings.datatype});

    var queryModuleView = new QueryModuleView();
    queryModuleView.updateSteps();

    var querySettingsView = new QuerySettingsView({model:querySettings});
    querySettingsView.render();

    var classModeSelector = new ClassModeSelector({model:querySettings});
    classModeSelector.render();

    var yearSelector = new YearSelector({model:querySettings});
    yearSelector.render();

    var regionSelector = new RegionSelector();

    var topicSelector = new TopicSelector();

    var classification = new Classification();

    var resultView = new ResultView();


}

