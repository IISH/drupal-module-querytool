/**
 *   Draws connection shape between boxes
 */

var Connector = Backbone.View.extend({

    render:function(){

        topic = this.$el.parent().find(".focus");
        this.$el.html("");

        var pos = $(topic).position();
        var nHeight = $("#topic-list-1").height()+2;
        var nScrollTop = $("#topic-list-1").scrollTop();
        var nWidth = 40;

        var nStartY = pos.top  - $("#topic-list-1").position().top-1;
        var nEndY = nStartY+ $(topic).height()*2;

        var lineData = [
            // top line
            { "x":0 ,"y": nStartY},
            { "x":nWidth*0.4,"y":nStartY},
            { "x":nWidth*0.6,"y":0},
            { "x": nWidth,  "y": 0},
            // bottom line
            { "x": nWidth, "y":nHeight},
            { "x": nWidth*0.6, "y":nHeight},
            { "x": nWidth*0.4, "y":nEndY},
            { "x":0, "y": nEndY}
        ];

        var lineFunction = d3.svg.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .interpolate("basis");

        var connectorId  ="#"+this.$el.attr("id")
        var svgContainer = d3.select(connectorId).append("svg")
            .attr("width", nWidth)
            .attr("height", nHeight+4);

        var topLine = lineFunction(lineData.slice(0,4));
        var bottomLine = lineFunction(lineData.slice(4,8));
        bottomLine.indexOf("L")
        bottomLine = bottomLine.substring(bottomLine.indexOf("L")); // removes the M

        var path = topLine + "L"+nWidth+","+nHeight +""+bottomLine;
        var lineGraph = svgContainer.append("path")
            .attr("d", path)
            .attr("fill", "#1B5A85");
    }
});

