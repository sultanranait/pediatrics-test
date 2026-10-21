// Retained page initialization; execution order is significant.

document.addEventListener("DOMContentLoaded", function () {
  // Thoda delay taake confirmation wrapper render ho jaye
  setTimeout(function() {
    var confirmation = document.querySelector("#gform_confirmation_wrapper_38");
    if (confirmation) {
      // popup trigger button (jo modal kholta hai)
      var popupBtn = document.querySelector("button[data-modal-open='kt-target-modal43211_02014e-91']");
      if (popupBtn) {
        popupBtn.click(); // auto open modal
      }
    }
  }, 800); // 0.8s delay after DOM load
});
