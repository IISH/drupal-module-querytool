
function openWindow(base,id){
    w=100;
    h=600;
    if (window.screen) {
        w = window.screen.availWidth;
        h = window.screen.availHeight;
    }
    window.open(base+"/"+id, id, config='height='+h+', width='+w+', '
        + 'toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=yes, '
        + 'directories=no, status=no');
}


jQuery(document).ready(function () {
    jQuery( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    jQuery( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
});