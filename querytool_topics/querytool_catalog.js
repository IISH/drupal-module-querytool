/**
 * Created by pieter on 16/05/2017.
 */

jQuery(document).ready(function ($) {

    /**
     *  (un)checks all subtopics within topic
     */
    var all_selectors = $( "fieldset[id*='edit-all']" );

    $(all_selectors).each(function( index ) {

        $(this).find("input").each(function( index ) {
            var name = $(this).attr('name');
            var year = name.split("_")[1];

            $(this).change(function(){
                if( $(this).prop('checked')){
                    $(this).closest("fieldset.topic").find("input[name*='"+year+"']").prop('checked', true);
                }else{
                    $(this).closest("fieldset.topic").find("input[name*='"+year+"']").prop('checked', false);
                }
            })
        });

    });

    $(window).scroll(sticky_relocate);
    sticky_relocate();

    function sticky_relocate() {
        var window_top = $(window).scrollTop();
        var div_top = $('#edit-topic-1').offset().top;

        if (window_top > (div_top - 70)) {
            $('#edit-topic-all').css("position","fixed");
            $('#edit-topic-all').css("top",0);
            $('#edit-topic-1').css("margin-top", ($('#edit-topic-all').height()+80) );
        } else {
            $('#edit-topic-all').css("position","relative");
            $('#edit-topic-1').css("margin-top",20);
        }
    }
});


