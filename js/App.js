/**
*   TODO: Integrate in drupal behaviours system
*/
/*
$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    options.url = '/sites/all/modules/custom/querytool/json/' + options.url;
});
*/


if(datatype == ""){
    jQuery("#mainmessage-container").html('<div class="alert alert-danger" role="alert">Oops! No topic given. Close window and reopen via link please.</div>');

}else{

    var modes = [{
        name:"historical",
        label: "Historical",
        description: "A description of what historical means"
    },{
        name:"modern",
        label: "Modern",
        description: "A description of what modern means"
    }];

    var querySettings = new QuerySettings();
    querySettings.set({classModes:modes});
    querySettings.set({datatype:datatype});


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