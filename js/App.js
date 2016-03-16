/**
*   TODO: Integrate in drupal behaviours system
*/

datatype = qtSettings.datatype;


 App = function(){

    if(datatype == ""){
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

        window.querySettings = new QuerySettings();
        window.querySettings.set({baseUrl: qtSettings.baseurl});
        window.querySettings.set({moduleUrl: qtSettings.moduleurl});
        window.querySettings.set({classModes:modes});
        window.querySettings.set({datatype:datatype});

        window.queryModuleView = new QueryModuleView();
        window.queryModuleView.updateSteps();

        window.querySettingsView = new QuerySettingsView({model:querySettings});
        window.querySettingsView.render();

        window.classModeSelector = new ClassModeSelector({model:querySettings});
        window.classModeSelector.render();

        window.yearSelector = new YearSelector({model:querySettings});
        window.yearSelector.render();

        window.regionSelector = new RegionSelector();

        window.topicSelector = new TopicSelector();

        window.classification = new Classification();

        window.resultView = new ResultView();
      //  window.resultView.render();

        // Testing

        //$('input[value=historical]').click();

    }

}

App();