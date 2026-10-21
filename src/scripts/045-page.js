// Retained page initialization; execution order is significant.
// window.addEventListener('DOMContentLoaded', function () {
//     let homeFunnelSec = document.querySelector('.home-funnel');
//     let HFCancelBtn = document.querySelector('.cacel-home-pop');
//     if (homeFunnelSec) {
//         HFCancelBtn.addEventListener('click', function () {
//         homeFunnelSec.classList.add('closed');
//         });
//     };
// });
window.addEventListener('DOMContentLoaded', function () {
    let homeFunnelSec = document.querySelector('.home-funnel');
    let HFCancelBtn = document.querySelector('.cacel-home-pop');

    // Already closed? -> Don't show
    if (localStorage.getItem('popupClosed') === 'true') {
        return; // popup bilkul bhi show nahi hoga
    }

    // First time -> show popup
    if (homeFunnelSec) {
        homeFunnelSec.classList.add('show');
    }

    // Close button
    if (HFCancelBtn) {
        HFCancelBtn.addEventListener('click', function () {
            if (homeFunnelSec) {
                homeFunnelSec.classList.remove('show');
            }
            localStorage.setItem('popupClosed', 'true'); // never show again
        });
    }
});

//  window.addEventListener('DOMContentLoaded', function () {
//     let homecookieSec = document.querySelector('.cookies-popup');
//     let CKCancelBtn = document.querySelector('.cacel-cookie-pop');

//     // Already closed? -> Don't show
//     if (localStorage.getItem('popupClosed') === 'true') {
//         return; // popup bilkul bhi show nahi hoga
//     }

//     // First time -> show popup
//     if (homecookieSec) {
//         homecookieSec.classList.add('show');
//     }

//     // Close button
//     if (CKCancelBtn) {
//         CKCancelBtn.addEventListener('click', function () {
//             if (homecookieSec) {
//                 homecookieSec.classList.remove('show');
//             }
//             localStorage.setItem('popupClosed', 'true'); // never show again
//         });
//     }
// });