var ResultView = Backbone.Model.extend({

    el:"#regioncontainer",

    render:function(){

        /*


        */

        var postUrl = querySettings.get("baseUrl")+"/filter";
        var postData = {"classification":"historical","datatype":"7.01","histclass1":"неудобная земля"};

        postData = JSON.stringify(postData);


        $.ajax({
            url: postUrl,
            method: 'post',
            data: postData,

            beforeSend: function (request)
            {
                request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            },

            dataType: 'json',
            success: function (data) {

                console.info(data);
            }
        });
        /*

*/
/*
        var message = '{"classification":"historical","datatype":"7.01","histclass1":"неудобная земля"}';

        request = new XMLHttpRequest();
        request.open('POST', 'http://ristat.sandbox.socialhistoryservices.org/service/filter', true);

        request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        request.onload = function (data) {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                //data = JSON.parse(request.responseText);

          //      console.log(request.responseText);



                var d = request.responseText;

                var strJSON = d;
                var objJSON = eval("(function(){return " + strJSON + ";})()");
                alert(objJSON.result);
                alert(objJSON.count);

                console.log(d);
                console.log(request);

            } else {
                // We reached our target server, but it returned an error
                console.log("server error");
            }
        };

        request.onerror = function () {
            // There was a connection error of some sort
            console.log("connection error");
        };

        request.send(message);
*/





    }
});