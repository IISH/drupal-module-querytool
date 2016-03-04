/*
 *   Provides tabs for each year
 */
var YearSelector = Backbone.View.extend({

    el:"#yearcontainer",

    render:function(){
        var years = new Years();
        var that = this;

        years.fetch({

            success:function(r){
                var years = [];
                var yearsdata = _.sortBy(r.attributes, '0');

                _.each(yearsdata, function(yeardata) {
                    years.push(yeardata[0]);
                });
                var vars = {years:years};
                var tp   = $('#years-template').html();
                var template = _.template(tp);
                var html = template(vars);
                that.$el.append(html);
            }
        });
    },

    events:{
        'click a':'onYearSelect'
    },

    onYearSelect:function(e){
        var year = $(e.currentTarget).attr("id");
        this.model.updateYear(year);
    },

    selectYear:function(year){
        $('#myTabs a#'+year).tab('show');
    }
});