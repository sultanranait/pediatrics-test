// Retained page initialization; execution order is significant.
window.addEventListener('DOMContentLoaded', function() {
gform.initializeOnLoaded( function() { jQuery(document).on('gform_post_render', function(event, formId, currentPage){if(formId == 104) {} } );jQuery(document).on('gform_post_conditional_logic', function(event, formId, fields, isInit){} ) } );
});