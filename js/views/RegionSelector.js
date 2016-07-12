var RegionSelector = Backbone.View.extend({

    el:"#regioncontainer",
    region_objects: {},
    selected_region_codes:[],

    render:function(){
        var regions = new Regions();
        var that = this;
        //reset
        $("#regionselection").show();
        this.$el.html("<img src='"+querySettings.get("moduleUrl")+"/img/loader.gif'>");

        regions.fetch({

            success:function(r){

                var regions = [];
                var regionsdata = r.attributes.regions;
                var region_objects = {};

                _.each(regionsdata, function(region) {

                    if(querySettings.get("lang") == "en"){
                        region.label = region.region_name_eng;
                    }else{
                        region.label = region.region_name;
                    }

                    region_objects[region.region_code] = region;
                    regions.push(region);
                });

                regions =  _.sortBy(regions, 'label');

                var vars = {regions:regions};
                var tp   = $('#regions-template').html();
                var template = _.template(tp);
                var html = template(vars);

                that.$el.html(html);
                that.setDocumentationLink();
                that.enableMultiSelect();
                that.region_objects = region_objects;
            }
        });

    },

    setDocumentationLink:function(){
        matched_files = documentation.getLinks("regions");
        $("#regionselection .documentation").html(matched_files);
    },


    enableMultiSelect:function(){

        var that = this;

        $('#regions').multiSelect({
            selectableHeader: "<input type='text' class='search-input' autocomplete='off' placeholder='"+polyglot.t("search")+"'>",
            selectionHeader: "<input type='text' class='search-input' autocomplete='off' placeholder='"+polyglot.t("search")+"'>",
            afterInit: function(ms){
                var that = this,
                    $selectableSearch = that.$selectableUl.prev(),
                    $selectionSearch = that.$selectionUl.prev(),
                    selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
                    selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';
                that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
                    .on('keydown', function(e){
                        if (e.which === 40){
                            that.$selectableUl.focus();
                            return false;
                        }
                    });
                that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
                    .on('keydown', function(e){
                        if (e.which == 40){
                            that.$selectionUl.focus();
                            return false;
                        }
                    });
            },
            afterSelect: function(){
                this.qs1.cache();
                this.qs2.cache();
                that.saveRegions();
            },
            afterDeselect: function(){
                this.qs1.cache();
                this.qs2.cache();
                that.saveRegions();
            }
        });

        $('#select-all').click(function(){
            $('#regions').multiSelect('select_all');
            return false;
        });
        $('#deselect-all').click(function(){
            $('#regions').multiSelect('deselect_all');
            return false;
        });
    },
    events:{

    },
    saveRegions:function(){
        this.selected_region_codes = $('#regions').val();
        querySettings.updateRegions($('#regions').val())
    },

    getSelectedRegions:function(){

        var selectedRegions = [];
        var selectedRegion_codes = this.selected_region_codes;
        var allRegions = this.region_objects;

        _.each(allRegions, function(region) {
            if(selectedRegion_codes.indexOf(region.region_code) !== -1) selectedRegions.push(region);
        });

        selectedRegions = _.sortBy(selectedRegions, function(o) { return o.label; })

        return selectedRegions;
    }
});