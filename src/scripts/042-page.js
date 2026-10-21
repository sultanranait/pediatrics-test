// Retained page initialization; execution order is significant.
window.addEventListener('DOMContentLoaded', function(){
let pop_btn = document.querySelector('.hide-buttonnn a.modal-show-icce');
setTimeout(function () {
    if (pop_btn) {
        pop_btn.click();
    }
}, 15000)
})