// Retained page initialization; execution order is significant.
window.addEventListener('DOMContentLoaded', function () {
    let mocapedsFunnelSec = document.querySelector('.mocapeds-funnel');
    let MPCancelBtn = document.querySelector('.cacel-mp-pop');

    // Already closed? -> Don't show
    if (localStorage.getItem('popupClosed') === 'true') {
        return; // popup bilkul bhi show nahi hoga
    }

    // First time -> show popup
    if (mocapedsFunnelSec) {
        mocapedsFunnelSec.classList.add('show');
    }

    // Close button
    if (MPCancelBtn) {
        MPCancelBtn.addEventListener('click', function () {
            if (mocapedsFunnelSec) {
                mocapedsFunnelSec.classList.remove('show');
            }
            localStorage.setItem('popupClosed', 'true'); // never show again
        });
    }
});





window.addEventListener('DOMContentLoaded', function () {
    let cookiebanner = document.querySelector('.cookies-popup');
    let CBCancelBtn = document.querySelector('.cookies-popup .cacel-cookie-pop');

    // Already closed? -> Don't show
    if (localStorage.getItem('cookieClosed') === 'true') {
        return; // popup bilkul bhi show nahi hoga
    }

    // First time -> show popup
    if (cookiebanner) {
        cookiebanner.classList.add('show');
    }

    // Close button
    if (CBCancelBtn) {
        CBCancelBtn.addEventListener('click', function () {
            if (cookiebanner) {
                cookiebanner.classList.remove('show');
            }
            localStorage.setItem('cookieClosed', 'true'); // never show again
        });
    }
});