/**
 *
 */

jQuery(document).ready(function ($) {

    /**
     *  (un)checks all subtopics within topic
     */
    var all_selectors = $( "fieldset[id*='edit-all']" );

    $(all_selectors).each(function( index ) {

        $(this).find("input").each(function( index ) {
            var name = $(this).attr("name");
            var year = name.split("_")[1];

            // Hide all selector if no subtopics can be found
            var subtopics = $(this).closest("fieldset.topic").find("input[name*='"+year+"']");
            var count = subtopics.length-1; // exclude itself

            if( count === 0){
                $(this).parent().addClass("unavailabe");
                $(this).parent().html("x");
            }else{
                $(this).change(function(){
                    if( $(this).prop("checked")){
                        subtopics.prop("checked", true);
                    }else{
                        subtopics.prop("checked", false);
                    }
                });
            }

        });
    });

    $(window).scroll(sticky_relocate);
    sticky_relocate();

    function sticky_relocate() {
        var window_top = $(window).scrollTop();
        var div_top = $("#edit-topic-1").offset().top;

        if (window_top > (div_top - 70)) {
            $("#edit-topic-all").css("position","fixed");
            $("#edit-topic-all").css("top",0);
            $("#edit-topic-1").css("margin-top", ($("#edit-topic-all").height()+80) );
        } else {
            $("#edit-topic-all").css("position","relative");
            $("#edit-topic-1").css("margin-top",20);
        }
    }


    /**
     * Check if there is at least 1 selected item.
     */
    $("#querytool-catalog-form").submit(function () {

        var checkboxCount = $("input:checked[type=checkbox]").length;

        if (checkboxCount  === 0) {
            var msg = Drupal.t("Please select at least 1 checkbox.");
            alert(msg);
            return false;
        }

    });
});


