/**
 *
 *   App.js
 *   Initializing views and models
 *
 *   QuerySettings functions as main central model
 *   qtSettings is an object render by the module.
 *
*/

var debugmode = qtSettings.debugmode;

// defined in init()
var querySettings;
var documentation;

// defined in build()
var queryModuleView;
var querySettingsView;
var classModeSelector;
var yearSelector;
var regionSelector;
var topicSelector;
var classification;
var resultView;


function init(){

    $("#init-loader").html("<img src='"+qtSettings.moduleurl+"/img/loader.gif'>");

    var modes = [{
        name:"historical",
        label: polyglot.t("historical"),
        description: polyglot.t("historical-description")
    },{
        name:"modern",
        label: polyglot.t("modern"),
        description: polyglot.t("modern-description")
    }];

    querySettings = new QuerySettings();
    querySettings.set({baseUrl: qtSettings.baseurl});
    querySettings.set({downloadUrl: qtSettings.downloadurl});
    querySettings.set({moduleUrl: qtSettings.moduleurl});
    querySettings.set({classModes:modes});
    querySettings.set({datatype:qtSettings.datatype});
    querySettings.set({lang:qtSettings.lang});
    querySettings.set({debugmode:qtSettings.debugmode});
    querySettings.set({confirmmode:qtSettings.confirmmode});
    querySettings.set({files:qtSettings.files});

    /* Getting documentation */
    documentation = new Documentation();
    documentation.getFiles();

}


/**
 * called by Documentation
 */
function build(){

    $("#init-loader").html("");

    queryModuleView = new QueryModuleView();
    queryModuleView.updateSteps();

    querySettingsView = new QuerySettingsView({model:querySettings});
    querySettingsView.render();

    classModeSelector = new ClassModeSelector({model:querySettings});
    classModeSelector.render();

    yearSelector = new YearSelector({model:querySettings});
    yearSelector.render();

    regionSelector  = new RegionSelector();
    topicSelector   = new TopicSelector();
    classification  = new Classification();
    resultView      = new ResultView();
}


if(qtSettings.datatype == ""){
    jQuery("#mainmessage-container").html('<div class="alert alert-danger" role="alert">Oops! No topic given. Close window and reopen via link please.</div>');
}else{
    init();
}


function closeWindow(){
    if (confirm(polyglot.t("close-window-confirm"))) {
        close();
    }
}