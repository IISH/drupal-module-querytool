/**
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
              //  var yearsdata = _.sortBy(r.attributes, '1');
                yearsdata = r.attributes;

                _.each(yearsdata, function(k, v) {
                   // console.debug(k, v);
                    var year = {};
                    year.datacount = k;
                    year.num = v;
                    years.push(year);
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