// Retained page initialization; execution order is significant.

(function () {
  if (window.innerWidth > 767) return;

  function forceShowForm() {
    const form = document.getElementById("gform_wrapper_38");
    if (!form) return;

    // remove inline display none
    if (form.style.display === "none") {
      form.style.setProperty("display", "block", "important");
    }
  }

  // run immediately
  forceShowForm();

  // run after all scripts
  window.addEventListener("load", forceShowForm);

  // keep checking for late JS (Edge fix)
  let tries = 0;
  const interval = setInterval(() => {
    forceShowForm();
    tries++;
    if (tries > 20) clearInterval(interval); // stop after ~4 sec
  }, 200);
})();
