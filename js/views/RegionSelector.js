var RegionSelector = Backbone.View.extend({

    el:"#regioncontainer",
    initialize:function(){
        this.render();
    },

    render:function(){
        var regions = new Regions();
       // regions.url = querySettings.getRegionsUrl();
        var that = this;

        //reset
         this.$el.html("");

        regions.fetch({

            success:function(r){
                var regions = [];
                var regionsdata = r.attributes.regions;//= _.sortBy(r.attributes, '0');

                _.each(regionsdata, function(region) {
                    region.label = region.region_name_eng;
                    regions.push(region);
                });

                regions =  _.sortBy(regions, 'label');

                var vars = {regions:regions};
                var tp   = $('#regions-template').html();
                var template = _.template(tp);
                var html = template(vars);

                that.$el.append(html);
                that.enableMultiSelect();
            }
        });
    },


    enableMultiSelect:function(){

        var that = this;

        $('#regions').multiSelect({
            selectableHeader: "<input type='text' class='search-input' autocomplete='off' placeholder='search'>",
            selectionHeader: "<input type='text' class='search-input' autocomplete='off' placeholder='search'>",
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
                console.log("deslect");
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
        querySettings.set({"regions":$('#regions').val()});
        querySettingsView.update();
    }
});